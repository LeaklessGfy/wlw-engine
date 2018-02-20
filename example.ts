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
  card: null,
  mode: {
    name: "",
    img: "",
    description: "",
    numbers: 2
  }
};

const kernel = new CoreKernel([{ uid: "ddt", fn: R.Cards.Ddt }]);
const engine = new CoreEngine(kernel);
engine.addDistributor(R.Distributors.BaseDistributor);
engine.addValidator(R.Validators.BaseValidator);

// Create and initialize new turn
let newState = engine.newTurn(defState);
// Distribute cards for active player
newState = engine.distributeCards(newState);
// Validate cards for active player
newState = engine.validateCards(newState);
// Choose a random valid card to play
newState = engine.chooseRandomCard(newState);

if (newState.card === null) {
  // It means there's no available card for active.
  // New turn required
  console.log(newState.active);
} else {
  // Choose random target(s) for the given card
  newState = engine.chooseRandomTargets(newState);
  // Play the card
  newState = engine.playCard(newState);
  console.log(JSON.stringify(newState.players.CPU, null, 1));
}
