import * as _ from "lodash";
import { injectable, inject, named } from "inversify";
import "reflect-metadata";
import { Action, Engine, State } from "./models";
import StateProxy from "./proxies/state.proxy";
import * as check from "./checker";
import TYPES from "./types";

/**
 * The engine of the WLW game
 *
 * @class CoreEngine
 * @implements {Engine}
 */
@injectable()
class CoreEngine implements Engine {
  /**
   * Creates an instance of CoreEngine.
   * @memberof CoreEngine
   */
  constructor(
    @inject(TYPES.Action)
    @named("init")
    private readonly $init: Action,
    @inject(TYPES.Action)
    @named("turn")
    private readonly $turn: Action,
    @inject(TYPES.Action)
    @named("play")
    private readonly $play: Action
  ) {}

  /**
   * Init the game.
   *
   * @param {State} _state initial state
   *
   * @return {State} new state
   */
  public init(_state: State): State {
    check.checkState(_state);

    const mutable = _.cloneDeep(_state);
    const proxy = new StateProxy(mutable);
    this.$init.act(proxy);

    return mutable;
  }

  /**
   * Create a new turn.
   *
   * @param {State} _state initial state
   *
   * @return {State} new state
   */
  public turn(_state: State): State {
    check.checkState(_state);

    const mutable = _.cloneDeep(_state);
    const proxy = new StateProxy(mutable);
    this.$turn.act(proxy);

    return mutable;
  }

  /**
   * Play the active card.
   *
   * @param {State} _state initial state
   *
   * @return {State} new state
   */
  public play(_state: State): State {
    check.checkState(_state);
    check.checkCard(_state.players[_state.active].hand[_state.card]);

    const mutable = _.cloneDeep(_state);
    const proxy = new StateProxy(mutable);
    this.$play.act(proxy);

    return mutable;
  }
}

export default CoreEngine;
