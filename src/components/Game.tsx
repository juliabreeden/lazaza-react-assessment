import type { Question } from "../types";
import { useState } from "react";
import Card from "../componentLibrary/Card";
import Flex from "../componentLibrary/Flex";
import Box from "../componentLibrary/Box";

type GameProps = {
  questions: Question[];
};

export default function Game({ questions }: GameProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [isCorrectAnswer, setisCorrectAnswer] = useState<boolean | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const scoreMessages = [
    { range: [0, 50], message: "Aw man, better luck next time." },
    { range: [51, 60], message: "Over half right, not too bad!" },
    { range: [61, 80], message: "Trivia grand master in the making!" },
    { range: [81, 100], message: "Excellent work, smart cookie!" },
  ];

  function getScoreMessage(score: number, total: number) {
    //calculate percentage
    const percentage = (score / (total * 10)) * 100;
    //find which message to use for percentage score
    const messageObj = scoreMessages.find(
      (msg) => percentage >= msg.range[0] && percentage <= msg.range[1],
    );
    //return Great effort if something goes weird
    return { percentage, message: messageObj?.message || "Great effort!" };
  }

  //make array of all answers, and sort (alphabetically) to mix up order
  const allAnswers = [
    ...questions[currentQuestion].incorrect_answers,
    questions[currentQuestion].correct_answer,
  ].sort();

  //regex to replace the quote things with normal ones

  console.log(allAnswers);

  function handleAnswerSelection(answer: string) {
    setSelectedAnswer(answer);

    //normalizing game answers and correct answers so they can perfectly match
    //can't figure out why I'm having to do this though because they seem the same
    const normalizedSelected = answer.trim().toLowerCase();
    const normalizedCorrect = questions[currentQuestion].correct_answer
      .trim()
      .toLowerCase();

    if (normalizedSelected === normalizedCorrect) {
      setisCorrectAnswer(true);
      setScore(score + 10);
    } else {
      setisCorrectAnswer(false);
    }

    console.log(isCorrectAnswer);
    setTimeout(() => {
      setisCorrectAnswer(null);
      //only go to next question until we've reached the last one
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        //modal pop up at end of game
        setIsGameOver(true);
      }
    }, 2000);
  }

  return (
    <>
      {isGameOver ? (
        <Box>
          //show the score and the value in percentage //come up with a range,
          0-50%, aw man, better luck next time. 50-60% Over half right, not too
          bad or something!? 60-80% something 80-100% encouraging message
          <h2></h2>
        </Box>
      ) : (
        <Card>
          <Flex direction="column">
            <div>
              <h2>{`Question ${currentQuestion + 1} of ${questions.length - 1}`}</h2>
              <h3>{questions[currentQuestion].question}</h3>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {allAnswers.map((answer) => (
                  <button
                    key={answer}
                    onClick={() => handleAnswerSelection(answer)}
                    style={{
                      backgroundColor:
                        selectedAnswer === answer
                          ? isCorrectAnswer === true
                            ? "green"
                            : isCorrectAnswer === false
                              ? "red"
                              : ""
                          : "",
                    }}
                  >
                    {answer}
                  </button>
                ))}
              </div>
            </div>
          </Flex>
        </Card>
      )}
    </>
  );
}
