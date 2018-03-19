import { Card } from "../../../models";
import * as C from "../../../consts";

class Dropkick implements Card {
  uid = "dropkick";
  actuators = ["damage"];
  name = "Dropkick";
  img = "http://www.wwehunks.com/wp-content/uploads/2013/05/Dropkick-signature-move-Kofi-Kingston-HD.jpg";
  description = "";
  stamina = 6;
  intensity = 2;
  damage = 15;
  effects = []; //down 40%, stun 25%
  targets = [C.Targets.OPPONENT];
  rarity = C.Rarities.BANAL;
  reverseable = false;
}

export default Dropkick;
