import { Card } from "../../../models";
import * as C from "../../../consts";

class SpringboardDiving implements Card {
  uid = "springboard_diving";
  actuators = ["damage"];
  name = "Springboard Diving";
  img = "http://cdn1.thecomeback.com/wp-content/uploads/2016/09/kevin-owens-seth-rollins-clash-of-champions.jpg";
  description = "";
  stamina = 8;
  intensity = 2;
  targets = [C.Targets.OPPONENT];
  rarity = C.Rarities.RARE;
  reverseable = false;
}

export default SpringboardDiving;
