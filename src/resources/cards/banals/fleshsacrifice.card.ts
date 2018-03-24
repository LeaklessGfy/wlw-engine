import { Card } from "../../../models";
import * as C from "../../../consts";

class FleshSacrifice implements Card {
  uid = "flesh_sacrifice";
  actuators = [];
  name = "Flesh Sacrifice";
  img = "";
  description = "Sacrifiate 15 PV for 4 INTENSITY";
  stamina = 2;
  intensity = 0;
  effects = [];
  targets = [C.Targets.SELF];
  rarity = C.Rarities.BANAL;
  reverseable = false;
  blockable = false;
  valid: boolean;
}

export default FleshSacrifice;
