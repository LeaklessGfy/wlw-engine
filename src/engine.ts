import { Events, States, Targets } from "./consts";
import { Engine, Kernel, State } from "./models";
import GlobalEventManager, { EventManager } from "./event-manager";
import * as check from "./checker";
import { clone } from "./utils";
import Mutator from "./mutator";
import StateProxy from "./proxies/state.proxy";

/**
 * The engine of the WLW game
 *
 * @class CoreEngine
 * @implements {Engine}
 */
class CoreEngine implements Engine {
  private readonly $e: EventManager;
  private readonly $k: Kernel;

  /**
   * Creates an instance of CoreEngine.
   * @memberof CoreEngine
   */
  constructor(kernel: Kernel) {
    this.$e = GlobalEventManager;
    this.$k = kernel;
  }

  /**
   * Create a new turn.
   *
   * @param {State} _state initial state
   *
   * @return {State} new state
   */
  public newTurn(_state: State): State {
    check.checkState(_state);

    const mutable = clone(_state);
    const proxy = new StateProxy(mutable);
    const mutator = new Mutator(proxy);

    this.$e.publish(Events.PRE_TURN_NEW, mutable);
    mutator.newTurn();
    mutator.nextNewTurn();
    this.$e.publish(Events.POST_TURN_NEW, mutable);

    return mutable;
  }

  /**
   * Distribute hand for each players.
   *
   * @param {State} _state initial state
   *
   * @return {State} new state
   */
  public distributeHands(_state: State): State {
    check.checkState(_state);

    const mutable = clone(_state);
    const proxy = new StateProxy(mutable);
    const mutator = new Mutator(proxy);

    this.$e.publish(Events.PRE_HANDS_DISTRIBUTION, mutable);
    mutator.distributeHands();
    mutator.nextDistributeHands();
    this.$e.publish(Events.POST_HANDS_DISTRIBUTION, mutable);

    return mutable;
  }

  /**
   * Validate hand for each player.
   *
   * @param {State} _state initial state
   *
   * @return {State} new state
   */
  public validateHands(_state: State): State {
    check.checkState(_state);

    const mutable = clone(_state);
    const proxy = new StateProxy(mutable);
    const mutator = new Mutator(proxy);

    this.$e.publish(Events.PRE_HANDS_VALIDATION, mutable);
    mutator.validateHands();
    mutator.nextValidateHands();
    this.$e.publish(Events.POST_HANDS_VALIDATION, mutable);

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
    //check.checkCard(utilsS.getActiveCard(_state));

    const mutable = clone(_state);
    const proxy = new StateProxy(mutable);
    const mutator = new Mutator(proxy);

    this.$e.publish(Events.PRE_CARD_PLAY, mutable);
    mutator.playCard(this.$k);
    mutator.nextPlayCard();
    this.$e.publish(Events.POST_CARD_PLAY, mutable);

    return mutable;
  }

  /**
   * Choose a random valid card for the active player.
   *
   * @param {State} _state initial state
   *
   * @return {State} new state
   */
  public randomCard(_state: State): State {
    check.checkState(_state);

    const mutable = clone(_state);
    const proxy = new StateProxy(mutable);
    const mutator = new Mutator(proxy);

    this.$e.publish(Events.PRE_CARD_RANDOM, mutable);
    mutator.randomCard();
    mutator.nextRandomCard();
    this.$e.publish(Events.POST_CARD_RANDOM, mutable);

    return mutable;
  }

  public randomTargets(_state: State): State {
    check.checkState(_state);
    //check.checkCard(utilsS.getActiveCard(_state));

    const mutable = clone(_state);
    const proxy = new StateProxy(mutable);
    const mutator = new Mutator(proxy);

    this.$e.publish(Events.PRE_TARGETS_RANDOM, mutable);
    mutator.randomTargets();
    mutator.nextRandomTargets();
    this.$e.publish(Events.POST_TARGETS_RANDOM, mutable);

    return mutable;
  }
}

export default CoreEngine;
