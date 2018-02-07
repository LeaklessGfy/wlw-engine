import State from "../models/State";

interface Actuator {
  key(): string;
  operate(mutable: State, original: Readonly<State>): void;
}

export default Actuator;
