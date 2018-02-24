import { Card } from "../../../models";
import * as C from "../../../consts";

class Facebuster implements Card {
  uid = "facebuster";
  actuators = ["damage"];
  name = "Facebuster";
  img = "";
  description = "";
  stamina = 5;
  intensity = 5;
  damage = 15;
  effects = []; //Bleed, KO, self.UNLEASHED
  targets = [C.Targets.OPPONENT];
  rarity = C.Rarities.SIGNATURE;
  reverseable = false;
  valid = false;
}

export default Facebuster;
