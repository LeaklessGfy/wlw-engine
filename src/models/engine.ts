import State from "../models/state";

interface Engine {
  newTurn(_state: State): State;
  distributeHands(_state: State): State;
  validateHands(_state: State): State;
  playCard(_state: State): State;
  chooseRandomCard(_state: State): State;
  chooseRandomTargets(_state: State): State;
}

export default Engine;
