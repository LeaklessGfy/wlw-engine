import { Events, States, Targets } from "./consts";
import { Engine, Kernel, State, Validator } from "./models";
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
    const mutable = utilsG.clone(_state);

    this.$e.publish(Events.PRE_TURN_NEW, mutable);

    utilsS.generateNext(mutable);
    utilsS.getWrestlers(mutable).forEach(w => utilsC.shuffleDeck(w));
    mutable.active = mutable.next.shift();
    utilsW.applyRecovery(utilsS.getActive(mutable), mutable.turn);
    utilsS.cleanState(mutable);
    mutable.turn++;
    mutable.state = States.REQUEST_DISTRIBUTE;

    this.$e.publish(Events.POST_TURN_NEW, mutable);

    return mutable;
  }

  /**
   * Distribute an hand for each players.
   *
   * @param {State} _state initial state
   *
   * @return {State} new state
   */
  public distributeHand(_state: State): State {
    check.checkState(_state);

    if (_state.state !== States.REQUEST_DISTRIBUTE) {
      return _state;
    }

    const mutable = utilsG.clone(_state);
    this.$e.publish(Events.PRE_CARD_DISTRIBUTION, mutable);
    utilsS.getWrestlers(mutable).forEach(w => utilsC.distributeHand(w));
    mutable.state = States.REQUEST_VALIDATION;
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
  public validateHand(_state: State): State {
    check.checkState(_state);

    if (_state.state !== States.REQUEST_VALIDATION) {
      return _state;
    }

    const mutable = utilsG.clone(_state);
    this.$e.publish(Events.PRE_CARD_VALIDATION, mutable);
    utilsS.getWrestlers(mutable).forEach(w => utilsC.validateHand(w));
    mutable.state = States.REQUEST_CHOOSE_RANDOM_CARD;
    if (utilsW.isInteractive(mutable.active)) {
      mutable.state = States.REQUEST_PLAYER_ACTION;
    }
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
    check.checkCard(utilsS.getActiveCard(_state));

    if (_state.state !== States.REQUEST_PLAY) {
      return _state;
    }

    const mutable = utilsG.clone(_state);
    this.$e.publish(Events.PRE_CARD_PLAY, mutable);

    const active = utilsS.getActive(mutable);
    const card = utilsS.getActiveCard(mutable);
    utilsC.consumeCard(active, card);
    utilsC.getActuators(card, this.$k).forEach(a => a.operate(mutable, this));
    utilsC.applyEffects();
    utilsC.discardCard(active, card);
    utilsS.cleanState(mutable);

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

    if (_state.state !== States.REQUEST_CHOOSE_RANDOM_CARD) {
      return _state;
    }

    const mutable = utilsG.clone(_state);
    this.$e.publish(Events.PRE_CARD_IA, mutable);
    const active = utilsS.getActive(mutable);
    //mutable.card = utilsC.randomValidCard(active);
    mutable.state =
      mutable.card !== null
        ? States.REQUEST_CHOOSE_RANDOM_TARGET
        : States.REQUEST_NEW_TURN;
    this.$e.publish(Events.POST_CARD_IA, mutable);

    return mutable;
  }

  public chooseRandomTargets(_state: State): State {
    check.checkState(_state);
    check.checkCard(utilsS.getActiveCard(_state));

    if (_state.state !== States.REQUEST_CHOOSE_RANDOM_TARGET) {
      return _state;
    }

    const mutable = utilsG.clone(_state);
    this.$e.publish("", mutable);

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

    this.$e.publish("", mutable);

    return mutable;
  }
}

export default CoreEngine;
