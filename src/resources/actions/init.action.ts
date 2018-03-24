import { injectable, inject } from "inversify";
import "reflect-metadata";
import Action from "models/action";
import StateProxy from "proxies/state.proxy";
import { CardStrategy, WrestlerStrategy } from "strategies";
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
