import { injectable, inject } from "inversify";
import "reflect-metadata";
import { Action, CardStrategy, WrestlerStrategy } from "models";
import StateProxy from "proxies/state.proxy";
import TYPES from "types";

@injectable()
class InitAction implements Action {
  constructor(
    @inject(TYPES.CardStrategy) private readonly $card: CardStrategy,
    @inject(TYPES.WrestlerStrategy) private readonly $wrestler: WrestlerStrategy
  ) {}

  act(state: StateProxy): void {
    this.$wrestler.order(state);
    state.getWrestlers().forEach(w => this.$card.shuffleDeck(w));
  }
}

export default InitAction;
