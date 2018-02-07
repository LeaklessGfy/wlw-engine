import * as _ from "lodash";
import { Players, Wrestler } from "../models";

export const getWrestler = (key: string, players: Players): Wrestler => {
  return players[key];
}

export const getWrestlers = (players: Players): Wrestler[] => {
  return _.values(players);
}
