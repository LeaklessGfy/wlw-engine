import State from "../models/state";

interface Engine {
  init(_state: State): State;
  turn(_state: State): State;
  play(_state: State): State;
}

export default Engine;
