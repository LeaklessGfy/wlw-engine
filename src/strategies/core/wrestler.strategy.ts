import WrestlerStrategy from "../wrestler.strategy";
import { StateProxy, WrestlerProxy } from "../../proxies";
import * as Targets from "../../consts/targets";
import { randomInt } from "../../utils";

class CoreWrestlerStratey implements WrestlerStrategy {
  order(s: StateProxy) {
    const keys = s.getKeys();
    const players = s.getPlayers();

    const tmp = keys.map(key => {
      const w = players[key];
      const speed = randomInt(0, w.combat.speed);
      return { key, speed };
    });

    tmp.sort((a, b) => {
      if (a.speed > b.speed) return -1;
      return 1;
    });

    s.setBaseNext(tmp.map(t => t.key));
  }

  recovery(w: WrestlerProxy, s: StateProxy) {
    const max = Math.max(1, w.getCombat().getRecovery() / 2);
    const stamina = w.getStamina();
    stamina.addVal(randomInt(1, max));
    const intensity = w.getIntensity();
    intensity.addVal(1);
  }

  action(s) {
    if (this.randomCard(s)) {
      this.randomTargets(s);
    }
  }

  winner(s: StateProxy) {
    const mode = s.getMode();
    const active = s.getActiveKey();
    const players = s.getPlayers();

    switch (mode.winning) {
      case "health":
        const opponents = s.getOpponents(active);
        if (opponents.every(k => players[k].health.val === 0)) {
          s.setWinner(active);
        }
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
      return false;
    }

    const index = randomInt(0, indexes.length - 1);
    state.setCard(indexes[index]);

    return true;
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

export default CoreWrestlerStratey;
