import * as _ from "lodash";
import * as Chance from "chance";
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

/**
 * The engine of the WLW game
 *
 * @class CoreEngine
 * @implements {Engine}
 */
class CoreEngine implements Engine {
  private readonly $e: EventManager;
  private readonly $k: Kernel;
  private readonly $random: any;
  private readonly $validators: Validator[];
  private readonly $distributors: Distributor[];

  /**
   * Creates an instance of CoreEngine.
   * @memberof CoreEngine
   */
  constructor(kernel: Kernel) {
    this.$e = GlobalEventManager;
    this.$k = kernel;
    this.$random = new Chance(Math.random);
    this.$validators = [];
    this.$distributors = [];
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
    const mutable = this.clone(_state);
    const original = this.freeze(_state);

    this.$e.publish(Events.PRE_TURN_NEW, { mutable, original });

    if (mutable.next.length < 1) {
      this.getNext(mutable);
    }
    mutable.active = mutable.next.shift();
    this.clean(mutable);
    this.recovery(this.getActive(mutable), mutable.turn);
    mutable.turn++;

    this.$e.publish(Events.POST_TURN_NEW, { mutable, original });

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
    this.checkState(_state);
    const mutable = this.clone(_state);
    const original = this.freeze(_state);

    this.$e.publish(Events.PRE_CARD_PLAY, { mutable, original });
    this.consume(this.getActive(mutable), mutable.card);
    mutable.card.operate(mutable, this);
    this.$e.publish(Events.POST_CARD_PLAY, { mutable, original });

    return mutable;
  }

