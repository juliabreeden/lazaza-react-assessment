import { useState } from "react";
import Card from "../componentLibrary/Card";
import Button from "../componentLibrary/Button";

type Props = {
  onSettingsUpdate: (settings: {
    difficulty: string;
    numberOfQuestions: number;
    category: string;
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
  const [difficulty, setDifficulty] = useState("easy");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [category, setCategory] = useState(categories[0].id); // Default to the first category

  const applySettings = () => {
    onSettingsUpdate({ difficulty, numberOfQuestions, category });
  };

  return (
    <Card>
      <form>
        <label>
          Difficulty:
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <label>
          Number of Questions:
          <input
            type="number"
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
            min={1}
            max={50}
          />
        </label>
        <label>
          Category:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>
        <Button onClick={applySettings}>Apply Settings</Button>
      </form>
    </Card>
  );
}
