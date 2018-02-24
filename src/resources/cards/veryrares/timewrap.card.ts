import { Card } from "../../../models";
import * as C from "../../../consts";

class TimeWrap implements Card {
  uid = "time_wrap";
  actuators = ["time_wrap"];
  name = "Time Wrap";
  img = "";
  description = "Right after your turn, gain a new turn";
  stamina = 4;
  intensity = 5;
  targets = [C.Targets.SELF];
  rarity = C.Rarities.VERY_RARE;
  reverseable = false;
  valid = false;
}

export default TimeWrap;
