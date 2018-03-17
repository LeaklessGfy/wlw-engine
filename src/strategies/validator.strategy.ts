import { CardProxy, StateProxy, WrestlerProxy } from "../proxies";

interface Validator {
  validate(wrestler: WrestlerProxy, state: StateProxy): void;
}

export default Validator;

export class DefaultValidator implements Validator {
  validate(wrestler: WrestlerProxy, state: StateProxy) {
    const hand = wrestler.getHand();
    hand.forEach(card => {
      let status = this.checkStamina(card, wrestler);
      if (!status) return;
      status = this.checkIntensity(card, wrestler);
      if (!status) return;
    });
  }

  private checkStamina(card: CardProxy, wrestler: WrestlerProxy): boolean {
    if (wrestler.getStamina().getVal() < card.getStamina()) {
      card.setValid(false);
      return false;
    }
    return true;
  }

  private checkIntensity(card: CardProxy, wrestler: WrestlerProxy): boolean {
    if (wrestler.getIntensity().getVal() < card.getIntensity()) {
      card.setValid(false);
      return false;
    }
    return true;
  }
}
