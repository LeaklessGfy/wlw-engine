import Players from "./players";
import AbstractCard from "../entities/abstract-card";

interface State {
  turn: number;
  active: string;
  targets: string[];
  players: Players;
  card: AbstractCard;
}

export default State;
