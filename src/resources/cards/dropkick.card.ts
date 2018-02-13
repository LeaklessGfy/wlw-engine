import AbstractCard from "../../entities/abstract-card";
import { State, Engine } from "../../models";
import * as C from "../../consts";

class Dropkick extends AbstractCard {
  uid = "dropkick";
  name = "Dropkick";
  img = "";
  description = "";
  stamina = 6;
  intensity = 2;
  damage = 12;
  effects = []; //down 40%
  targets = [C.Targets.OPPONENT];
}

export default Dropkick;
