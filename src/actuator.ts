import State from "./models/state";

interface Actuator {
  key(): string;
  operate(mutable: State, original: State): void;
}

export default Actuator;
