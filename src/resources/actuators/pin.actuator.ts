import { Actuator, State, Engine } from "../../models";
import * as C from "../../consts";
import { getActive, getFirstTarget } from "../../utils/state.utils";
import { randomBool } from "../../utils/general.utils";

class PinActuactor implements Actuator {
  key = "pin";

  operate(mutable: State, engine: Engine): void {
    const active = getActive(mutable);
    const target = getFirstTarget(mutable);
    let chance = 100 - target.health.val;

    // Active status
    active.status.forEach(status => {
      chance += this.activeStatus(status, chance);
    });

    // Target status
    target.status.forEach(status => {
      chance += this.targetStatus(status, chance);
    });

    const win = randomBool(Math.max(chance, 0));

    // Trigger win event ? Put target health to 0 ? Special state value ?
  }

  private activeStatus(status: string, chance: number): number {
    switch (status) {
      case C.Status.TIRED:
        return -5;
      case C.Status.CRAZY:
        return 0; //return 10 or -10
      case C.Status.UNLEASHED:
        return 10;
      default:
        return 0;
    }
  }

  private targetStatus(status: string, chance: number): number {
    switch (status) {
      case C.Status.KO:
        return 50;
      case C.Status.STUN:
        return 10;
      case C.Status.TIRED:
        return 2;
      case C.Status.COMEBACK:
        return -20;
      case C.Status.UNLEASHED:
        return -150;
      case C.Status.NORMAL:
        return -(chance / 2);
      default:
        return 0;
    }
  }
}

export default PinActuactor;
