import * as _ from "lodash";
import { StateProxy, WrestlerProxy } from "../proxies";

interface Distributor {
  distribute(wrestler: WrestlerProxy, state: StateProxy): void;
}

export default Distributor;

export class DefaultDistributor implements Distributor {
  private static readonly MIN = 3;

  distribute(wrestler: WrestlerProxy, state: StateProxy): void {
    this.discardHand(wrestler);
    this.respawnDeck(wrestler);
    this.distributeHand(wrestler);
  }

  private discardHand(wrestler: WrestlerProxy) {
    const dead = wrestler.getDead();
    for (let c of wrestler.getHand().getRef()) {
      dead.push(c);
    }
    wrestler.setHand([]);
  }

  private respawnDeck(wrestler: WrestlerProxy) {
    const deck = wrestler.getDeck().getRef();
    const dead = wrestler.getDead().getRef();
    if (deck.length < DefaultDistributor.MIN) {
      deck.concat(_.shuffle(dead));
      wrestler.setDead([]);
    }
  }

  private distributeHand(wrestler: WrestlerProxy) {
    const deck = wrestler.getDeck().getRef();
    const hand = wrestler.getHand().getRef();
    if (deck.length > DefaultDistributor.MIN) {
      for (let i = 0; i < DefaultDistributor.MIN; i++) {
        hand.push(deck.shift());
      }
    } else {
      hand.concat(deck);
      wrestler.setDeck([]);
    }
  }
}
