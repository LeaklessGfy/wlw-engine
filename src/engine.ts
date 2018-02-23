import * as _ from "lodash";
import { Events, Targets } from "./consts";
import {
  Card,
  Distributor,
  Engine,
  Kernel,
  Mode,
  State,
  Validator,
  Wrestler
} from "./models";
import GlobalEventManager, { EventManager } from "./event-manager";
import * as check from "./checker";
import { utilsC, utilsG, utilsS, utilsW } from "./utils";

/**
 * The engine of the WLW game
 *
 * @class CoreEngine
 * @implements {Engine}
 */
class CoreEngine implements Engine {
  private readonly $e: EventManager;
  private readonly $k: Kernel;
  private readonly $validators: Validator[];

  /**
   * Creates an instance of CoreEngine.
   * @memberof CoreEngine
   */
  constructor(kernel: Kernel) {
    this.$e = GlobalEventManager;
    this.$k = kernel;
    this.$validators = [];
  }

  /*
  ** MUTATORS
  */

  /**
   * Create a new turn.
   *
   * @param {State} _state initial state
   *
   * @return {State} new state
   */
  public newTurn(_state: State): State {
    const mutable = utilsG.clone(_state);
    const original = utilsG.freeze(_state);

    this.$e.publish(Events.PRE_TURN_NEW, { mutable, original });

    utilsS.generateNext(mutable);
    utilsS.getWrestlers(mutable).forEach(w => utilsC.shuffleDeck(w));
    mutable.active = mutable.next.shift();
    utilsW.applyRecovery(utilsS.getActive(mutable), mutable.turn);
    utilsS.cleanState(mutable);
    mutable.turn++;

    this.$e.publish(Events.POST_TURN_NEW, { mutable, original });

    return mutable;
  }

  /**
   * Distribute an hand for each players.
   *
   * @param {State} _state initial state
   *
   * @return {State} new state
   */
  public distributeCards(_state: State): State {
    check.checkState(_state);
    const mutable = utilsG.clone(_state);
    const original = utilsG.freeze(_state);

    this.$e.publish(Events.PRE_CARD_DISTRIBUTION, { mutable, original });

    utilsS.getWrestlers(mutable).forEach(w => utilsC.distributeHand(w));
    mutable.status = 1;

    this.$e.publish(Events.POST_CARD_DISTRIBUTION, { mutable, original });

    return mutable;
  }

  /**
   * Validate hand cards for the active player.
   *
   * @param {State} _state initial state
   *
   * @return {State} new state
   */
  public validateCards(_state: State): State {
    check.checkState(_state);
    const mutable = utilsG.clone(_state);
    const original = utilsG.freeze(_state);

    this.$e.publish(Events.PRE_CARD_VALIDATION, { mutable, original });

    const active = utilsS.getActive(mutable);
    for (let card of active.hand) {
      for (let validator of this.$validators) {
        validator(card, mutable, this);
        if (!card.valid) break;
      }
    }

    this.$e.publish(Events.POST_CARD_VALIDATION, { mutable, original });

    return mutable;
  }

  /**
   * Play the active card.
   *
   * @param {State} _state initial state
   *
   * @return {State} new state
   */
  public playCard(_state: State): State {
    check.checkState(_state);
    const mutable = utilsG.clone(_state);
    const original = utilsG.freeze(_state);

    this.$e.publish(Events.PRE_CARD_PLAY, { mutable, original });

    const active = utilsS.getActive(mutable);
    const card = utilsS.getActiveCard(mutable);
    utilsC.consumeCard(active, card);
    utilsC.getActuators(card, this.$k).forEach(a => a.operate(mutable, this));
    utilsC.applyEffects();
    utilsC.discardCard(active, card);
    utilsS.cleanState(mutable);

    this.$e.publish(Events.POST_CARD_PLAY, { mutable, original });

    return mutable;
  }

  /**
   * Choose a random card for the active player.
   *
   * @param {State} _state initial state
   *
   * @return {State} new state
   */
  public chooseRandomCard(_state: State): State {
    check.checkState(_state);
    const mutable = utilsG.clone(_state);
    const original = utilsG.freeze(_state);

    this.$e.publish(Events.PRE_CARD_IA, { mutable, original });

    const active = utilsS.getActive(mutable);
    //mutable.card = utilsC.randomValidCard(active);

    this.$e.publish(Events.POST_CARD_IA, { mutable, original });

    return mutable;
  }

  public chooseRandomTargets(_state: State): State {
    check.checkState(_state);
    const mutable = utilsG.clone(_state);
    const original = utilsG.freeze(_state);

    this.$e.publish("", { mutable, original });

    const card = utilsS.getActiveCard(mutable);
    for (let target of card.targets) {
      switch (target) {
        case Targets.OPPONENT:
          const opponents = utilsS.getOpponents(mutable.active, mutable);
          const len = opponents.length ? opponents.length - 1 : 0;
          const random = utilsG.randomInt(0, len);
          mutable.targets.push(opponents[random]);
          break;
      }
    }

    this.$e.publish("", { mutable, original });

    return mutable;
  }

  /*
  ** HELPERS
  */

  /**
   * Return the kernel.
   *
   * @return {Kernel} kernel
   */
  public getKernel(): Kernel {
    return this.$k;
  }

  /**
   * Add a validator
   *
   * @param {Validator} validator
   */
  public addValidator(validator: Validator): void {
    this.$validators.push(validator);
  }
}

export default CoreEngine;
