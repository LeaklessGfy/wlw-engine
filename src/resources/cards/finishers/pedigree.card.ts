import { State, Engine } from "../../../models";
import * as C from "../../../consts";

class Pedigree {
  uid = "pedigree";
  name = "Pedigree";
  img = "";
  description = "";
  stamina = 5;
  intensity = 7;
  damage = 40;
  effects = [];
  targets = [C.Targets.OPPONENT];
  rarity = C.Rarities.UNIQUE;
}

export default Pedigree;
