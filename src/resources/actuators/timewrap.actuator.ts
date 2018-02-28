import Actuator from "../../models/actuator";
import { CardProxy, StateProxy, WrestlerProxy } from "../../proxies";

class TimewrapActuator implements Actuator {
  key = "timewrap";

  operate(
    card: CardProxy,
    target: WrestlerProxy,
    active: WrestlerProxy,
    state: StateProxy
  ): void {
    const next = state.getNextKey();
    next.unshift(state.getActiveKey());
  }
}

export default TimewrapActuator;
