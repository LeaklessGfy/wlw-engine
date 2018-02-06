import State from "./src/models/state";
import Card from "./src/models/card";
import Wrestler from "./src/models/wrestler";
import * as Target from "./src/consts/targets";
import * as Middle from "./src/consts/middlewares";
import * as Player from "./src/consts/players";
import { GENDER_MALE } from "./src/consts/genders";
import { CATEGORY_HEAVYWEIGHT } from "./src/consts/categories";
import WLW from "./src";
import Kernel from "./src/kernel";

const card: Card = {
  id: 0,
  keys: [Middle.MIDDLEWARE_BASE, Middle.MIDDLEWARE_ATTACK],
  name: "DDT",
  img: "",
  stamina: 3,
  intensity: 1,
  damages: 10,
  effects: [],
  targets: [Target.TARGET_OPONENT],
  reverseable: true
};

const w1: Wrestler = {
  id: 1,
  name: "Wrestler1",
  img: "",
  gender: GENDER_MALE,
  category: CATEGORY_HEAVYWEIGHT,
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
  gender: GENDER_MALE,
  category: CATEGORY_HEAVYWEIGHT,
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
  active: Player.PLAYER1,
  targets: [Player.CPU],
  card: card
};

const kernel: Kernel = new Kernel([]);
const app: WLW = new WLW(kernel);
const newState = app.runCard(state);
