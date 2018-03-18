import { CardProxy, StateProxy, WrestlerProxy } from "../../proxies";
import WrestlerStrategy from "../../strategies/wrestler.stategy";

class Validator implements WrestlerStrategy {
  apply(wrestler: WrestlerProxy, state: StateProxy): void {
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

export default Validator;
