import { injectable, inject } from "inversify";
import Action from "../../models/action";
import StateProxy from "../../proxies/state.proxy";
import { CardStrategy, WrestlerStrategy } from "../../strategies";
import { isInteractive } from "../../utils";
import TYPES from "../../types";

@injectable()
class TurnAction implements Action {
  constructor(
    @inject(TYPES.CardStrategy) private readonly $card: CardStrategy,
    @inject(TYPES.WrestlerStrategy) private readonly $wrestler: WrestlerStrategy
  ) {}

  act(state: StateProxy): void {
    if (!state.hasNext()) {
      state.setNext(state.getBaseNextKey().slice());
    }

    const turn = state.getTurn();
    const mode = state.getMode();
    const active = state.nextActive();
    this.$wrestler.recovery(active, state);

    state.getWrestlers().forEach(w => {
      if (turn % mode.numbers === 0) {
        this.$card.distributeHand(w, state);
      }
      this.$card.validateHand(w, state);
    });

    state.nextTurn();
    if (!isInteractive(state.getActiveKey())) {
      this.$wrestler.action(state);
    } else {
      state.clean();
    }
  }
}

export default TurnAction;
