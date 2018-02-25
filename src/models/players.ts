import Wrestler from "./wrestler";

interface Players {
  P1?: Wrestler;
  P2?: Wrestler;
  CPU1?: Wrestler;
  [index: string]: Wrestler;
}

export default Players;
