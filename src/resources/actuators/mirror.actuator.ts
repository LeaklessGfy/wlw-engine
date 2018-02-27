import Actuator from "../../models/actuator";
import Accessor from "../../accessors/accessor";
import CardAccessor from "../../accessors/card.accessor";
import WrestlerAccessor from "../../accessors/wrestler.accessor";

class MirrorActuator implements Actuator {
  key = "mirror";

  operate(
    card: CardAccessor,
    target: WrestlerAccessor,
    active: WrestlerAccessor,
    accessor: Accessor
  ): void {
    const tmp = active.getHand().getRef();
    active.setHand(target.getHand().getRef());
    target.setHand(tmp);
  }
}

export default MirrorActuator;
