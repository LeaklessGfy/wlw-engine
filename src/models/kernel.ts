import Actuator from "./actuator";

interface Kernel {
  add(actuator: Actuator);
  addAll(...actuators: Actuator[]);
  get(key: string): Actuator | null;
}

export default Kernel;
