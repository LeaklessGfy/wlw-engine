import Action from "../action";
import StateProxy from "../../proxies/state.proxy";
import { CardStrategy, WrestlerStrategy } from "../../strategies";

class InitAction implements Action {
  constructor(
    private readonly $card: CardStrategy,
    private readonly $wrestler: WrestlerStrategy
  ) {}

  act(state: StateProxy): void {
    this.$wrestler.order(state);
    state.getWrestlers().forEach(w => this.$card.shuffleDeck(w));
  }
}

export default InitAction;
