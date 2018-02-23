import * as _ from "lodash";
import { State, Wrestler } from "../models";
import { randomInt } from "./general.utils";

/**
 * Return a valid initial state.
 *
 * @return {State} valid initial state
 */
export const getInitialState = (): State => {
  return {
    viewer: "",
    turn: 0,
    active: "",
    targets: [],
    next: [],
    players: {},
    card: null,
    mode: null
  };
};

/**
 * Return the wrestler object for the active player.
 *
 * @param {State} state state
 *
 * @return {Wrestler} the active wrestler
 */
export const getActive = (state: State): Wrestler => {
  return state.players[state.active];
};

/**
 * Return the wrestler object for the first target.
 *
 * @param {State} state state
 *
 * @return {Wrestler} the first target wrestler
 */
export const getFirstTarget = (state: State): Wrestler => {
  return state.players[state.targets[0]];
};

/**
 * Return an array of wrestler object for the targets.
 *
 * @param {State} state state
 *
 * @return {Wrestler[]} array of targets wrestler
 */
export const getTargets = (state: State): Wrestler[] => {
  return state.targets.map(target => state.players[target]);
};

/**
 * Return an array of wrestler object for all players.
 *
 * @param {State} state state
 *
 * @return {Wrestler[]} array of players wrestler
 */
export const getWrestlers = (state: State): Wrestler[] => {
  return _.values(state.players);
};

/**
 * Return an array of wrestler object for all opponents.
 *
 * @param {string} key the wrestler key to get opponents
 * @param {State} state state
 *
 * @return {string[]} array of opponents key
 */
export const getOpponents = (key: string, state: State): string[] => {
  if (!state.mode.team) {
    return _.keys(state.players).filter(k => key !== k);
  }

  return [];
};

/**
 * Return an array of wrestler object for all parteners.
 *
 * @param {Wrestler} wrestler the wrestler to get parteners
 * @param {State} state state
 *
 * @return {Wrestler[]} array of parteners wrestler
 */
export const getParteners = (wrestler: Wrestler, state: State): Wrestler[] => {
  if (!state.mode.team) {
    return [];
  }

  return [];
};

export const generateNext = (mutable: State): void => {
  if (mutable.next.length > 0) {
    return;
  }

  const keys = _.keys(mutable.players);
  const tmp = keys.map(key => {
    const w = mutable.players[key];
    const speed = randomInt(0, w.combat.speed);

    return { key, speed };
  });

  tmp.sort((a, b) => {
    if (a.speed > b.speed) {
      return -1;
    }
    return 1;
  });

  mutable.next = tmp.map(t => t.key);
};

/**
 * Clean the state by removing active card and targets.
 *
 * @param {State} mutable
 */
export const cleanState = (mutable: State): void => {
  mutable.targets = [];
  mutable.card = null;
};
