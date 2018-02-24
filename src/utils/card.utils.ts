import * as _ from "lodash";
import { Actuator, Card, Kernel, Wrestler } from "../models";

/**
 * Shuffle the deck of the given wrestler.
 *
 * @param {Wrestler} w
 */
export const shuffleDeck = (w: Wrestler): void => {
  w.deck = _.shuffle(w.deck);
};

/**
 * Distribute an hand to the given wrestler, can be influenced by length.
 *
 * @param {Wrestler} w
 * @param {number} length
 */
export const distributeHand = (w: Wrestler, length: number = 3): void => {
  w.hand = [];

  if (w.deck.length <= length) {
    w.hand = w.deck;
    w.deck = [];
    return;
  }

  for (let i = 0; i < length; i++) {
    w.hand.push(w.deck.shift());
  }
};

/**
 * Validate the hand of the given wrestler.
 *
 * @param {Wrestler} w
 */
export const validateHand = (w: Wrestler): void => {
  // Maybe adding a Validator[] to arguments for special behaviour
  for (let c of w.hand) {
    c.valid = w.stamina.val >= c.stamina && w.intensity.val >= c.intensity;
  }
};

/**
 * Consume stamina and intensity of the given wrestler.
 *
 * @param {Wrestler} w
 * @param {Card} c
 */
export const consumeCard = (w: Wrestler, c: Card): void => {
  w.stamina.val = Math.max(0, w.stamina.val - c.stamina);
  w.intensity.val = Math.max(0, w.intensity.val - c.intensity);
};

/**
 * Get the actuators of the given card.
 *
 * @param {Card} c
 * @param {Kernel} k
 */
export const getActuators = (c: Card, k: Kernel): Actuator[] => {
  return c.actuators.map(a => k.get(a)).filter(a => a !== null);
};

export const applyEffects = (): void => {};

/**
 * Discard the given card in the dead hand of wrestler.
 *
 * @param {Wrestler} w
 * @param {Card} c
 */
export const discardCard = (w: Wrestler, c: Card): void => {
  _.pull(w.hand, c);
  w.dead.push(c);
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
