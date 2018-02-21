import { Card, State, Engine } from "../../../models";
import * as C from "../../../consts";

class Clothesline implements Card {
  uid = "clothesline";
  actuators = [];
  name = "Clothesline";
  img = "";
  description = "";
  stamina = 4;
  intensity = 0;
  damage = 4;
  effects = []; //down 100%
  targets = [C.Targets.OPPONENT];
  rarity = C.Rarities.BANAL;
  reverseable = true;
}

export default Clothesline;
