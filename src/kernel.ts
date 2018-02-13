import Card from "./models/card";
import Kernel from "./models/kernel";

interface CardConstructor {
  new (): Card;
}

type CardEntry = {
  uid: string;
  fn: CardConstructor;
};

class CoreKernel implements Kernel {
  private readonly cards: any;

  constructor(cards: CardEntry[] = []) {
    this.addAll(...cards);
  }

  public add(card: CardEntry) {
    this.cards[card.uid] = card.fn;
  }

  public addAll(...cards: CardEntry[]) {
    for (let card of cards) {
      this.add(card);
    }
  }

  public get(key: string): Card {
    return this.cards[key] ? new this.cards[key]() : null;
  }
}

export default CoreKernel;
