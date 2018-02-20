import AbstractCard from "../../../entities/abstract-card";
import { State, Engine } from "../../../models";
import * as C from "../../../consts";

class TimeWrap extends AbstractCard {
  uid = "time_wrap";
  name = "Time Wrap";
  img = "";
  description = "Right after your turn, gain a new turn";
  stamina = 4;
  intensity = 6;
  targets = [C.Targets.SELF];
  rarity = C.Rarities.VERY_RARE;

  operate(mutable: State, engine: Engine): void {
    mutable.next.unshift(mutable.active);
  }
}

export default TimeWrap;
