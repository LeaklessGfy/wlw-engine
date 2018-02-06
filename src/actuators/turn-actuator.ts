import Actuator from "../actuator";
import State from "../models/state";

class TurnActuator implements Actuator {
  key(): string {
    return "";
  }

  operate(mutable: State, original: State): void {
    mutable.turn++;
  }
}

export default TurnActuator;
