import State from "../models/state";
import TripleH from "./wrestlers/triple-h.wrestler";
import JohnCena from "./wrestlers/john-cena.wrestler";
import Ddt from "./cards/banals/ddt.card";

const getFakeState = (): Readonly<State> =>
  Object.freeze({
    viewer: "P1",
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
      uid: "",
      name: "",
      img: "",
      description: "",
      numbers: 2
    }
  });

export default getFakeState;
