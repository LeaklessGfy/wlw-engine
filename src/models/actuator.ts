import State from "./state";
import Engine from "./engine";

interface Actuator {
  readonly key;
  operate(mutable: State, engine: Engine): void;
}

export default Actuator;
