import Card from "../../models/card";
import * as C from "../../consts";

const Pin: Card = {
  uid: C.UIDS.PIN,
  actuators: [C.Actuators.BASE, C.Actuators.PIN],
  validators: [C.Validators.BASE],
  name: "Pin",
  img: "",
  description: "Attempt to pin the opponent.",
  requirements: {
    opponent: [{status: C.Status.DOWN}]
  },
  stamina: 3,
  intensity: 0,
  targets: [C.Targets.OPPONENT],
  reverseable: true
};

export default Pin;
