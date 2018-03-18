import { Card } from "../../../models";
import * as C from "../../../consts";

class Mirror implements Card {
  uid = "mirror";
  actuators = ["mirror"];
  name = "Mirror";
  img = "http://images.indianexpress.com/2016/09/ambrose-m.jpg";
  description = "Exchange your card with opponent one";
  stamina = 6;
  intensity = 4;
  targets = [C.Targets.OPPONENT];
  rarity = C.Rarities.RARE;
  reverseable = false;
  blockable = false;
}

export default Mirror;
