import State from "../models/state";

interface Actuator {
  key(): string;
  operate(mutable: State, original: Readonly<State>): void;
}

export default Actuator;
