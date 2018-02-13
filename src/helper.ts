import { Engine, State } from "./models";

type HelperCallback = (key: string, state: State) => boolean;

class Helper {
  constructor(private readonly engine: Engine) {}

  public make(state: State, callback: HelperCallback) {
    let newState = this.engine.newTurn(state);
    if (!callback("new::turn", newState)) return;

    /* TODO: Do not call distributeCards and validateCards for every new turn */
    /* OR change behaviour by just distributing and validating for active */
    newState = this.engine.distributeCards(newState);
    if (!callback("distribute::cards", newState)) return;

    newState = this.engine.validateCards(newState);
    if (!callback("validate::cards", newState)) return;

    if (newState.active !== "CPU") {
      if (!callback("interaction", newState)) return; // Player interaction
    }

    newState = this.engine.chooseRandomCard(newState);
    if (!callback("choose::random::card", newState)) return;

    if (newState.card === null) {
      this.make(newState, callback); // Pass turn
      return;
    }

    newState = this.engine.chooseRandomTargets(newState);
    if (!callback("choose::random::targets", newState)) return;

    newState = this.engine.playCard(newState);
    if (!callback("play::card", newState)) return;
  }
}

export default Helper;
