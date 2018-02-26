import Actuator from "../../models/actuator";
import Accessor from "../../accessors/accessor";

class TimewrapActuator implements Actuator {
  key = "timewrap";

  operate(accessor: Accessor): void {
    const next = accessor.getNext();
    next.unshift(accessor.getActiveKey());
  }
}

export default TimewrapActuator;
