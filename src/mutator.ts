import * as _ from "lodash";
import StateProxy from "./proxies/state.proxy";
import { StateStrategy, WrestlerStrategy } from "./strategies";
import { isInteractive } from "./utils";

class Mutator {
  constructor(
    private readonly $distributor: WrestlerStrategy,
    private readonly $validator: WrestlerStrategy,
    private readonly $operator: StateStrategy,
    private readonly $cpu: StateStrategy,
    private readonly $winning: StateStrategy
  ) {}

  newTurn(state: StateProxy): void {
    if (!state.hasNext()) {
      if (!state.hasBaseNext()) {
        state.buildNext();
        state.getWrestlers().forEach(w => w.shuffleDeck());
      }
      state.setNext(state.getBaseNextKey().slice());
    }

    const turn = state.getTurn();
    const mode = state.getMode();
    const active = state.nextActive();
    active.recovery(turn);

    state.getWrestlers().forEach(w => {
      if (turn % mode.numbers === 0) {
        this.$distributor.apply(w, state);
      }
      this.$validator.apply(w, state);
    });

    state.nextTurn();
    if (!isInteractive(state.getActiveKey())) {
      this.$cpu.apply(state);
    } else {
      state.clean();
    }
  }

  playCard(state: StateProxy): void {
    const active = state.getActive();
    const card = state.getCard();

    active.consumeCard(card);
    this.$operator.apply(state);
    active.discardCard(card);
    this.$validator.apply(active, state);
    this.$winning.apply(state);

    if (state.hasWinner()) {
      state.clean();
      return;
    }

    if (!isInteractive(state.getActiveKey())) {
      this.$cpu.apply(state);
    } else {
      state.clean();
    }
  }
}

export default Mutator;
