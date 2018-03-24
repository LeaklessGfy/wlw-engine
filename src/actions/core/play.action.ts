import Action from "../action";
import StateProxy from "../../proxies/state.proxy";
import { CardStrategy, WrestlerStrategy } from "../../strategies";
import { Records, Reports } from "../../consts";
import { isInteractive } from "../../utils";

class PlayAction implements Action {
  private readonly kernel;

  constructor(
    private readonly $card: CardStrategy,
    private readonly $wrestler: WrestlerStrategy
  ) {
    this.kernel = {};
    for (let actuator of []) {
      this.kernel[actuator.key] = actuator;
    }
  }

  act(state: StateProxy): void {
    const active = state.getActive();
    const card = state.getCard();
    const targets = state.getTargets();
    const records = [];

    this.$card.consumeCard(card, active, state);

    targets.forEach(t => {
      if (!t.hasDodge(card, active)) {
        records.push({ key: Records.CARD_STATUS, val: Reports.TOUCH });
      } else if (t.hasReverse(card)) {
        records.push({ key: Records.CARD_STATUS, val: Reports.REVERSE });
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
      .map(k => this.kernel[k])
      .filter(a => a);
  }
}

export default PlayAction;
