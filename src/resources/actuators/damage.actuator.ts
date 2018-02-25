import { Accessor, Actuator, State } from "../../models";
import { randomInt } from "../../utils";

class DamageActuactor implements Actuator {
  key = "damage";

  operate(mutable: State, accessor: Accessor): void {
    const active = accessor.getActive();
    const target = accessor.getFirstTarget();
    const card = accessor.getCard();

    let damage = card.damage + randomInt(0, active.combat.damage);
    //Critical
    if (randomInt(0, 100) <= active.combat.crit) {
      damage = damage * 1.5;
    }

    target.health.val = Math.max(0, target.health.val - damage);
  }
}

export default DamageActuactor;
