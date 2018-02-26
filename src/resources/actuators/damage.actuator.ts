import Actuator from "../../models/actuator";
import Accessor from "../../accessors/accessor";
import { randomInt } from "../../utils";

class DamageActuactor implements Actuator {
  key = "damage";

  operate(accessor: Accessor): void {
    const active = accessor.getActive();
    const combat = active.getCombat();
    const target = accessor.getFirstTarget();
    const card = accessor.getCard();

    let damage = card.getDamage() + randomInt(0, combat.getDamage());
    //Critical
    if (randomInt(0, 100) <= combat.getCrit()) {
      damage = damage * 1.5;
    }

    const health = target.getHealth();
    health.setVal(health.getVal() - damage);
  }
}

export default DamageActuactor;
