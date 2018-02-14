import { Engine, State } from "./models";

type HelperCallback = (key: string, state: State) => boolean;

class Helper {
  constructor(private readonly engine: Engine) {}

  public make(state: State, callback: HelperCallback): State {
    let newState = this.engine.newTurn(state);
    if (!callback("new::turn", newState)) return newState;

    // In case of using mirror cards. What to do ? Because distribute only distribute to active
    // Maybe distribute and validating every wrestler and then having an internal state in engine
    // distribute: boolean; validate: boolean. If true do not execute.
    newState = this.engine.distributeCards(newState);
    if (!callback("distribute::cards", newState)) return newState;

    newState = this.engine.validateCards(newState);
    if (!callback("validate::cards", newState)) return newState;

    if (newState.active !== "CPU") {
      if (!callback("interaction", newState)) return newState; // Player interaction
    }

    newState = this.engine.chooseRandomCard(newState);
    if (!callback("choose::random::card", newState)) return newState;

    if (newState.card === null) {
      if (!callback("pass::turn", newState)) return newState;
      return this.make(newState, callback); // Pass turn
    }

    newState = this.engine.chooseRandomTargets(newState);
    if (!callback("choose::random::targets", newState)) return newState;

    newState = this.engine.playCard(newState);
    if (!callback("play::card", newState)) return newState;

    return newState;
  }
}

export default Helper;
