import { injectable } from "inversify";
import Actuator from "../../models/actuator";
import { CardProxy, StateProxy, WrestlerProxy } from "../../proxies";

@injectable()
class MirrorActuator implements Actuator {
  public static KEY = "mirror";
  readonly KEY = MirrorActuator.KEY;

  operate(
    card: CardProxy,
    target: WrestlerProxy,
    active: WrestlerProxy,
    state: StateProxy
  ): void {
    const tmp = active
      .getHand()
      .getRef()
      .filter(c => !card.is(c));

    active.setHand(target.getHand().getRef());
    target.setHand(tmp);
  }
}

export default MirrorActuator;
