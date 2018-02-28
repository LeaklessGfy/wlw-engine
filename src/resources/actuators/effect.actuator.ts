import Actuator from "../../models/actuator";
import { CardProxy, StateProxy, WrestlerProxy } from "../../proxies";

class EffectActuator implements Actuator {
  key = "effect";

  operate(
    card: CardProxy,
    target: WrestlerProxy,
    active: WrestlerProxy,
    state: StateProxy
  ): void {
    card.getEffects();
  }
}
