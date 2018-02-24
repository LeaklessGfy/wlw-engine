import { Card, State, Engine } from "../../../models";
import * as C from "../../../consts";

class Clothesline implements Card {
  uid = "clothesline";
  actuators = ["damage"];
  name = "Clothesline";
  img = "https://cdn.vox-cdn.com/thumbor/ORzWGCr-e0iBntP_Iw9w1vFElCI=/0x0:541x361/1200x800/filters:focal(0x0:541x361)/cdn.vox-cdn.com/uploads/chorus_image/image/32442515/0803_Raw_10132008jg0391_Wyeth.0.jpg";
  description = "";
  stamina = 2;
  intensity = 0;
  damage = 4;
  effects = []; //down 100%
  targets = [C.Targets.OPPONENT];
  rarity = C.Rarities.BANAL;
  reverseable = true;
  valid = false;
}

export default Clothesline;
