import State from "../models/state";
import TripleH from "./wrestlers/triple-h.wrestler";
import JohnCena from "./wrestlers/john-cena.wrestler";
import Ddt from "./cards/banals/ddt.card";

const FakeState: Readonly<State> = Object.freeze({
  turn: 0,
  active: "P1",
  targets: ["CPU"],
  next: ["CPU"],
  players: {
    P1: TripleH,
    CPU: JohnCena
  },
  card: new Ddt(),
  mode: {
    name: "",
    img: "",
    description: "",
    numbers: 2
  }
});

export default FakeState;
