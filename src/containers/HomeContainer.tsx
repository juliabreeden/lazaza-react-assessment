import APIClient from "../api/client";
import { useQuery } from "react-query";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Welcome from "../components/Welcome";
import Settings from "../components/Settings";
import Game from "../components/Game";
import settingsIcon from "../assets/settingsIcon.png";

type Props = {
  apiClient: APIClient;
};

export default function HomeContainer(props: Props) {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [settings, setSettings] = useState({
    //default to 5 easy general knowledge questions
    difficulty: "easy",
    numberOfQuestions: 5,
    category: "9",
  });

  const navigate = useNavigate();

  const { data: questions = [], isLoading: isLoadingQuestions } = useQuery({
    queryKey: ["questions", settings],
    queryFn: () =>
      props.apiClient.getQuestions({
        amount: settings.numberOfQuestions.toString(),
        difficulty: settings.difficulty,
        category: settings.category,
      }),
  });

  console.log(questions);

  if (isLoadingQuestions) {
    return "Loading...";
  }

  function handleStartGame() {
    setIsGameStarted(true);
    navigate("/game");
  }

  function handleSettingsIconClick() {
    navigate("/settings");
  }

  function handleSettingsUpdate(updatedSettings: {
    difficulty: string;
    numberOfQuestions: number;
    category: string;
  }) {
    setSettings(updatedSettings);
    navigate("/game");
  }

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}
      >
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
            !isGameStarted ? <Welcome onStartGame={handleStartGame} /> : null
          }
        />
        <Route
          path="/settings"
          element={<Settings onSettingsUpdate={handleSettingsUpdate} />}
        />
        <Route path="/game" element={<Game questions={questions} />} />
      </Routes>
    </>
  );
}
