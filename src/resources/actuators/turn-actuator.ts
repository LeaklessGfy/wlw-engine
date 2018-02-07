import Actuator from "../../interfaces/actuator";
import State from "../../models/state";

class TurnActuator implements Actuator {
  key(): string {
    return "";
  }

  operate(mutable: State, original: Readonly<State>): void {
    mutable.turn++;
  }
}

export default TurnActuator;
