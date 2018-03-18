import { Card } from "../../../models";
import * as C from "../../../consts";

class AttitudeAdjustement implements Card {
  uid = "attitude_adjustement";
  actuators = ["damage"];
  name = "Attitude Adjustement";
  img = "https://ekpoeze.files.wordpress.com/2014/02/image001.jpg";
  description = "";
  stamina = 8;
  intensity = 6;
  damage = 40;
  effects = [];
  targets = [C.Targets.OPPONENT];
  rarity = C.Rarities.UNIQUE;
  reverseable = false;
  blockable = true;
}

export default AttitudeAdjustement;
