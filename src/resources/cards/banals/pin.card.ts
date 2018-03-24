import { Card } from "../../../models";
import * as C from "../../../consts";

class Pin implements Card {
  uid = "pin";
  actuators = ["pin"];
  name = "Pin";
  img = "http://www.wrestlingmedia.org/wp-content/uploads/2015/09/John-Cena-Pin-On-Kurt-Angle.jpg";
  description = "Attempt to pin the opponent.";
  stamina = 3;
  intensity = 0;
  targets = [C.Targets.OPPONENT];
  rarity = C.Rarities.BANAL;
  reverseable = true;
  blockable = true;
  valid: boolean;
}

export default Pin;
