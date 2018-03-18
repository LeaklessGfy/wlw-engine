import StateProxy from "../../proxies/state.proxy";
import StateStrategy from "../../strategies/state.strategy";

class Winning implements StateStrategy {
  apply(state: StateProxy): void {
    const mode = state.getMode();
    const active = state.getActiveKey();
    const players = state.getPlayers();

    switch (mode.winning) {
      case "health":
        const opponents = state.getOpponents(active);
        if (opponents.every(k => players[k].health.val === 0)) {
          state.setWinner(active);
        }
    }
  }
}

export default Winning;
