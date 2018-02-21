import { Card, State, Engine } from "../../../models";
import * as C from "../../../consts";

class Pin implements Card {
  uid = "pin";
  actuators = [];
  name = "Pin";
  img = "";
  description = "Attempt to pin the opponent.";
  stamina = 3;
  intensity = 0;
  targets = [C.Targets.OPPONENT];
  rarity = C.Rarities.BANAL;
  reverseable = true;
}

export default Pin;
