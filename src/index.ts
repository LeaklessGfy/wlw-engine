import * as _ from "lodash";
import * as postal from "postal";
import Kernel from "./kernel";
import WLWEventManager, { EventManager } from "./event-manager";
import { Actuator, Validator } from "./interfaces";
import { Card, State } from "./models";
import * as Events from "./consts/events";

class WLW {
  private readonly kernel: Kernel;
  private readonly eventManager: EventManager;

  constructor(kernel: Kernel = new Kernel()) {
    this.kernel = kernel;
    this.eventManager = WLWEventManager;
  }

  public turnNew(_state: State): State {
    return _state;
  }

  public cardValidation(_card: Card, _state: State): boolean {
    const card: Readonly<Card> = Object.freeze(_card);
    const state: Readonly<State> = Object.freeze(_state);

    return this._cardValidation(card, state);
  }

  public cardPlay(_state: State): State {
    const original: Readonly<State> = Object.freeze(_state); //immutableJS ?
    const mutable: State = _.cloneDeep(original);

    if (!this._cardValidation(original.card, original)) {
      return mutable;
    }

    return this._cardPlay(mutable, original);
  }

  private _cardValidation(card: Readonly<Card>, state: Readonly<State>): boolean {
    if (!card) {
      throw new Error("No card to validate");
    }

    this.eventManager.publish(Events.PRE_CARD_VALIDATION, { card, state });
    for (let key of card.validators) {
      const validators = this.kernel.getValidators(key);
      const invalid = validators.filter((validator: Validator) => !validator.isValid(card, state)).length;
      
      if (invalid) {
        this.eventManager.publish(Events.POST_CARD_VALIDATION, { card, state, status: false });
        return false;
      }
    }
    this.eventManager.publish(Events.POST_CARD_VALIDATION, { card, state, status: true });

    return true;
  }

  private _cardPlay(mutable: State, original: Readonly<State>): State {
    if (!original.card) {
      throw new Error("No card to play");
    }

    this.eventManager.publish(Events.PRE_CARD_PLAY, { mutable, original });
    for (let key of original.card.actuators) {
      const actuators = this.kernel.getActuators(key);
      actuators.forEach((actuator: Actuator) => actuator.operate(mutable, original));
    }
    this.eventManager.publish(Events.POST_CARD_PLAY, { mutable, original });

    return mutable;
  }
}

export default WLW;
