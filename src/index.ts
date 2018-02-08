import * as _ from "lodash";
import * as postal from "postal";
import ActionManager from "./interfaces/action-manager";
import DefaultActionManager from "./action-manager"
import { State, Card } from "./models";
import * as Events from "./consts/events";

class WLW {
  constructor(private readonly $a: ActionManager = new DefaultActionManager()) {}

  public newTurn(_state: State): State {
    this.checkState(_state);
    const { mutable, original } = this.cloneState(_state);

    return this.$a.makeNewTurn(mutable, original);
  }

  public cardPlay(_state: State): State {
    this.checkState(_state);
    this.checkCard(_state.card);
    const { mutable, original } = this.cloneState(_state);

    if (!this.$a.makeCardValidation(mutable.card, original)) {
      return mutable;
    }

    return this.$a.makeCardPlay(mutable, original);
  }

  public cardDistribution(_state: State): State {
    this.checkState(_state);
    const { mutable, original } = this.cloneState(_state);

    return this.$a.makeCardDistribution(mutable, original);
  }

  public cardIA(_state: State): State {
    this.checkState(_state);
    const { mutable, original } = this.cloneState(_state);
    
    return this.$a.makeCardIA(mutable, original);
  }

  private checkState(state: Readonly<State>) {
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
        throw new Error("INVALID STATE - State target doesn't exist (" + target + ")")
      }
    }
  }

  private checkCard(card: Card) {
    if (!card) {
      throw new Error("INVALID STATE - Card is null");
    }
  }

  private cloneState(state: State): {mutable: State, original: Readonly<State>} {
    const original: Readonly<State> = Object.freeze(state);
    const mutable: State = _.cloneDeep(original);

    return { mutable, original };
  }
}

export default WLW;
