import Actuator from "../../models/actuator";
import Accessor from "../../accessors/accessor";
import { randomInt } from "../../utils";

class RestActuactor implements Actuator {
  key = "rest";

  operate(accessor: Accessor): void {
    const active = accessor.getActive();
    const stamina = active.getStamina();
    const health = active.getHealth();

    stamina.addVal(4);
    health.addVal(8);
  }
}

export default RestActuactor;
