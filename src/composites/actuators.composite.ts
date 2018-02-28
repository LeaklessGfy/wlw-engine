import Actuator from "../models/actuator";
import { CardProxy, StateProxy, WrestlerProxy } from "../proxies";

class ActuatorsComposite implements Actuator {
  key = "composite";

  constructor(private readonly actuators: Actuator[]) {}

  operate(
    card: CardProxy,
    target: WrestlerProxy,
    active: WrestlerProxy,
    accessor: StateProxy
  ): void {
    for (let actuator of this.actuators) {
      actuator.operate(card, target, active, accessor);
    }
  }
}

export default ActuatorsComposite;
