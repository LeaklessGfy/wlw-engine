import State from "../models/state";
import TripleH from "./wrestlers/triple-h.wrestler";
import JohnCena from "./wrestlers/john-cena.wrestler";

class FakeState implements State {
  viewer = "P1";
  turn = 0;
  active = "P1";
  targets = ["CPU"];
  next = ["CPU"];
  players = {
    P1: new TripleH(),
    CPU: new JohnCena()
  };
  card = 0;
  mode = {
    uid: "",
    name: "",
    img: "",
    description: "",
    numbers: 2
  };
}

export default FakeState;