  /**
   * Distribute an hand for the active player.
   *
   * @param {State} _state initial state
   *
   * @return {State} new state
   */
  public distributeCards(_state: State): State {
    this.checkState(_state);
    const mutable = this.clone(_state);
    const original = this.freeze(_state);

    this.$e.publish(Events.PRE_CARD_DISTRIBUTION, { mutable, original });
    const active = this.getActive(mutable);
    for (let distributor of this.$distributors) {
      distributor(active, mutable, this);
    }
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
    this.checkState(_state);
    const mutable = this.clone(_state);
    const original = this.freeze(_state);

    this.$e.publish(Events.PRE_CARD_VALIDATION, { mutable, original });
    const active = this.getActive(mutable);
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
   * Choose a random card for the active player.
   *
   * @param {State} _state initial state
   *
   * @return {State} new state
   */
  public chooseRandomCard(_state: State): State {
    this.checkState(_state);
    const mutable = this.clone(_state);
    const original = this.freeze(_state);

    this.$e.publish(Events.PRE_CARD_IA, { mutable, original });

    const active = this.getActive(mutable);
    const validCard = active.hand.filter(card => card && card.valid);
    if (validCard.length > 0) {
      const index = this.randomInt(0, validCard.length - 1);
      mutable.card = validCard[index];
    }

    this.$e.publish(Events.POST_CARD_IA, { mutable, original });

    return mutable;
  }

  public chooseRandomTargets(_state: State): State {
    this.checkState(_state);
    const mutable = this.clone(_state);
    const original = this.freeze(_state);

    this.$e.publish("", { mutable, original });

    for (let target of mutable.card.targets) {
      switch (target) {
        case Targets.OPPONENT:
          const opponents = this.getOpponents(mutable.active, mutable);
          const len = opponents.length ? opponents.length - 1 : 0;
          const random = this.randomInt(0, len);
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
   * Return an initial valid state.
   *
   * @return {State} initial valid state
   */
  public getInitialState(): State {
    return {
      viewer: "",
      turn: 0,
      active: "",
      targets: [],
      next: [],
      players: {},
      card: null,
      mode: null
    };
  }

  public getOriginalState(): Readonly<State> {
    return null;
  }

  /**
   * Return the wrestler object for the active player.
   *
   * @param {State} state state
   *
   * @return {Wrestler} the active wrestler
   */
  public getActive(state: State): Wrestler {
    return state.players[state.active];
  }

  /**
   * Return the wrestler object for the first target.
   *
   * @param {State} state state
   *
   * @return {Wrestler} the first target wrestler
   */
  public getFirstTarget(state: State): Wrestler {
    return state.players[state.targets[0]];
  }

  /**
   * Return an array of wrestler object for the targets.
   *
   * @param {State} state state
   *
   * @return {Wrestler[]} array of targets wrestler
   */
  public getTargets(state: State): Wrestler[] {
    return state.targets.map(target => state.players[target]);
  }

  /**
   * Return an array of wrestler object for all players.
   *
   * @param {State} state state
   *
   * @return {Wrestler[]} array of players wrestler
   */
  public getWrestlers = (state: State): Wrestler[] => {
    return _.values(state.players);
  };

  /**
   * Return an array of wrestler object for all opponents.
   *
   * @param {string} key the wrestler key to get opponents
   * @param {State} state state
   *
   * @return {string[]} array of opponents key
   */
  public getOpponents = (key: string, state: State): string[] => {
    if (!state.mode.team) {
      return _.keys(state.players).filter(k => key !== k);
    }

    return [];
  };

  /**
   * Return an array of wrestler object for all parteners.
   *
   * @param {Wrestler} wrestler the wrestler to get parteners
   * @param {State} state state
   *
   * @return {Wrestler[]} array of parteners wrestler
   */
  public getParteners = (wrestler: Wrestler, state: State): Wrestler[] => {
    if (!state.mode.team) {
      return [];
    }

    return [];
  };

  /**
   * Return a random boolean. Can be influenced by percent parameter.
   *
   * @param {number} percent a number that represent the percent of success
   *
   * @return {boolean} random boolean
   */
  public randomBool = (percent: number = 50): boolean => {
    return this.$random.bool({ likelihood: percent });
  };

  /**
   * Return a random integer. Can be influenced by min and max parameter (inclusive).
   *
   * @param {number} min minimum that random int can be
   * @param {number} max maximum that random int can be
   *
   * @return {number} random integer
   */
  public randomInt = (min: number = 0, max: number = 1): number => {
    return this.$random.integer({ min, max });
  };

  /**
   * Add a validator
   *
   * @param {Validator} validator
   */
  public addValidator(validator: Validator): void {
    this.$validators.push(validator);
  }

  /**
   * Add a distributor
   *
   * @param {Distributor} distributor
   */
  public addDistributor(distributor: Distributor): void {
    this.$distributors.push(distributor);
  }

  /**
   * Clone the object pass in parameter
   *
   * @param {T} o
   *
   * @return {T}
   */
  public clone<T>(o: T): T {
    return _.cloneDeep(o);
  }

  /**
   * Return a freeze copy of the object pass in parameter
   *
   * @param {T} o
   *
   * @return {T}
   */
  public freeze<T>(o: T): Readonly<T> {
    return Object.freeze(o);
  }

  /*
  ** PRIVATES
  */

  private getNext(mutable: State): void {
    const keys = _.keys(mutable.players);
    const tmp = keys.map(key => {
      const w = mutable.players[key];
      const speed = this.randomInt(0, w.combat.speed);

      return { key, speed };
    });

    tmp.sort((a, b) => {
      if (a.speed > b.speed) {
        return -1;
      }
      return 1;
    });

    mutable.next = tmp.map(t => t.key);
  }

  private clean(mutable: State): void {
    mutable.targets = [];
    mutable.card = null;
  }

  private recovery(w: Wrestler, turn: number): void {
    w.stamina.val = Math.min(
      w.stamina.max,
      w.stamina.val + this.randomInt(turn, turn + w.combat.recovery)
    );
    w.intensity.val = Math.min(
      w.intensity.max,
      w.intensity.val + this.randomInt(turn, turn + w.combat.recovery)
    );
  }

  private consume(w: Wrestler, c: Card) {
    w.stamina.val = Math.max(0, w.stamina.val - c.stamina);
    w.intensity.val = Math.max(0, w.intensity.val - c.intensity);
  }

  private checkState(state: State) {
    if (!state) {
      throw new Error("INVALID STATE - State is null");
    }
    if (!state.active) {
      throw new Error("INVALID STATE - State active is null");
    }
    if (!state.players) {
      throw new Error("INVALID STATE - State players is null");
    }
    if (!state.targets) {
      throw new Error("INVALID STATE - State targets is null");
    }
    if (!state.players[state.active]) {
      throw new Error("INVALID STATE - State active doesn't exist");
    }
    for (let target of state.targets) {
      if (!state.players[target]) {
        throw new Error(
          "INVALID STATE - State target doesn't exist (" + target + ")"
        );
      }
    }
  }

  private checkCard(card: Card) {
    if (!card) {
      throw new Error("INVALID STATE - Card is null");
    }
  }

  private checkWrestler(wrestler: Wrestler) {
    if (!wrestler) {
      throw new Error("INVALID STATE - Wrestler is null");
    }
  }

  private checkMode(mode: Mode) {
    if (!mode) {
      throw new Error("INVALID STATE - Mode is null");
    }
  }
}

export default CoreEngine;
