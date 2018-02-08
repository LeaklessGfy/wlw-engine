import * as _ from "lodash";
import * as Chance from "chance";
import { Players, Wrestler } from "../models";

const random = new Chance(Math.random);

export const getWrestler = (key: string, players: Players): Wrestler => {
  return players[key];
}

export const getWrestlers = (players: Players): Wrestler[] => {
  return _.values(players);
}

export const randomBool = (percent: number): boolean => {
  return random.bool({ likelihood: percent ? percent : 50 });
}

export const randomInt = (min: number, max: number): number => {
  return random.integer({ min, max });
}
