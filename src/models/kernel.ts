import Actuator from "./actuator";

interface Kernel {
  add(actuator: Actuator): void;
  addAll(...actuators: Actuator[]): void;
  get(key: string): Actuator | null;
}

export default Kernel;
