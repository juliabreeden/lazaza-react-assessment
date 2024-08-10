import Card from "../componentLibrary/Card";
import Flex from "../componentLibrary/Flex";
import Button from "../componentLibrary/Button";

type Props = {
  onStartGame: () => void;
};

export default function Welcome({ onStartGame }: Props) {
  return (
    <Card maxWidth="600px" width="100%" alignSelf="center">
      <Flex direction="row">
        <div>
          <h1>Welcome to the Trivia Game!</h1>
          <p>Here's how to play:</p>
          <ul>
            <li>Read each question carefully.</li>
            <li>Select the correct answer from the choices provided.</li>
            <li>Click the settings icon to adjust your game preferences.</li>
            <li>Try to get as many correct answers as possible!</li>
          </ul>
          <Button onClick={onStartGame}> Start Game</Button>
        </div>
      </Flex>
    </Card>
  );
}
