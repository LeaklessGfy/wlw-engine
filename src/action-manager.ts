import Kernel from "./kernel";
import { Actuators, Events, Validators } from "./consts";
import { State, Card, Wrestler } from "./models";
import { ActionManager, Actuator, Validator } from "./interfaces";
import GlobalEventManager, { EventManager } from "./event-manager";
import { getWrestlers, randomInt } from "./utils";

class DefaultActionManager implements ActionManager {
  private readonly $k: Kernel;
  private readonly $e: EventManager;

  constructor(kernel: Kernel = new Kernel()) {
    this.$k = kernel;
    this.$e = GlobalEventManager;
  }

  public makeNewTurn(mutable: State, original: Readonly<State>): State {
    this.$e.publish(Events.PRE_TURN_NEW, { mutable, original });
    this.$e.publish(Events.POST_TURN_NEW, { mutable, original });

    return mutable;
  }

  public makeCardValidation(card: Card, state: Readonly<State>): boolean {
    this.$e.publish(Events.PRE_CARD_VALIDATION, { card, state });
    for (let key of card.validators) {
      this.$k.getValidator(key).validate(card, state);
      if (card.valid === false) break;
    }
    this.$e.publish(Events.POST_CARD_VALIDATION, { card, state });

    return card.valid;
  }

  public makeCardPlay(mutable: State, original: Readonly<State>): State {
    this.$e.publish(Events.PRE_CARD_PLAY, { mutable, original });
    for (let key of original.card.actuators) {
      this.$k.getActuator(key).operate(mutable, original);
      this.$e.publish(Events.CARD_PLAY, { mutable, original });     
    }
    this.$e.publish(Events.POST_CARD_PLAY, { mutable, original });

    return mutable;
  }

  public makeCardDistribution(mutable: State, original: Readonly<State>): State {
    this.$e.publish(Events.PRE_CARD_DISTRIBUTION, { mutable, original });
    for (let wrestler of getWrestlers(mutable.players)) {
      for (let key of wrestler.distributors) {
        this.$k.getDistributor(key).distribute(wrestler, original);
        this.$e.publish(Events.CARD_DISTRIBUTION, { mutable, original });        
      }
      for (let card of wrestler.hand) {
        this.makeCardValidation(card, Object.freeze(mutable));
      }
    }
    this.$e.publish(Events.POST_CARD_DISTRIBUTION, { mutable, original });

    return mutable;
  }

  public makeCardIA(mutable: State, original: Readonly<State>): State {
    this.$e.publish(Events.PRE_CARD_IA, { mutable, original });
    
    const active: Wrestler = mutable.players[mutable.active];
    const validCard = active.hand.filter(card => card.valid);
    if (validCard.length === 0) {
      return this.makeNewTurn(mutable, original);
    }
    const index = randomInt(0, validCard.length - 1);
    mutable.card = validCard[index];

    this.$e.publish(Events.POST_CARD_IA, { mutable, original });

    return mutable;
  }
}

export default DefaultActionManager;
