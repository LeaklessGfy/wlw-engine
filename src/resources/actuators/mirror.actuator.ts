import Actuator from "../../models/actuator";
import Accessor from "../../accessors/accessor";

class MirrorActuator implements Actuator {
  key = "mirror";

  operate(accessor: Accessor): void {
    const active = accessor.getActive();
    const target = accessor.getFirstTarget();

    const tmp = active.getHand().getRef();
    active.setHand(target.getHand().getRef());
    target.setHand(tmp);
  }
}

export default MirrorActuator;
