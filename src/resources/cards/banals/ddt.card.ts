import AbstractCard from "../../../entities/abstract-card";
import { State, Engine } from "../../../models";
import * as C from "../../../consts";

class Ddt extends AbstractCard {
  uid = "ddt";
  name = "DDT";
  img = "";
  description = "";
  stamina = 3;
  intensity = 1;
  damage = 10;
  effects = []; //blood
  targets = [C.Targets.OPPONENT];
  rarity = C.Rarities.BANAL;
}

export default Ddt;
