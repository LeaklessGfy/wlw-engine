import { Events } from "./consts";
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
    this.$e.publish(Events.POST_TURN_NEW, mutable);

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
    check.checkCard(_state.players[_state.active].hand[_state.card]);

    const mutable = clone(_state);
    const proxy = new StateProxy(mutable);
    const mutator = new Mutator(proxy);

    this.$e.publish(Events.PRE_CARD_PLAY, mutable);
    mutator.playCard(this.$k);
    this.$e.publish(Events.POST_CARD_PLAY, mutable);

    return mutable;
  }
}

export default CoreEngine;
