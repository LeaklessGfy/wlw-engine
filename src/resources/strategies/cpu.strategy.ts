import StateProxy from "../../proxies/state.proxy";
import StateStrategy from "../../strategies/state.strategy";
import { Targets } from "../../consts";
import { randomInt } from "../../utils";

class CPU implements StateStrategy {
  apply(state: StateProxy): void {
    if (this.randomCard(state)) {
      this.randomTargets(state);
    }
  }

  private randomCard(state: StateProxy) {
    const w = state.getActive();
    const hand = w.getHand().getRef();
    const indexes = [];
    for (let i = 0; i < hand.length; i++) {
      if (hand[i].valid) {
        indexes.push(i);
      }
    }
    if (indexes.length < 1) {
      state.setCard(null);
      return true;
    }

    const index = randomInt(0, indexes.length - 1);
    state.setCard(indexes[index]);

    return false;
  }

  private randomTargets(state: StateProxy) {
    const c = state.getCard();
    const active = state.getActiveKey();
    const targets = [];

    for (let target of c.getTargets()) {
      switch (target) {
        case Targets.OPPONENT:
          const opponents = state.getOpponents(active);
          const random = randomInt(0, opponents.length - 1);
          targets.push(opponents[random]);
          break;
        case Targets.SELF:
          targets.push(active);
          break;
      }
    }

    state.setTargets(targets);
  }
}

export default CPU;
