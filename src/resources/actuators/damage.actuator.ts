import Actuator from "../../models/actuator";
import Accessor from "../../accessors/accessor";
import CardAccessor from "../../accessors/card.accessor";
import WrestlerAccessor from "../../accessors/wrestler.accessor";
import { randomInt } from "../../utils";

class DamageActuator implements Actuator {
  key = "damage";

  operate(
    card: CardAccessor,
    target: WrestlerAccessor,
    active: WrestlerAccessor,
    accessor: Accessor
  ): void {
    const combat = active.getCombat();

    let damage = card.getDamage() + randomInt(0, combat.getDamage());
    //Critical
    if (randomInt(0, 100) <= combat.getCrit()) {
      damage = damage * 1.5;
    }

    const health = target.getHealth();
    health.addVal(-damage);
  }
}

export default DamageActuator;
