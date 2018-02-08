import Actuator from "../../../interfaces/actuator";
import { State, Wrestler } from "../../../models";
import { BASE } from "../../../consts/actuators";
import { getWrestler } from "../../../utils";

class BaseActuator implements Actuator {
  key(): string {
    return BASE;
  }

  operate(mutable: State, original: Readonly<State>): void {
    const active = getWrestler(mutable.active, mutable.players);
    active.stamina = Math.max(active.stamina - mutable.card.stamina, 0);
    active.intensity = Math.max(active.intensity - mutable.card.intensity, 0);
  }
}

export default BaseActuator;
