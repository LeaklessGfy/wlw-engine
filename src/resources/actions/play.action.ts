import { injectable, inject } from "inversify";
import "reflect-metadata";
import { Action, Actuator } from "../../models";
import { CardProxy, StateProxy } from "../../proxies";
import { CardStrategy, WrestlerStrategy } from "../../strategies";
import { Records, Reports } from "../../consts";
import { isInteractive } from "../../utils";
import TYPES from "../../types";

@injectable()
class PlayAction implements Action {
  private readonly factory;

  constructor(
    @inject(TYPES.CardStrategy) private readonly $card: CardStrategy,
    @inject(TYPES.WrestlerStrategy)
    private readonly $wrestler: WrestlerStrategy,
    @inject("Factory<Actuator>") factory: (name: String) => Actuator
  ) {
    this.factory = factory;
  }

  act(state: StateProxy): void {
    const active = state.getActive();
    const card = state.getCard();
    const targets = state.getTargets();
    const actuators = this.actuators(card);
    const records = [];

    this.$card.consumeCard(card, active, state);

    targets.forEach(t => {
      if (!t.hasDodge(card, active)) {
        records.push({ key: Records.CARD_STATUS, val: Reports.TOUCH });
        actuators.forEach(a => a.operate(card, t, active, state));
      } else if (t.hasReverse(card)) {
        records.push({ key: Records.CARD_STATUS, val: Reports.REVERSE });
        actuators.forEach(a => a.operate(card, active, t, state));
      } else {
        records.push({ key: Records.CARD_STATUS, val: Reports.DODGE });
      }
    });
    state.setRecords(records);

    this.$card.discardCard(card, active, state);
    this.$card.validateHand(active, state);
    this.$wrestler.winner(state);

    if (state.hasWinner() || isInteractive(state.getActiveKey())) {
      state.clean();
      return;
    }

    this.$wrestler.action(state);
  }

  private actuators(card: CardProxy): Actuator[] {
    return card
      .getActuators()
      .map(a => this.factory(a))
      .filter(a => a);
  }
}

export default PlayAction;
