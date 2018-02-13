import State from "./src/models/state";
import * as Players from "./src/consts/players";
import WLW from "./src";
import * as R from "./src/resources";

const defState: State = {
  turn: 0,
  active: Players.PLAYER1,
  targets: [Players.CPU],
  next: [Players.CPU],
  players: {
    [Players.PLAYER1]: R.Wrestlers.TripleH,
    [Players.CPU]: R.Wrestlers.JohnCena
  },
  card: null
};

const app = new WLW();
const distState = app.cardDistribution(defState);

console.log("def: ", defState.players.P1.hand);
console.log("dist: ", distState.players.P1.hand);

const iaState = app.cardIA(distState);

console.log("dist: ", distState.card);
console.log("ia: ", iaState.card);

const playState = app.cardPlay(iaState);

console.log("base health: ", defState.players.CPU.health.val);
console.log("new health: ", playState.players.CPU.health.val);

playState.card = R.Cards.Pin;
const pinState = app.cardPlay(playState);

console.log("base stamina : ", defState.players.P1.stamina);
console.log("new stamina : ", pinState.players.P1.stamina);
