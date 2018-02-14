import "mocha";
import * as _ from "lodash";
import { expect } from "chai";
import Engine from "./engine";
import Kernel from "./kernel";
import Helper from "./helper";
import TripleH from "./resources/wrestlers/triple-h.wrestler";
import JohnCena from "./resources/wrestlers/john-cena.wrestler";
import Ddt from "./resources/cards/banals/ddt.card";

const H = _.cloneDeep(TripleH);
H.hand = [new Ddt()];
H.hand[0].valid = true;

const fakeState = Object.freeze({
  turn: 0,
  active: "CPU",
  targets: ["CPU"],
  next: ["P1"],
  players: {
    P1: H,
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

describe("Helper", () => {
  const kernel = new Kernel();
  const engine = new Engine(kernel);
  const helper = new Helper(engine);

  it("should be able to make correctly", () => {
    let counter = 0;
    const keys = [
      "new::turn",
      "distribute::cards",
      "validate::cards",
      "interaction",
      "choose::random::card",
      "choose::random::targets",
      "play::card"
    ];
    const newState = helper.make(fakeState, (key, state) => {
      expect(key).to.equal(keys[counter]);
      counter++;
      return true;
    });
    expect(counter).to.equal(7);
  });

  it("should be able to respect the flow", () => {
    let counter = 0;
    helper.make(fakeState, (key, state) => {
      counter++;
      return false;
    });
    expect(counter).to.equal(1);
  });
});
