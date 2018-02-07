import * as _ from "lodash";
import * as postal from "postal";
import ActionManager from "./interfaces/ActionManager";
import DefaultActionManager from "./DefaultActionManager";
import { State } from "./models";
import * as Events from "./consts/events";

class WLW {
  constructor(private readonly $a: ActionManager = new DefaultActionManager()) {}

  public newTurn(_state: State): State {
    this.checkState(_state);
    const original: Readonly<State> = Object.freeze(_state);
    const mutable: State = _.cloneDeep(original);

    return this.$a.makeNewTurn(mutable, original);
  }

  public cardPlay(_state: State): State {
    this.checkState(_state);
    const original: Readonly<State> = Object.freeze(_state); //immutableJS ?
    const mutable: State = _.cloneDeep(original);

    if (!this.$a.makeCardValidation(original.card, original)) {
      return mutable;
    }

    return this.$a.makeCardPlay(mutable, original);
  }

  private checkState(state: Readonly<State>) {
    if (!state) {
      throw new Error("INVALID STATE - State is null");
    }
    if (!state.card) {
      throw new Error("INVALID STATE - Card is null");
    }
  }
}

export default WLW;
