import { State } from "../models";
import { randomInt } from "../utils";

class StateService {
  next(state: State) {
    const keys = Object.keys(state.players);
    const tmp = keys.map(key => {
      const w = state.players[key];
      const speed = randomInt(0, w.combat.speed);
      return { key, speed };
    });

    tmp.sort((a, b) => {
      if (a.speed > b.speed) return -1;
      return 1;
    });

    state.next = tmp.map(t => t.key);
  }

  /**
   * Clean the state by removing active card and targets.
   */
  clean(state: State): void {
    state.targets = [];
    state.card = null;
  }
}

export default StateService;
