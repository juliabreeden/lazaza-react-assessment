import type { Question } from "../../types";
import { useState, useEffect, useCallback } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import Card from "../../componentLibrary/Card";
import Flex from "../../componentLibrary/Flex";
import Box from "../../componentLibrary/Box";
import Button from "../../componentLibrary/Button";
import restartIcon from "../../assets/restartIcon.png";
import "./Game.css";

type GameProps = {
  questions: Question[];
  fetchNewQuestions: () => void;
  timedMode: boolean;
};

export default function Game({
  questions,
  fetchNewQuestions,
  timedMode,
}: GameProps) {
  //state variables for game state and UI
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [isCorrectAnswer, setisCorrectAnswer] = useState<boolean | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  //sort and combine correct and incorrect answers for the current question
  const allAnswers = [
    ...questions[currentQuestion].incorrect_answers,
    questions[currentQuestion].correct_answer,
  ].sort();

  //handle the selection of an answer
  const handleAnswerSelection = useCallback(
    (answer: string) => {
      setSelectedAnswer(answer);

      const newProgress = ((currentQuestion + 1) / questions.length) * 100;
      setProgress(newProgress);

      const normalizedSelected = answer.trim().toLowerCase();
      const normalizedCorrect = questions[currentQuestion].correct_answer
        .trim()
        .toLowerCase();

      let newScore = score;
      if (normalizedSelected === normalizedCorrect) {
        setisCorrectAnswer(true);
        newScore += 10;
        setScore(newScore);
      } else {
        setisCorrectAnswer(false);
      }

      setTimeout(() => {
        setisCorrectAnswer(null);
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setProgress(100);
          if (newScore === questions.length * 10) {
            setShowConfetti(true);
          }
          setTimeout(() => setIsGameOver(true), 500);
        }
      }, 1200);
    },
    [currentQuestion, questions, score],
  );

  //useEffect to handle the timer in timed mode
  useEffect(() => {
    if (timedMode) {
      const timer = setTimeout(() => {
        handleAnswerSelection(""); //pass empty to handle timeout
      }, 15000);

      return () => clearTimeout(timer); //clear timeout if question changes or answer is selected
    }
  }, [currentQuestion, handleAnswerSelection, timedMode]);

  //reset the game to the initial state
  function handlePlayAgain() {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsGameOver(false);
    setProgress(0);
    setShowConfetti(false);
  }

  //start a new game with fresh questions
  function handleNewGame() {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsGameOver(false);
    setProgress(0);
    setShowConfetti(false);
    fetchNewQuestions();
  }

  //messages for defined score ranges
  const scoreMessages = [
    { range: [0, 50], message: "Aw man, better luck next time." },
    { range: [51, 60], message: "Over half right, not too bad!" },
    { range: [61, 80], message: "Trivia grand master in the making!" },
    { range: [81, 100], message: "Excellent work, smart cookie!" },
  ];

  //grab the appropriate score message based on percentage
  function getScoreMessage(score: number, total: number) {
    const percentage = (score / (total * 10)) * 100;
    const messageObj = scoreMessages.find(
      (msg) => percentage >= msg.range[0] && percentage <= msg.range[1],
    );
    return { percentage, message: messageObj?.message || "Great effort!" };
  }

  const { percentage, message } = getScoreMessage(score, questions.length);

  return (
    // game over results box 
    <Flex direction="column" alignItems="center" padding="20px">
      {isGameOver ? (
        <Box
          style={{
            backgroundColor: "#ffe2e6",
            color: "#333",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            maxWidth: "400px",
            margin: "0 auto",
          }}
        >
          {showConfetti && <ConfettiExplosion style={{ margin: "0 auto" }} />}
          <h2>
            Final Score: {score} / {questions.length * 10}
          </h2>
          <h3>You got {percentage.toFixed(2)}% of the questions right.</h3>
          <p>{message}</p>
          <Button onClick={handlePlayAgain}>Repeat Round</Button>
          <Button onClick={handleNewGame}>Play With New Questions</Button>
        </Box>
      ) : (
        <Card width="90%" maxWidth="600px" padding="10px">
          <Flex direction="column" alignItems="center" width="100%">
            {/*flex container for the restart button and progress bar*/}
            <Flex
              width="100%"
              direction="column"
              alignItems="center"
              style={{ marginBottom: "20px" }}
            >
              <button
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  padding: 0,
                  width: "30px",
                  height: "30px",
                  cursor: "pointer",
                  alignSelf: "flex-start", 
                }}
                onClick={handleNewGame}
              >
                <img
                  src={restartIcon}
                  alt="Restart"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </button>

              <Box
                style={{
                  width: "90%",
                  height: "10px",
                  backgroundColor: "#c0c2cf",
                  borderRadius: "5px",
                  marginTop: "10px",
                }}
              >
                <Box
                  style={{
                    width: `${progress}%`,
                    height: "100%",
                    backgroundColor: "#1E0F39",
                    borderRadius: "5px",
                  }}
                ></Box>
              </Box>
            </Flex>

            {/*score and question content*/}
            <Flex direction="column" alignItems="center">
              <h2>Current Score: {score}</h2>
              <h2>{`Question ${currentQuestion + 1} of ${questions.length}`}</h2>
            </Flex>

            <Box width="100%" marginTop="20px">
              <h3 style={{ textAlign: "center" }}>
                {questions[currentQuestion].question}
              </h3>
              <Flex direction="column">
                {allAnswers.map((answer) => (
                  <button
                    className="answer-button"
                    key={answer}
                    onClick={() => handleAnswerSelection(answer)}
                    style={{
                      cursor: "pointer",
                      marginBottom: "10px",
                      padding: "10px 20px",
                      width: "100%",
                      backgroundColor:
                        selectedAnswer === answer
                          ? isCorrectAnswer === true
                            ? "#77D077"
                            : isCorrectAnswer === false
                              ? "#FF4F4B"
                              : ""
                          : "",
                    }}
                  >
                    {answer}
                  </button>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Card>
      )}
    </Flex>
  );
}
