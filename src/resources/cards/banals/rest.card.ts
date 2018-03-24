import { Card } from "../../../models";
import * as C from "../../../consts";

class Rest implements Card {
  uid = "rest";
  actuators = ["rest"];
  name = "Rest";
  img = "https://uproxx.files.wordpress.com/2016/12/screen-shot-2016-12-13-at-8-53-35-pm.jpg?quality=95&w=650";
  description = "Gain 4 STAMINA and 8 PV. 20% chance to become VULNERABLE";
  stamina = 0;
  intensity = 1;
  effects = []; // 20% vulnerable
  targets = [C.Targets.SELF];
  rarity = C.Rarities.BANAL;
  reverseable = false;
  blockable = false;
}

export default Rest;
