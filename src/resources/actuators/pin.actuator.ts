import Actuator from "../../models/actuator";
import { CardProxy, StateProxy, WrestlerProxy } from "../../proxies";
import * as Status from "../../consts/status";
import { randomBool } from "../../utils";

class PinActuactor implements Actuator {
  key = "pin";

  operate(
    card: CardProxy,
    target: WrestlerProxy,
    active: WrestlerProxy,
    state: StateProxy
  ): void {
    let chance = 100 - target.getHealth().getVal();

    // Active status
    active.getStatus().forEach(status => {
      chance += this.activeStatus(status, chance);
    });

    // Target status
    target.getStatus().forEach(status => {
      chance += this.targetStatus(status, chance);
    });

    const win = randomBool(Math.max(chance, 0));
    if (win) {
      // Trigger win event ? Put target health to 0 ? Special state value ?
      const health = target.getHealth();
      health.setVal(0);
    }
  }

  private activeStatus(status: number, chance: number): number {
    switch (status) {
      case Status.TIRED:
        return -5;
      case Status.CRAZY:
        return 0; //return 10 or -10
      case Status.UNLEASHED:
        return 10;
      default:
        return 0;
    }
  }

  private targetStatus(status: number, chance: number): number {
    switch (status) {
      case Status.KO:
        return 50;
      case Status.STUN:
        return 10;
      case Status.TIRED:
        return 2;
      case Status.COMEBACK:
        return -20;
      case Status.UNLEASHED:
        return -150;
      case Status.NORMAL:
        return -(chance / 2);
      default:
        return 0;
    }
  }
}

export default PinActuactor;
