import Wrestler from "./wrestler";
import Card from "./card";

interface State {
  turn: number;
  active: string;
  targets: string[];
  players: string[];
  card: Card;
  wrestlers: Wrestler[];
}

export default State;
