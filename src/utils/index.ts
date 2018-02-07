import { Players, Wrestler } from "../models";

export const getWrestler = (key: string, players: Players): Wrestler => {
  return players[key];
}
