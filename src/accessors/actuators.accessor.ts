import Actuator from "../models/actuator";
import { Accessor, CardAccessor, WrestlerAccessor } from "./";

class ActuatorsAccessor {
  constructor(private readonly actuators: Actuator[]) {}

  operate(
    card: CardAccessor,
    target: WrestlerAccessor,
    active: WrestlerAccessor,
    accessor: Accessor
  ): void {
    for (let actuator of this.actuators) {
      actuator.operate(card, target, active, accessor);
    }
  }
}

export default ActuatorsAccessor;
