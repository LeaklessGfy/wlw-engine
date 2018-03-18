import { Card } from "../../../models";
import * as C from "../../../consts";

class Southsayer implements Card {
  uid = "southsayer";
  actuators = ["southsayer"];
  name = "Southsayer";
  img = "";
  description = "See the hand of your opponent.";
  stamina = 6;
  intensity = 4;
  targets = [C.Targets.OPPONENT];
  rarity = C.Rarities.RARE;
  reverseable = false;
  blockable = true;
}

export default Southsayer;
