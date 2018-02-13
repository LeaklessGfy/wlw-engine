import { Card, State, Wrestler } from "../models";

interface Engine {
  newTurn(_state: State): State;
  validateCard(_card: Card): boolean;
  playCard(_state: State): State;
  distributeCard(_state: State): State;
  chooseRandomCard(_state: State): State;
  getOriginalState(): Readonly<State>;
  getActive(state: State): Wrestler;
  getFirstTarget(state: State): Wrestler;
  getTargets(state: State): Wrestler[];
  getWrestlers(state: State): Wrestler[];
  getOpponents(wrestler: Wrestler, state: State): Wrestler[];
  getParteners(wrestler: Wrestler, state: State): Wrestler[];
  randomBool(percent?: number): boolean;
  randomInt(min?: number, max?: number): number;
  addValidator(validator): void;
  addDistributor(distributor): void;
}

export default Engine;
