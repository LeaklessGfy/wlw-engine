import Accessor from "../accessors/accessor";
import CardAccessor from "../accessors/card.accessor";
import WrestlerAccessor from "../accessors/wrestler.accessor";

interface Actuator {
  readonly key;
  operate(
    card: CardAccessor,
    target: WrestlerAccessor,
    active: WrestlerAccessor,
    accessor: Accessor
  ): void;
}

export default Actuator;
