import Actuator from "../../models/actuator";
import Accessor from "../../accessors/accessor";
import CardAccessor from "../../accessors/card.accessor";
import WrestlerAccessor from "../../accessors/wrestler.accessor";

class TimewrapActuator implements Actuator {
  key = "timewrap";

  operate(
    card: CardAccessor,
    target: WrestlerAccessor,
    active: WrestlerAccessor,
    accessor: Accessor
  ): void {
    const next = accessor.getNext();
    next.unshift(accessor.getActiveKey());
  }
}

export default TimewrapActuator;
