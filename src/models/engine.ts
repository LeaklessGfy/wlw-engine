import State from "../models/state";

interface Engine {
  newTurn(_state: State): State;
  distributeHands(_state: State): State;
  validateHands(_state: State): State;
  playCard(_state: State): State;
  randomCard(_state: State): State;
  randomTargets(_state: State): State;
}

export default Engine;
