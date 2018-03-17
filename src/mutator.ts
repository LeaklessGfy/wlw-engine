import * as _ from "lodash";
import { State, Record, Wrestler } from "./models";
import StateProxy from "./proxies/state.proxy";
import * as Strategy from "./strategies";
import { isInteractive } from "./utils";

class Mutator {
  private readonly $effector;

  constructor(
    private readonly $distributor: Strategy.DistributorStrategy,
    private readonly $validator: Strategy.ValidatorStrategy,
    private readonly $operator: Strategy.OperatorStrategy,
    private readonly $cpu: Strategy.CPUStrategy,
    private readonly $winning: Strategy.WinningStrategy
  ) {}

  newTurn(state: StateProxy): void {
    if (!state.hasNext()) {
      state.buildNext();
      state.getWrestlers().forEach(w => w.shuffleDeck());
    }

    const turn = state.getTurn();
    const mode = state.getMode();
    const active = state.nextActive();
    active.recovery(turn);

    if (turn % mode.numbers === 0) {
      state.getWrestlers().forEach(w => {
        this.$distributor.distribute(w, state);
        this.$validator.validate(w, state);
      });
    }

    state.nextTurn();
    if (!isInteractive(state.getActiveKey())) {
      this.$cpu.randomPlay(state);
    } else {
      state.clean();
    }
  }

  playCard(state: StateProxy): void {
    const active = state.getActive();
    const card = state.getCard();

    active.consumeCard(card);
    this.$operator.operate(state);
    //this.$effector.applyEffect(state);
    active.discardCard(card);
    this.$validator.validate(active, state);
    this.$winning.checkWinner(state);

    if (!isInteractive(state.getActiveKey())) {
      this.$cpu.randomPlay(state);
    } else {
      state.clean();
    }
  }
}

export default Mutator;
