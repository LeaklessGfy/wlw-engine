import { Card } from "../../../models";
import * as C from "../../../consts";

class Facebuster implements Card {
  uid = "facebuster";
  actuators = ["damage"];
  name = "Facebuster";
  img = "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s640x640/sh0.08/e35/12224435_566097080210702_1375145109_n.jpg";
  description = "";
  stamina = 5;
  intensity = 5;
  damage = 15;
  effects = []; //Bleed, KO, self.UNLEASHED
  targets = [C.Targets.OPPONENT];
  rarity = C.Rarities.SIGNATURE;
  reverseable = false;
  blockable = true;
}

export default Facebuster;
