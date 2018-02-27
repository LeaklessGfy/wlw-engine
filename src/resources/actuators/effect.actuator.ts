import Actuator from "../../models/actuator";
import Accessor from "../../accessors/accessor";
import CardAccessor from "../../accessors/card.accessor";
import WrestlerAccessor from "../../accessors/wrestler.accessor";

class EffectActuator implements Actuator {
  key = "effect";

  operate(
    card: CardAccessor,
    target: WrestlerAccessor,
    active: WrestlerAccessor,
    accessor: Accessor
  ): void {
    card.getEffects();
  }
}
