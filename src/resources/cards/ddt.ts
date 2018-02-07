import Card from "../../models/Card";
import * as C from "../../consts";

const Ddt: Card = {
  uid: C.Uids.DDT,
  actuators: [C.Actuators.BASE, C.Actuators.ATTACK],
  validators: [C.Validators.BASE, C.Validators.ATTACK],
  name: "DDT",
  img: "",
  description: "",
  stamina: 3,
  intensity: 1,
  damage: 10,
  effects: [],
  targets: [C.Targets.OPPONENT],
  reverseable: true
};

export default Ddt;
