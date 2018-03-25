import { injectable, inject } from "inversify";
import "reflect-metadata";
import {
  Action,
  Actuator,
  CardStrategy,
  EffectStrategy,
  WrestlerStrategy
} from "models";
import { CardProxy, StateProxy } from "proxies";
import { Records, Reports } from "consts";
import { isInteractive } from "utils";
import TYPES from "types";

@injectable()
class PlayAction implements Action {
  private readonly $card: CardStrategy;
  private readonly $effect: EffectStrategy;
  private readonly $wrestler: WrestlerStrategy;
  private readonly $factory: (name: string) => Actuator;

  constructor(
    @inject(TYPES.CardStrategy) card: CardStrategy,
    @inject(TYPES.EffectStrategy) effect: EffectStrategy,
    @inject(TYPES.WrestlerStrategy) wrestler: WrestlerStrategy,
    @inject("Factory<Actuator>") factory: (name: string) => Actuator
  ) {
    this.$card = card;
    this.$effect = effect;
    this.$wrestler = wrestler;
    this.$factory = factory;
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
        card.getEffects().forEach(e => this.$effect.apply(e, active, t));
      } else if (t.hasReverse(card)) {
        records.push({ key: Records.CARD_STATUS, val: Reports.REVERSE });
        actuators.forEach(a => a.operate(card, active, t, state));
        card.getEffects().forEach(e => this.$effect.apply(e, t, active));
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
      .map(a => this.$factory(a))
      .filter(a => a);
  }
}

export default PlayAction;
