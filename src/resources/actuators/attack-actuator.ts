import Actuator from "../../interfaces/actuator";
import { State, Wrestler } from "../../models";
import { ATTACK } from "../../consts/actuators";
import { getWrestler } from "../../utils/utils";

class AttackActuator implements Actuator {
  key(): string {
    return ATTACK;
  }

  operate(mutable: State, original: Readonly<State>): void {
    mutable.targets.forEach(key => {
      const target = getWrestler(key, mutable.players);
      target.health.val -= mutable.card.damage;
    });
  }
}

export default AttackActuator;
