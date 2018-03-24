import { injectable } from "inversify";
import "reflect-metadata";
import Actuator from "models/actuator";
import { CardProxy, StateProxy, WrestlerProxy } from "proxies";
import { randomInt } from "utils";

@injectable()
class DamageActuator implements Actuator {
  public static KEY = "damage";
  readonly KEY = DamageActuator.KEY;

  operate(
    card: CardProxy,
    target: WrestlerProxy,
    active: WrestlerProxy,
    state: StateProxy
  ): void {
    const combat = active.getCombat();
    let damage = card.getDamage() + randomInt(0, combat.getDamage());
    if (active.hasCrit()) {
      damage = damage * 1.5;
      state
        .getRecords()
        .getRef()
        .push({ key: "", val: damage });
    }
    const health = target.getHealth();
    health.addVal(-damage);
  }
}

export default DamageActuator;
