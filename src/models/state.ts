import Players from "./players";
import Card from "./card";

interface State {
  turn: number; // => 1, 2, 3 ...
  active: string; // => P1, P2, CPU ...
  targets: string[]; // => [P1, P2, CPU ...]
  next: string[]; // => [P1, P2, CPU ...]
  players: Players;
  card: Card;
}

export default State;
