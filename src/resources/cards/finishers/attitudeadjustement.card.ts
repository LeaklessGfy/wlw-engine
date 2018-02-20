import AbstractCard from "../../../entities/abstract-card";
import { State, Engine } from "../../../models";
import * as C from "../../../consts";

class AttitudeAdjustement extends AbstractCard {
  uid = "attitude_adjustement";
  name = "Attitude Adjustement";
  img = "";
  description = "";
  stamina = 5;
  intensity = 7;
  damage = 40;
  effects = [];
  targets = [C.Targets.OPPONENT];
  rarity = C.Rarities.UNIQUE;
}

export default AttitudeAdjustement;
