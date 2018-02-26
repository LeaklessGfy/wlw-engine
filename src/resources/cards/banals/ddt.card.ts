import { Card } from "../../../models";
import * as C from "../../../consts";

class Ddt implements Card {
  uid = "ddt";
  actuators = ["damage"];
  name = "DDT";
  img = "https://pm1.narvii.com/5851/697f239d9cd6ec27e14c40b2b8b2ccd01bb9c6b6_hq.jpg";
  description = "";
  stamina = 3;
  intensity = 0;
  damage = 10;
  effects = [
    {
      uid: "",
      name: "blood",
      description: "",
      duration: 0,
      luck: 10,
      target: C.Targets.OPPONENT,
      icon: ""
    }
  ];
  targets = [C.Targets.OPPONENT];
  rarity = C.Rarities.BANAL;
  reverseable = true;
}

export default Ddt;
