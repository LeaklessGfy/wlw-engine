import { Actuator, State, Engine } from "../../models";
import { getFirstTarget } from "../../utils/state.utils";

class DamageActuactor implements Actuator {
  key = "damage";

  preOperate(mutable, engine) {}

  operate(mutable: State, engine: Engine): void {
    const target = getFirstTarget(mutable);
    const card = mutable.card;
    target.health.val = Math.max(0, target.health.val - card.damage);
  }

  postOperate(mutable, engine) {}
}

export default DamageActuactor;
