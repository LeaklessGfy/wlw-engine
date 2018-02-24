import State from "../models/state";

interface Engine {
  newTurn(_state: State): State;
  distributeHand(_state: State): State;
  validateHand(_state: State): State;
  playCard(_state: State): State;
  chooseRandomCard(_state: State): State;
  chooseRandomTargets(_state: State): State;
}

export default Engine;
