import Card from "./models/card";
import Kernel from "./models/kernel";
import Actuator from "./models/actuator";

class CoreKernel implements Kernel {
  private readonly actuators: any;

  constructor(actuators: Actuator[] = []) {
    this.actuators = {};
    this.addAll(...actuators);
  }

  public add(actuator: Actuator) {
    this.actuators[actuator.key] = actuator;
  }

  public addAll(...actuators: Actuator[]) {
    for (let actuator of actuators) {
      this.add(actuator);
    }
  }

  public get(key: string): Actuator | null {
    return this.actuators[key] ? this.actuators[key] : null;
  }
}

export default CoreKernel;
