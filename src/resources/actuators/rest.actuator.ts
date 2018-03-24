import { injectable } from "inversify";
import Actuator from "../../models/actuator";
import { CardProxy, StateProxy, WrestlerProxy } from "../../proxies";

@injectable()
class RestActuactor implements Actuator {
  public static KEY = "rest";
  readonly KEY = RestActuactor.KEY;

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
