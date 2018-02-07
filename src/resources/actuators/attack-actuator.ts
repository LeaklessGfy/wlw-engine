import Actuator from "../../interfaces/actuator";
import State from "../../models/state";
import Wrestler from "../../models/wrestler";
import { ATTACK } from "../../consts/actuators";

class AttackActuator implements Actuator {
  key(): string {
    return ATTACK;
  }

  operate(mutable: State, original: Readonly<State>): void {
    mutable.targets.forEach(targetKey => {
      const target: Wrestler = (<any>mutable.players)[targetKey];
      target.health.val -= mutable.card.damages;
    });
  }
}

export default AttackActuator;
