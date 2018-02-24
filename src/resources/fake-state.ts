import * as _ from "lodash";
import State from "../models/state";
import TripleH from "./wrestlers/triple-h.wrestler";
import JohnCena from "./wrestlers/john-cena.wrestler";
import Normal from "./modes/normal.mode";
import { REQUEST_INIT } from "../consts/states";

class FakeState implements State {
  turn = 0;
  viewer = "P1";
  active = "P1";
  targets = ["CPU1"];
  next = ["CPU1"];
  players = {
    P1: _.toPlainObject(new TripleH()),
    CPU1: _.toPlainObject(new JohnCena())
  };
  card = null;
  mode = _.toPlainObject(new Normal());
  state = REQUEST_INIT;
}

function fakeState(): State {
  return _.toPlainObject(new FakeState());
}

export default fakeState;
