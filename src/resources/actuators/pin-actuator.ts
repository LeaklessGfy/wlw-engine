import Actuator from "../../interfaces/actuator";
import State from "../../models/state";
import { PIN } from "../../consts/actuators";

class PinActuator implements Actuator {
  key(): string {
    return PIN;
  }

  operate(mutable: State, original: Readonly<State>): void {}
}

export default PinActuator;
