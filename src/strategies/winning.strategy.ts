import StateProxy from "../proxies/state.proxy";

interface Winning {
  checkWinner(state: StateProxy): boolean;
}

export default Winning;

export class DefaultWinning implements Winning {
  checkWinner(state: StateProxy): boolean {
    const mode = state.getMode();
    const active = state.getActiveKey();
    const players = state.getPlayers();

    switch (mode.winning) {
      case "health":
        const opponents = state.getOpponents(active);
        if (opponents.every(k => players[k].health.val === 0)) {
          state.setWinner(active);
          return true;
        }
        return false;
    }
    return false;
  }
}
