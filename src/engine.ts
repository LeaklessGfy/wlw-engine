import * as _ from "lodash";
import * as Chance from "chance";
import { Events } from "./consts";
import { State, Card, Engine, Validator, Wrestler } from "./models";
import GlobalEventManager, { EventManager } from "./event-manager";

class CoreEngine implements Engine {
  private readonly $e: EventManager;
  private readonly $random: any;
  private readonly $validators: Function[];
  private readonly $distributors: Function[];

  constructor() {
    this.$e = GlobalEventManager;
    this.$random = new Chance(Math.random);
    this.$validators = [];
    this.$distributors = [];
  }

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

  public validateCard(_card: Card): boolean {
    this.checkCard(_card);
    const card = this.clone(_card);

    this.$e.publish(Events.PRE_CARD_VALIDATION, { card });
    let status = true;
    for (let validator of this.$validators) {
      if (!validator(card)) {
        status = false;
        break;
      }
    }
    this.$e.publish(Events.POST_CARD_VALIDATION, { card, status });

    return status;
  }

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

  public distributeCard(_wrestler: Wrestler): Card[] {
    this.checkWrestler(_wrestler);
    const wrestler = this.clone(_wrestler);

    this.$e.publish(Events.PRE_CARD_DISTRIBUTION, { wrestler });
    for (let distributor of this.$distributors) {
      //distributor(wrestler);
    }
    this.$e.publish(Events.POST_CARD_DISTRIBUTION, { wrestler });

    return [];
  }

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

  public getOriginalState(): Readonly<State> {
    return null;
  }

  public getActive(state: State): Wrestler {
    return state.players[state.active];
  }

  public getFirstTarget(state: State): Wrestler {
    return state.players[state.targets[0]];
  }

  public getTargets(state: State): Wrestler[] {
    return state.targets.map(target => state.players[target]);
  }

  public getWrestlers = (state: State): Wrestler[] => {
    return _.values(state.players);
  };

  public getOpponents = (wrestler: Wrestler, state: State): Wrestler[] => {
    return [];
  };

  public getParteners = (wrestler: Wrestler, state: State): Wrestler[] => {
    return [];
  };

  public randomBool = (percent: number = 50): boolean => {
    return this.$random.bool({ likelihood: percent });
  };

  public randomInt = (min: number = 0, max: number = 1): number => {
    return this.$random.integer({ min, max });
  };

  public addValidator(validator): void {
    this.$validators.push(validator);
  }

  public addDistributor(distributor): void {
    this.$distributors.push(distributor);
  }

  /*
  ** PRIVATE
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
