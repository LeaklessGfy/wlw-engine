import Accessor from "../accessors/accessor";

interface Actuator {
  readonly key;
  operate(accessor: Accessor): void;
}

export default Actuator;
