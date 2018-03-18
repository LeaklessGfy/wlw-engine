import Actuator from "../../models/actuator";
import { CardProxy, StateProxy, WrestlerProxy } from "../../proxies";

class MirrorActuator implements Actuator {
  key = "mirror";

  operate(
    card: CardProxy,
    target: WrestlerProxy,
    active: WrestlerProxy,
    state: StateProxy
  ): void {
    const tmp = active
      .getHand()
      .getRef()
      .filter(c => c !== card.getRef());

    active.setHand(target.getHand().getRef());
    target.setHand(tmp);
  }
}

export default MirrorActuator;
