import * as _ from "lodash";
import Accessor from "../accessor";
import { Actuator, Card, State, Wrestler } from "../models";
import { minMax } from "../utils";

class CardService {
  shuffleDeck(wrestler: Wrestler) {
    wrestler.deck = _.shuffle(wrestler.deck);
  }

  respawnDeck(wrestler: Wrestler) {
    if (wrestler.deck.length === 0) {
      wrestler.deck = _.shuffle(wrestler.dead);
      wrestler.dead = [];
    }
  }

  discardHand(wrestler: Wrestler): void {
    for (let card of wrestler.hand) {
      wrestler.dead.push(card);
    }
    wrestler.hand = [];
  }

  distributeHand(wrestler: Wrestler, length: number): void {
    if (wrestler.deck.length > length) {
      for (let i = 0; i < length; i++) {
        wrestler.hand.push(wrestler.deck.shift());
      }
    } else {
      wrestler.hand = wrestler.deck;
      wrestler.deck = [];
    }
  }

  validateHand(wrestler: Wrestler) {
    for (let c of wrestler.hand) {
      let stamina = wrestler.stamina.val >= c.stamina;
      let intensity = wrestler.intensity.val >= c.intensity;
      c.valid = stamina && intensity;
    }
  }

  /**
   * Consume stamina and intensity of the active wrestler for the active card.
   */
  consumeCard(wrestler: Wrestler, card: Card): void {
    const stamina = wrestler.stamina.val - card.stamina;
    wrestler.stamina.val = minMax(0, wrestler.stamina.max, stamina);

    const intensity = wrestler.intensity.val - card.intensity;
    wrestler.intensity.val = minMax(0, wrestler.intensity.max, intensity);
  }

  operateCard(actuators: Actuator[], mutable: State): void {
    actuators.forEach(a => a.operate(mutable, new Accessor(mutable)));
  }

  effectCard(): void {}

  discardCard(wrestler: Wrestler, card: Card): void {
    _.pull(wrestler.hand, card);
    wrestler.dead.push(card);
  }
}

export default CardService;
