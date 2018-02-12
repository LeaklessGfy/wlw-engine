import State from "../models/state";

interface Engine {
  getOriginalState(): Readonly<State>;
  addValidator(validator): void;
}
