import { Actuator, State, Engine } from "../../models";

class DamageActuactor implements Actuator {
  key = "damage";

  preOperate(mutable, engine) {}

  operate(mutable: State, engine: Engine): void {
    const target = engine.getFirstTarget(mutable);
    const card = mutable.card;
    target.health.val = Math.max(0, target.health.val - card.damage);
  }

  postOperate(mutable, engine) {}
}

export default DamageActuactor;
