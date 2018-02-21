import { Card, State, Engine } from "../../../models";
import * as C from "../../../consts";

class Dropkick implements Card {
  uid = "dropkick";
  actuators = [];
  name = "Dropkick";
  img = "";
  description = "";
  stamina = 6;
  intensity = 2;
  damage = 12;
  effects = []; //down 40%
  targets = [C.Targets.OPPONENT];
  rarity = C.Rarities.BANAL;
  reverseable = false;
}

export default Dropkick;
