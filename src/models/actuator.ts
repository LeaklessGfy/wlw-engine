import Accessor from "./accessor";
import State from "./state";

interface Actuator {
  readonly key;
  operate(mutable: State, accessor: Accessor): void;
}

export default Actuator;
