import { Events, States, Targets } from "./consts";
import { Engine, Kernel, State, Validator } from "./models";
import GlobalEventManager, { EventManager } from "./event-manager";
import * as check from "./checker";
import { clone } from "./utils";
import Accessor from "./accessor";
import Mutator from "./mutator";

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
    const accessor = new Accessor(mutable);
    const mutator = new Mutator(accessor);

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
    const accessor = new Accessor(mutable);
    const mutator = new Mutator(accessor);

    this.$e.publish(Events.PRE_CARD_DISTRIBUTION, mutable);
    mutator.distributeHands();
    mutator.nextDistributeHands();
    this.$e.publish(Events.POST_CARD_DISTRIBUTION, mutable);

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
    const accessor = new Accessor(mutable);
    const mutator = new Mutator(accessor);

    this.$e.publish(Events.PRE_CARD_VALIDATION, mutable);
    mutator.validateHands();
    mutator.nextValidateHands();
    this.$e.publish(Events.POST_CARD_VALIDATION, mutable);

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
    const accessor = new Accessor(mutable);
    const mutator = new Mutator(accessor);

    this.$e.publish(Events.PRE_CARD_PLAY, mutable);
    mutator.playCard();
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
  public chooseRandomCard(_state: State): State {
    check.checkState(_state);

    const mutable = clone(_state);
    this.$e.publish(Events.PRE_CARD_IA, mutable);
    //const active = utilsS.getActive(mutable);
    //mutable.card = utilsC.randomValidCard(active);
    mutable.state =
      mutable.card !== null ? States.CHOOSE_RANDOM_TARGET : States.NEW_TURN;
    this.$e.publish(Events.POST_CARD_IA, mutable);

    return mutable;
  }

  public chooseRandomTargets(_state: State): State {
    check.checkState(_state);
    //check.checkCard(utilsS.getActiveCard(_state));

    const mutable = clone(_state);
    this.$e.publish("", mutable);

    /*
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
    */

    this.$e.publish("", mutable);

    return mutable;
  }
}

export default CoreEngine;
