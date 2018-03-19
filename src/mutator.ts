import * as _ from "lodash";
import StateProxy from "./proxies/state.proxy";
import { CardStrategy, OperatorStrategy, StateStrategy } from "./strategies";
import { isInteractive } from "./utils";

class Mutator {
  constructor(
    private readonly $card: CardStrategy,
    private readonly $operator: OperatorStrategy,
    private readonly $cpu: StateStrategy
  ) {}

  newTurn(state: StateProxy): void {
    if (!state.hasNext()) {
      if (!state.hasBaseNext()) {
        state.buildNext();
        state.getWrestlers().forEach(w => this.$card.shuffleDeck(w));
      }
      state.setNext(state.getBaseNextKey().slice());
    }

    const turn = state.getTurn();
    const mode = state.getMode();
    const active = state.nextActive();
    active.recovery(turn);

    state.getWrestlers().forEach(w => {
      if (turn % mode.numbers === 0) {
        this.$card.distributeHand(w, state);
      }
      this.$card.validateHand(w, state);
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

    this.$card.consumeCard(card, active, state);
    this.$operator.operate(state);
    this.$card.discardCard(card, active, state);
    this.$card.validateHand(active, state);
    this.$operator.winner(state);

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
