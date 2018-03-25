import { CardProxy, StateProxy, WrestlerProxy } from "proxies";

interface CardStrategy {
  shuffleDeck(wrestler: WrestlerProxy): void;
  distributeHand(wrestler: WrestlerProxy, s: StateProxy): void;
  validateHand(wrestler: WrestlerProxy, s: StateProxy): void;
  validateCard(card: CardProxy, wrestler: WrestlerProxy, s: StateProxy): void;
  consumeCard(card: CardProxy, wrestler: WrestlerProxy, s: StateProxy): void;
  discardCard(card: CardProxy, wrestler: WrestlerProxy, s: StateProxy): void;
}

export default CardStrategy;
