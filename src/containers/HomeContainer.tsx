import APIClient from "../api/client";
import { useQuery } from "react-query";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Question } from "../types";
import Welcome from "../components/Welcome";
import Settings from "../components/Settings";
import Game from "../components/Game/Game";
import ErrorBox from "../componentLibrary/ErrorBox";
import settingsIcon from "../assets/settingsIcon.png";
import questionIcon from "../assets/questionIcon.png";
import { ClipLoader } from "react-spinners";

type Props = {
  apiClient: APIClient;
};

export default function HomeContainer(props: Props) {
  const [fetchedQuestions, setFetchedQuestions] = useState<Question[]>([]);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [settings, setSettings] = useState({
    //default to 5 easy general knowledge questions, not on timed mode
    difficulty: "easy",
    numberOfQuestions: 5,
    category: "9",
    timedMode: false,
  });
  const [isError, SetIsError] = useState<boolean>(false);
  const [refetchKey, setRefetchKey] = useState<number>(0);

  const navigate = useNavigate();

  //only fetch questions if fetchedQuestions is empty - preventing new questions from loading if user leaves the page for a second
  const { data: questions = [], isLoading: isLoadingQuestions } = useQuery({
    queryKey: ["questions", settings, refetchKey],
    queryFn: () =>
      fetchedQuestions.length === 0
        ? props.apiClient.getQuestions({
            amount: settings.numberOfQuestions.toString(),
            difficulty: settings.difficulty,
            category: settings.category,
          })
        : Promise.resolve(fetchedQuestions),
    enabled: fetchedQuestions.length === 0, //only enable the query if fetchedQuestions is empty
    retry: 3, //retry fetching up to 3 times if it fails
    onError: (error) => {
      console.error("Error fetching questions:", error);
      SetIsError(true); //set error state to true if fetching fails
    },
    onSuccess: (data) => setFetchedQuestions(data),
  });

  if (isLoadingQuestions) {
    //show a loading spinner while questions are being fetched
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader />
      </div>
    );
  }

  function handleStartGame() {
    setIsGameStarted(true); //start the game
    navigate("/game"); //navigate to the game screen
  }

  function handleSettingsIconClick() {
    navigate("/settings"); //navigate to the settings screen
  }

  function handleInstructionIconClick() {
    navigate("/welcome"); //navigate to the welcome/instructions screen
  }

  function handleSettingsUpdate(updatedSettings: {
    difficulty: string;
    numberOfQuestions: number;
    category: string;
    timedMode: boolean;
  }) {
    setSettings(updatedSettings); //update the game settings
    setFetchedQuestions([]); //clear questions so that new ones will be fetched to match new settings
    navigate("/game"); //navigate to the game screen
  }

  function fetchNewQuestions() {
    setRefetchKey((prevKey) => prevKey + 1); //trigger a refetch by updating the queryKey
    setFetchedQuestions([]); //clear current questions before fetching new ones
  }

  return (
    <>
      {isError ? (
        //show an error box if something went wrong while fetching questions
        <ErrorBox>
          <p>Whoops! Something went wrong.</p>
          <p>Trivia will be back in no time. Please try again.</p>
          <button
            style={{ cursor: "pointer" }}
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </ErrorBox>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "5px",
            }}
          >
            <button
              onClick={handleInstructionIconClick}
              style={{
                backgroundColor: "transparent",
                border: "none",
                padding: 0,
                width: "40px",
                height: "40px",
                cursor: "pointer",
              }}
            >
              <img
                src={questionIcon}
                alt="Instructions"
                style={{ width: "100%", height: "100%" }}
              />
            </button>
            <button
              onClick={handleSettingsIconClick}
              style={{
                backgroundColor: "transparent",
                border: "none",
                padding: 0,
                width: "40px",
                height: "40px",
                cursor: "pointer",
              }}
            >
              <img
                src={settingsIcon}
                alt="Settings"
                style={{ width: "100%", height: "100%" }}
              />
            </button>
          </div>

          <Routes>
            <Route
              path="/"
              element={
                !isGameStarted ? (
                  <Welcome onStartGame={handleStartGame} />
                ) : null
              }
            />
            <Route
              path="/settings"
              element={<Settings onSettingsUpdate={handleSettingsUpdate} />}
            />
            <Route
              path="/game"
              element={
                <Game
                  questions={questions}
                  fetchNewQuestions={fetchNewQuestions}
                  timedMode={settings.timedMode}
                />
              }
            />
            <Route
              path="/welcome"
              element={<Welcome onStartGame={handleStartGame} />}
            />
          </Routes>
        </>
      )}
    </>
  );
}
