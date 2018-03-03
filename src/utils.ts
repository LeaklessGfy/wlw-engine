import * as _ from "lodash";
import * as Chance from "chance";
import { Wrestler, Card } from "./models";

const random = new Chance(Math.random);

/**
 * Clone the object pass in parameter
 *
 * @param {T} o
 *
 * @return {T}
 */
export const clone = <T>(o: T): T => {
  return _.cloneDeep(o);
};

/**
 * Return a random integer. Can be influenced by min and max parameter (inclusive).
 *
 * @param {number} min minimum that random int can be
 * @param {number} max maximum that random int can be
 *
 * @return {number} random integer
 */
export const randomInt = (min: number = 0, max: number = 1): number => {
  return random.integer({ min, max });
};

/**
 * Return a random boolean. Can be influenced by percent parameter.
 *
 * @param {number} percent a number that represent the percent of success
 *
 * @return {boolean} random boolean
 */
export const randomBool = (percent: number = 50): boolean => {
  return random.bool({ likelihood: percent });
};

export const minMax = (min: number, max: number, val: number): number => {
  return Math.min(Math.max(min, val), max);
};

/**
 * Return a random valid card or null.
 *
 * @param {Card} w
 */
export const randomValidCard = (w: Wrestler): Card | null => {
  const validCard = w.hand.filter(card => card && card.valid);
  if (validCard.length > 0) {
    return _.sample(validCard);
  }
  return null;
};

/**
 * Return true if the index/key of player represent an interactive one.
 *
 * @param {string} index
 *
 * @return {boolean}
 */
export const isInteractive = (index: string): boolean => {
  return index.charAt(0) === "P";
};

export const discardHand = (w): void => {
  for (let card of w.hand) {
    w.dead.push(card);
  }
  w.hand = [];
};

export const respawnDeck = (w): void => {
  w.deck = _.shuffle(w.dead);
  w.dead = [];
};

export const distributeHand = (w, length: number): void => {
  if (w.deck.length > length) {
    for (let i = 0; i < length; i++) {
      w.hand.push(w.deck.shift());
    }
  } else {
    w.hand = w.deck;
    w.deck = [];
  }
};

export const validateHand = (w): void => {
  for (let c of w.hand) {
    let stamina = w.stamina.val >= c.stamina;
    let intensity = w.intensity.val >= c.intensity;
    c.valid = stamina && intensity;
  }
};

export const consumeCard = (w, c): void => {
  const stamina = w.stamina.val;
  w.stamina.val = Math.min(0, stamina - c.stamina);

  const intensity = w.intensity.val;
  w.intensity.val = Math.min(0, intensity - c.intensity);
};

export const discardCard = (w, c): void => {
  w.hand = w.hand.filter(oc => oc !== c);
  w.dead.push(c);
};

export const hasDodge = (c, w, t): boolean => {
  if (!c.blockable) {
    return false;
  }

  const accuracy = randomInt(0, 10) + randomInt(0, t.combat.accuracy);
  const dodge = randomInt(0, 7) + randomInt(0, w.combat.dodge);

  return dodge > accuracy;
};

export const hasReverse = (c, t): boolean => {
  if (!c.isReverseable()) {
    return false;
  }

  return true;
};
