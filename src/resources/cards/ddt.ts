import Card from "../../models/card";
import * as Actuators from "../../consts/actuators";
import * as Validators from "../../consts/validators";
import * as Targets from "../../consts/targets";

const DDT: Card = {
  id: 0,
  uid: "",
  actuators: [Actuators.BASE, Actuators.ATTACK],
  validators: [Validators.ATTACK],
  name: "DDT",
  img: "",
  stamina: 3,
  intensity: 1,
  damages: 10,
  effects: [],
  targets: [Targets.OPONENT],
  reverseable: true
};

export default DDT;
