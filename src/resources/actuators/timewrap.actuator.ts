import { injectable } from "inversify";
import Actuator from "../../models/actuator";
import { CardProxy, StateProxy, WrestlerProxy } from "../../proxies";

@injectable()
class TimewrapActuator implements Actuator {
  public static KEY = "timewrap";
  readonly KEY = TimewrapActuator.KEY;

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
