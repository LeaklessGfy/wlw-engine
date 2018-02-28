import Players from "./players";
import Card from "./card";
import Mode from "./mode";
import Record from "./record";

interface State {
  turn: number; // => 1, 2, 3 ...
  viewer: string; // => P1, P2, CPU? ...
  active: string; // => P1, P2, CPU ...
  targets: string[]; // => [P1, P2, CPU ...]
  next: string[]; // => [P1, P2, CPU ...]
  players: Players;
  card: number;
  mode: Mode;
  state: number;
  records?: Record[];
}

export default State;
