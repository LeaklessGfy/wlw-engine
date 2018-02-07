import { Card, State } from "../models";

interface ActionManager {
  makeNewTurn(mutable: State, original: Readonly<State>): State;
  makeCardValidation(card: Readonly<Card>, state: Readonly<State>): boolean;
  makeCardPlay(mutable: State, original: Readonly<State>): State;
  makeCardDistribution(mutable: State, original: Readonly<State>): State;
}

export default ActionManager;
