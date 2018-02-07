import Players from "./players";
import Card from "./card";

interface State {
  turn: number;
  active: string;
  targets: string[];
  players: Players;
  card: Card;
}

export default State;
