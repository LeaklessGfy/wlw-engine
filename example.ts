import State from "./src/models/state";
import CoreKernel from "./src/kernel";
import CoreEngine from "./src/engine";
import * as Players from "./src/consts/players";
import * as R from "./src/resources";

const defState: State = {
  turn: 0,
  active: "",
  targets: [],
  next: [],
  players: {
    [Players.PLAYER1]: R.Wrestlers.TripleH,
    [Players.CPU]: R.Wrestlers.JohnCena
  },
  card: null
};

const kernel = new CoreKernel();
const engine = new CoreEngine(kernel);
engine.addDistributor(R.Distributors.BaseDistributor);

const newState = engine.newTurn(defState);

console.log("def : ", defState);
console.log("new : ", newState);
