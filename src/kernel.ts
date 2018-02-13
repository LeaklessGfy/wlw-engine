import Card from "./models/card";

class Kernel {
  private readonly cards: any;

  constructor(cards: Card[] = []) {
    this.addAll(...cards);
  }

  public add(card: Card) {
    this.cards[card.uid] = card;
  }

  public addAll(...cards: Card[]) {
    for (let card of cards) {
      this.add(card);
    }
  }

  public get(key: string): Card {
    return this.cards[key] ? this.cards[key] : null;
  }
}

export default Kernel;
