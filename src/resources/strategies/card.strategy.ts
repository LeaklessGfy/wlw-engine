import * as _ from "lodash";
import { injectable } from "inversify";
import CardStrategy from "models/card-strategy";
import { CardProxy, StateProxy, WrestlerProxy } from "proxies";

@injectable()
class CoreCardStrategy implements CardStrategy {
  private static readonly MIN = 5;
  private static readonly MAX = 7;

  shuffleDeck(w: WrestlerProxy): void {
    w.setDeck(_.shuffle(w.getDeck().getRef()));
  }

  distributeHand(w: WrestlerProxy, s: StateProxy): void {
    this.discardHand(w);
    this.respawnDeck(w);
    this.distribute(w);
  }

  validateHand(w: WrestlerProxy, s: StateProxy): void {
    const hand = w.getHand();
    hand.forEach(c => c.setValid(this.check(c, w)));
  }

  validateCard(c: CardProxy, w: WrestlerProxy, s: StateProxy): void {
    c.setValid(this.check(c, w));
  }

  consumeCard(c: CardProxy, w: WrestlerProxy, s: StateProxy): void {
    const stamina = w.getStamina();
    stamina.addVal(-c.getStamina());

    const intensity = w.getIntensity();
    intensity.addVal(-c.getIntensity());
  }

  discardCard(c: CardProxy, w: WrestlerProxy, s: StateProxy): void {
    const hand = w.getHand().getRef();
    const dead = w.getDead().getRef();
    w.setHand(hand.filter(card => !c.is(card)));
    dead.push(c.toCard());
  }

  private discardHand(wrestler: WrestlerProxy) {
    const dead = wrestler.getDead().getRef();
    for (let c of wrestler.getHand().getRef()) {
      dead.push(c);
    }
    wrestler.setHand([]);
  }

  private respawnDeck(wrestler: WrestlerProxy) {
    const deck = wrestler.getDeck().getRef();
    const dead = wrestler.getDead().getRef();
    if (deck.length < CoreCardStrategy.MIN) {
      wrestler.setDeck(deck.concat(_.shuffle(dead)));
      wrestler.setDead([]);
    }
  }

  private distribute(wrestler: WrestlerProxy) {
    const deck = wrestler.getDeck().getRef();
    const hand = wrestler.getHand().getRef();
    if (deck.length > CoreCardStrategy.MIN) {
      for (let i = 0; i < CoreCardStrategy.MIN; i++) {
        hand.push(deck.shift());
      }
    } else {
      wrestler.setHand(hand.concat(deck));
      wrestler.setDeck([]);
    }
  }

  private check(card: CardProxy, wrestler: WrestlerProxy): boolean {
    return this.checkStamina(card, wrestler);
  }

  private checkStamina(card: CardProxy, wrestler: WrestlerProxy): boolean {
    if (wrestler.getStamina().getVal() < card.getStamina()) {
      return false;
    }
    return this.checkIntensity(card, wrestler);
  }

  private checkIntensity(card: CardProxy, wrestler: WrestlerProxy): boolean {
    if (wrestler.getIntensity().getVal() < card.getIntensity()) {
      return false;
    }
    return true;
  }

  private checkCategory(card: CardProxy, wrestler: WrestlerProxy): boolean {
    return true;
  }
}

export default CoreCardStrategy;
