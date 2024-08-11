import { useState } from "react";
import Card from "../componentLibrary/Card";
import Button from "../componentLibrary/Button";
import Flex from "../componentLibrary/Flex";

type Props = {
  onSettingsUpdate: (settings: {
    difficulty: string;
    numberOfQuestions: number;
    category: string;
    timedMode: boolean;
  }) => void;
};

//mapping categories to their IDs and names
const categories = [
  { id: "9", name: "General Knowledge" },
  { id: "10", name: "Entertainment: Books" },
  { id: "11", name: "Entertainment: Film" },
  { id: "12", name: "Entertainment: Music" },
  { id: "13", name: "Entertainment: Musicals & Theatres" },
  { id: "14", name: "Entertainment: Television" },
  { id: "15", name: "Entertainment: Video Games" },
  { id: "16", name: "Entertainment: Board Games" },
  { id: "17", name: "Science & Nature" },
  { id: "18", name: "Science: Computers" },
  { id: "19", name: "Science: Mathematics" },
  { id: "20", name: "Mythology" },
  { id: "21", name: "Sports" },
  { id: "22", name: "Geography" },
  { id: "23", name: "History" },
  { id: "24", name: "Politics" },
  { id: "25", name: "Art" },
  { id: "26", name: "Celebrities" },
  { id: "27", name: "Animals" },
  { id: "28", name: "Vehicles" },
  { id: "29", name: "Entertainment: Comics" },
  { id: "30", name: "Science: Gadgets" },
  { id: "31", name: "Entertainment: Japanese Anime & Manga" },
  { id: "32", name: "Entertainment: Cartoon & Animations" },
];

export default function Settings({ onSettingsUpdate }: Props) {
  //default to 5 easy questions from first category
  const [difficulty, setDifficulty] = useState<string>("easy");
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);
  const [category, setCategory] = useState<string>(categories[0].id);
  const [timedMode, setTimedMode] = useState<boolean>(false);

  const applySettings = () => {
    onSettingsUpdate({ difficulty, numberOfQuestions, category, timedMode });
  };

  return (
    <Card width="40%" alignSelf="center" padding="5px">
      <form style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
        <Flex direction="column" alignItems="center">
          <h2>Game Settings</h2>
          <label style={{ marginBottom: "10px", width: "100%" }}>
            Difficulty:
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              style={{ marginLeft: "10px", width: "100%" }}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label style={{ marginBottom: "10px", width: "100%" }}>
            Number of Questions:
            <input
              type="number"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
              min={1}
              max={50}
              style={{ marginLeft: "10px", width: "100%" }}
            />
          </label>
          <label style={{ marginBottom: "20px", width: "100%" }}>
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ marginLeft: "10px", width: "100%" }}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
          <label style={{ marginBottom: "10px", width: "100%" }}>
            Timed Mode:
            <input
              type="checkbox"
              checked={timedMode}
              onChange={(e) => setTimedMode(e.target.checked)}
              style={{ marginLeft: "10px" }}
            />
          </label>
          <Button onClick={applySettings}>Apply Settings</Button>
        </Flex>
      </form>
    </Card>
  );
}
