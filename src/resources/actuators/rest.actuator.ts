import Actuator from "../../models/actuator";
import Accessor from "../../accessors/accessor";
import CardAccessor from "../../accessors/card.accessor";
import WrestlerAccessor from "../../accessors/wrestler.accessor";
import { randomInt } from "../../utils";

class RestActuactor implements Actuator {
  key = "rest";

  operate(
    card: CardAccessor,
    target: WrestlerAccessor,
    active: WrestlerAccessor,
    accessor: Accessor
  ): void {
    active.getStamina().addVal(4);
    active.getHealth().addVal(8);
  }
}

export default RestActuactor;
