import AbstractCard from "../../../entities/abstract-card";
import { State, Engine } from "../../../models";
import * as C from "../../../consts";

class Clothesline extends AbstractCard {
  uid = "clothesline";
  name = "Clothesline";
  img = "";
  description = "";
  stamina = 4;
  intensity = 0;
  damage = 4;
  effects = []; //down 100%
  targets = [C.Targets.OPPONENT];
  rarity = C.Rarities.BANAL;
}

export default Clothesline;
