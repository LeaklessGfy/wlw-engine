import {
  Card,
  Distributor,
  Kernel,
  State,
  Validator,
  Wrestler
} from "../models";

interface Engine {
  /** MUTATORS */
  newTurn(_state: State): State;
  playCard(_state: State): State;
  distributeCards(_state: State): State;
  validateCards(_state: State): State;
  chooseRandomCard(_state: State): State;
  chooseRandomTargets(_state: State): State;

  /** HELPERS */
  getKernel(): Kernel;
  getInitialState(): State;
  getOriginalState(): Readonly<State>;
  getActive(state: State): Wrestler;
  getFirstTarget(state: State): Wrestler;
  getTargets(state: State): Wrestler[];
  getWrestlers(state: State): Wrestler[];
  getOpponents(key: string, state: State): string[];
  getParteners(wrestler: Wrestler, state: State): Wrestler[];
  randomBool(percent?: number): boolean;
  randomInt(min?: number, max?: number): number;
  addValidator(validator: Validator): void;
  clone<T>(o: T): T;
  freeze<T>(o: T): T;
}

export default Engine;
