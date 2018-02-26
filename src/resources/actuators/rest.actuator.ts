import { Accessor, Actuator, State } from "../../models";
import { randomInt } from "../../utils";

class RestActuactor implements Actuator {
  key = "rest";

  operate(mutable: State, accessor: Accessor): void {
    const active = accessor.getActive();
  }
}

const active = engine.getActive(mutable);
active.stamina.val += 4;
active.health.val += 8;
