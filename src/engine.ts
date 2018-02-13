import * as _ from "lodash";
import * as Chance from "chance";
import { Events } from "./consts";
import {
  Card,
  Distributor,
  Engine,
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
  private readonly $random: any;
  private readonly $validators: Validator[];
  private readonly $distributors: Distributor[];

  /**
   * Creates an instance of CoreEngine.
   * @memberof CoreEngine
   */
  constructor() {
    this.$e = GlobalEventManager;
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
    this.checkState(_state);
    const mutable = this.clone(_state);
    const original = this.freeze(_state);

    this.$e.publish(Events.PRE_TURN_NEW, { mutable, original });

    if (mutable.next.length < 1) {
      this.generateNext(mutable);
    }
    mutable.active = mutable.next.shift();
    this.generateClean(mutable);
    mutable.turn++;
    this.generateRecovery(this.getActive(mutable));

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
    mutable.card.consume(this.getActive(mutable));
    mutable.card.operate(mutable, this);
    this.$e.publish(Events.POST_CARD_PLAY, { mutable, original });

    return mutable;
  }

  /**
   * Distribute an hand for every wrestlers.
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
    for (let wrestler of this.getWrestlers(mutable)) {
      let cards: Card[] = [];
      for (let distributor of this.$distributors) {
        distributor(wrestler, cards);
      }
      wrestler.hand = cards;
    }
    this.$e.publish(Events.POST_CARD_DISTRIBUTION, { mutable, original });

    return mutable;
  }

  /**
   * Validate hand cards for every wrestlers.
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
    for (let wrestler of this.getWrestlers(mutable)) {
      for (let card of wrestler.hand) {
        let status = true;
        for (let validator of this.$validators) {
          if (!validator(card, original)) {
            status = false;
            break;
          }
        }
        card.valid = status;
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

    const active: Wrestler = mutable.players[mutable.active];
    const validCard = active.hand.filter(card => card.valid);
    if (validCard.length === 0) {
      return this.newTurn(_state);
    }
    const index = this.randomInt(0, validCard.length - 1);
    mutable.card = validCard[index];

    this.$e.publish(Events.POST_CARD_IA, { mutable, original });

    return mutable;
  }

  /*
  ** HELPERS
  */

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
   * @param {Wrestler} wrestler the wrestler to get opponents
   * @param {State} state state
   *
   * @return {Wrestler[]} array of opponents wrestler
   */
  public getOpponents = (wrestler: Wrestler, state: State): Wrestler[] => {
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
   *
   * @param validator
   */
  public addValidator(validator): void {
    this.$validators.push(validator);
  }

  /**
   *
   * @param distributor
   */
  public addDistributor(distributor): void {
    this.$distributors.push(distributor);
  }

  /*
  ** PRIVATES
  */

  private generateNext(mutable: State): void {
    const keys = _.keys(mutable.players);
    const wrestlers = this.getWrestlers(mutable);
    console.log(keys, wrestlers);
    const tmp = wrestlers.map(wrestler =>
      this.randomInt(0, wrestler.combat.speed)
    );
    mutable.next = [];
  }

  private generateClean(mutable: State): void {
    mutable.targets = [];
    mutable.card = null;
  }

  private generateRecovery(wrestler: Wrestler): void {
    wrestler.stamina.val = Math.min(
      wrestler.stamina.max,
      this.randomInt(0, wrestler.combat.recovery)
    );
    wrestler.intensity.val = Math.min(
      wrestler.intensity.max,
      this.randomInt(0, wrestler.combat.recovery)
    );
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

  private clone<T>(o: T): T {
    return _.cloneDeep(o);
  }

  private freeze<T>(o: T): Readonly<T> {
    return Object.freeze(o);
  }
}

export default CoreEngine;
