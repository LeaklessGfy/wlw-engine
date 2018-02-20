import AbstractCard from "../../../entities/abstract-card";
import { State, Engine } from "../../../models";
import * as C from "../../../consts";

class Facebuster extends AbstractCard {
  uid = "facebuster";
  name = "Facebuster";
  img = "";
  description = "";
  stamina = 5;
  intensity = 5;
  damage = 15;
  effects = []; //Bleed, KO, self.UNLEASHED
  targets = [C.Targets.OPPONENT];
  rarity = C.Rarities.SIGNATURE;
}

export default Facebuster;
