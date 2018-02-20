import AbstractCard from "../../../entities/abstract-card";
import { State, Engine } from "../../../models";
import * as C from "../../../consts";

class Mirror extends AbstractCard {
  uid = "mirror";
  name = "Mirror";
  img = "";
  description = "Exchange your card with opponent one";
  stamina = 3;
  intensity = 1;
  targets = [C.Targets.OPPONENT];
  rarity = C.Rarities.RARE;

  operate(mutable: State, engine: Engine): void {
    const active = engine.getActive(mutable);
    const target = engine.getFirstTarget(mutable);

    const tmp = active.hand;
    active.hand = target.hand;
    target.hand = tmp;
  }
}

export default Mirror;
