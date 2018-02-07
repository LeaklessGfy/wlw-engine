import Card from "../../models/card";
import { PIN } from "../../consts/uids";
import * as Actuators from "../../consts/actuators";
import * as Validators from "../../consts/validators";
import * as Targets from "../../consts/targets";

const Pin: Card = {
  uid: PIN,
  actuators: [Actuators.BASE],
  validators: [Validators.ATTACK],
  name: "Pin",
  img: "",
  description: "Attempt to pin the opponent.",
  stamina: 3,
  intensity: 0,
  targets: [Targets.OPPONENT],
  reverseable: true
};

export default Pin;
