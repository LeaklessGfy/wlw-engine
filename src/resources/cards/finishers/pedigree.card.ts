import { Card } from "../../../models";
import * as C from "../../../consts";

class Pedigree implements Card {
  uid = "pedigree";
  actuators = ["damage"];
  name = "Pedigree";
  img = "http://catch-americain.wifeo.com/images/t/tri/triple-h-pedigree-randy-orton-backlash.jpg";
  description = "";
  stamina = 8;
  intensity = 6;
  damage = 40;
  effects = [];
  targets = [C.Targets.OPPONENT];
  rarity = C.Rarities.UNIQUE;
  reverseable = false;
}

export default Pedigree;
