import { State, Wrestler } from "../models";

interface Engine {
  getOriginalState(): Readonly<State>;
  getActive(mutable: State): Wrestler;
  getTargets(mutable: State): Wrestler[];
  addValidator(validator): void;
}

export default Engine;
