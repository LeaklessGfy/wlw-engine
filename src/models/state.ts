import Players from "./players";
import Card from "./card";

interface State {
  turn: number;
  players: Players;
  active: string;
  targets: string[];
  card: Card;
}

export default State;
