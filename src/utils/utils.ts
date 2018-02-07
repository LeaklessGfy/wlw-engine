import Players from "../models/players";
import Wrestler from "../models/wrestler";

export const getWrestler = (key: string, players: Players): Wrestler => {
  return players[key];
}
