import State from "./src/models/state";
import * as Players from "./src/consts/players";
import WLW from "./src";
import * as R from "./src/resources";

const state: State = {
  turn: 0,
  active: Players.PLAYER1,
  targets: [Players.CPU],
  players: {
    [Players.PLAYER1]: R.Wrestlers.TripleH,
    [Players.CPU]: R.Wrestlers.JohnCena
  },
  card: R.Cards.DDT
};

const app = new WLW();
const newState = app.cardPlay(state);

console.log("base health : ", state.players.CPU.health.val);
console.log("new health : ", newState.players.CPU.health.val);

newState.card = R.Cards.Pin;
const pinState = app.cardPlay(newState);

console.log("base stamina : ", state.players.P1.stamina);
console.log("new stamina : ", pinState.players.P1.stamina);
