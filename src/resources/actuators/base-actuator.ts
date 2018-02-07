import Actuator from "../../interfaces/actuator";
import State from "../../models/state";
import Wrestler from "../../models/wrestler";
import { BASE } from "../../consts/actuators";
import { getWrestler } from "../../utils/utils";

class BaseActuator implements Actuator {
  key(): string {
    return BASE;
  }

  operate(mutable: State, original: Readonly<State>): void {
    const active = getWrestler(mutable.active, mutable.players);
    active.stamina -= mutable.card.stamina;
    active.intensity -= mutable.card.intensity;
  }
}

export default BaseActuator;
