import Actuator from "./actuator";
import State from "./models/state";

class Kernel {
  private actuators: any;

  constructor(actuatorList: Actuator[]) {
    this.actuators = {};
    actuatorList.forEach(actuator => this.add(actuator));
  }

  public add(actuator: Actuator): void {
    const key = actuator.key();
    if (!this.actuators[key]) {
      this.actuators[key] = [];
    }
    this.actuators[key].push(actuator);
  }

  public get(key: string): Actuator[] {
    if (!this.actuators[key]) {
      return [];
    }
    return this.actuators[key];
  }
}

export default Kernel;
