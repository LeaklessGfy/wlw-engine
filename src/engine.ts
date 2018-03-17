import { Engine, State } from "./models";
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
  /**
   * Creates an instance of CoreEngine.
   * @memberof CoreEngine
   */
  constructor(private readonly $mutator: Mutator) {}

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
    this.$mutator.newTurn(proxy);

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
    this.$mutator.playCard(proxy);

    return mutable;
  }
}

export default CoreEngine;
