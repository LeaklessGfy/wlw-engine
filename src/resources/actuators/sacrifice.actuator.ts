import { injectable } from "inversify";
import Actuator from "../../models/actuator";
import { CardProxy, StateProxy, WrestlerProxy } from "../../proxies";

@injectable()
class SacrificeActuactor implements Actuator {
  readonly KEY = "sacrifice";

  operate(
    card: CardProxy,
    target: WrestlerProxy,
    active: WrestlerProxy,
    state: StateProxy
  ): void {
    // Make it modular
    active.getHealth().addVal(-15);
    active.getIntensity().addVal(4);
  }
}

export default SacrificeActuactor;
