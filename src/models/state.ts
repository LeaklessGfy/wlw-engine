import Players from "./players";
import Card from "./card";
import Mode from "./mode";

interface State {
  viewer?: string; // => P1, P2, CPU? ...
  turn: number; // => 1, 2, 3 ...
  active: string; // => P1, P2, CPU ...
  targets: string[]; // => [P1, P2, CPU ...]
  next: string[]; // => [P1, P2, CPU ...]
  players: Players;
  card: Card;
  mode: Mode;
}

export default State;
