import { Actuator, State, Engine } from "../../models";
import { getFirstTarget, getActiveCard } from "../../utils/state.utils";

class DamageActuactor implements Actuator {
  key = "damage";

  operate(mutable: State, engine: Engine): void {
    const target = getFirstTarget(mutable);
    const card = getActiveCard(mutable);
    target.health.val = Math.max(0, target.health.val - card.damage);
  }
}

export default DamageActuactor;
