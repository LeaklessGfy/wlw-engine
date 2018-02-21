import { State, Engine } from "../../../models";
import * as C from "../../../consts";

class Rest {
  uid = "rest";
  name = "Rest";
  img = "";
  description = "Gain <b>4</b> stamina point. 20% chance become <span style='color=red;'>VULNERABLE.</span>";
  stamina = 0;
  intensity = 1;
  targets = [C.Targets.SELF];
  rarity = C.Rarities.RARE;

  operate(mutable: State, engine: Engine): void {
    const active = engine.getActive(mutable);
    active.stamina.val += 4;
  }
}

export default Rest;
