import State from "../models/state";

interface Engine {
  newTurn(_state: State): State;
  playCard(_state: State): State;
}

export default Engine;
