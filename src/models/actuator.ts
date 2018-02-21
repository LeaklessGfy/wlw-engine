import State from "./state";
import Engine from "./engine";

interface Actuator {
  readonly key;
  preOperate(mutable: State, engine: Engine): void;
  operate(mutable: State, engine: Engine): void;
  postOperate(mutable: State, engine: Engine): void;
}

export default Actuator;
