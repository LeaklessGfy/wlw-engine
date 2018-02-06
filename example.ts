import State from "./src/models/state";
import Card from "./src/models/card";
import Wrestler from "./src/models/wrestler";
import * as Targets from "./src/consts/targets";
import * as Actuators from "./src/consts/actuators";
import * as Players from "./src/consts/players";
import * as Genders from "./src/consts/genders";
import * as Categories from "./src/consts/categories";
import WLW from "./src";
import Kernel from "./src/kernel";
import AttackMiddleware from "./src/actuators/attack-actuator";

const card: Card = {
  id: 0,
  uid: "",
  actuators: [Actuators.BASE, Actuators.ATTACK],
  validators: [],
  name: "DDT",
  img: "",
  stamina: 3,
  intensity: 1,
  damages: 10,
  effects: [],
  targets: [Targets.OPONENT],
  reverseable: true
};

const w1: Wrestler = {
  id: 1,
  name: "Wrestler1",
  img: "",
  gender: Genders.MALE,
  category: Categories.HEAVYWEIGHT,
  health: {
    val: 100,
    max: 100
  },
  stamina: 10,
  intensity: 3,
  cards: [],
  hand: [card],
  dead: []
};

const w2: Wrestler = {
  id: 2,
  name: "Wrestler2",
  img: "",
  gender: Genders.MALE,
  category: Categories.HEAVYWEIGHT,
  health: {
    val: 100,
    max: 100
  },
  stamina: 10,
  intensity: 3,
  cards: [],
  hand: [],
  dead: []
};

const state: State = {
  turn: 0,
  players: {
    P1: w1,
    CPU: w2
  },
  active: Players.PLAYER1,
  targets: [Players.CPU],
  card: card
};

const kernel: Kernel = new Kernel([
  new AttackMiddleware()
]);
const app: WLW = new WLW(kernel);
const newState = app.cardPlay(state);

console.log(state.players.CPU.health);
console.log(newState.players.CPU.health);
