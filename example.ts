import State from "./src/models/state";
import * as Players from "./src/consts/players";
import WLW from "./src";
import Kernel from "./src/kernel";
import TripleH from "./src/resources/wrestlers/triple-h";
import JohnCena from "./src/resources/wrestlers/john-cena";
import DDT from "./src/resources/cards/ddt";

const state: State = {
  turn: 0,
  players: {
    [Players.PLAYER1]: TripleH,
    [Players.CPU]: JohnCena
  },
  active: Players.PLAYER1,
  targets: [Players.CPU],
  card: DDT
};

const app = new WLW(new Kernel());
const newState = app.cardPlay(state);

console.log(state.players.CPU.health);
console.log(newState.players.CPU.health);
console.log(state === newState);
