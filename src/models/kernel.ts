import Card from "./card";

interface CardConstructor {
  new (): Card;
}

type CardEntry = {
  uid: string;
  fn: CardConstructor;
};

interface Kernel {
  add(card: CardEntry);
  addAll(...card: CardEntry[]);
  get(key: string): Card;
}

export default Kernel;
