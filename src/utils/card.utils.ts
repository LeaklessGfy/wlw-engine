import * as _ from "lodash";
import { Actuator, Card, Kernel, Wrestler } from "../models";

export const shuffleDeck = (w: Wrestler): void => {
  w.cards = _.shuffle(w.cards);
};

export const distributeHand = (w: Wrestler) => {
  const length = w.cards.length ? w.cards.length - 1 : 0;
  w.hand = [];

  if (w.cards.length <= 3) {
    w.hand = w.cards;
    w.cards = [];
    return;
  }

  for (let i; i < 3; i++) {
    w.hand.push(w.cards.shift());
  }
};

export const consumeCard = (w: Wrestler, c: Card): void => {
  w.stamina.val = Math.max(0, w.stamina.val - c.stamina);
  w.intensity.val = Math.max(0, w.intensity.val - c.intensity);
};

export const getActuators = (c: Card, k: Kernel): Actuator[] => {
  return c.actuators.map(a => k.get(a)).filter(a => a !== null);
};

export const applyEffects = (): void => {};

export const discardCard = (w: Wrestler, c: Card) => {
  _.pull(w.hand, c);
  w.dead.push(c);
};

export const randomValidCard = (w: Wrestler): Card | null => {
  const validCard = w.hand.filter(card => card && card.valid);
  if (validCard.length > 0) {
    return _.sample(validCard);
  }
  return null;
};
