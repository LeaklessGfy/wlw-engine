import Actuator from "../actuator";
import { MIDDLEWARE_ATTACK } from "../consts/middlewares";
import State from "../models/state";
import Wrestler from "../models/wrestler";

class AttackActuator implements Actuator {
  key(): string {
    return "";
  }

  operate(mutable: State, original: State): void {
    mutable.targets.forEach(targetKey => {
      const target: Wrestler = (<any>mutable.players)[targetKey];
      target.health.val -= mutable.card.damages;
    });
  }
}

export default AttackActuator;
