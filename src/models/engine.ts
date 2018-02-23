import { Kernel, State, Validator } from "../models";

interface Engine {
  /** MUTATORS */
  newTurn(_state: State): State;
  distributeCards(_state: State): State;
  validateCards(_state: State): State;
  playCard(_state: State): State;
  chooseRandomCard(_state: State): State;
  chooseRandomTargets(_state: State): State;

  /** HELPERS */
  getKernel(): Kernel;
  addValidator(validator: Validator): void;
}

export default Engine;
