import Actuator from "../../models/actuator";
import { CardProxy, StateProxy, WrestlerProxy } from "../../proxies";

class RestActuactor implements Actuator {
  key = "rest";

  operate(
    card: CardProxy,
    target: WrestlerProxy,
    active: WrestlerProxy,
    state: StateProxy
  ): void {
    // Make it modular
    active.getStamina().addVal(4);
    active.getHealth().addVal(8);
  }
}

export default RestActuactor;
