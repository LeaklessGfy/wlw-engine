import * as Chance from "chance";
import Actuator from "../../../interfaces/actuator";
import { State, Wrestler } from "../../../models";
import { PIN } from "../../../consts/actuators";
import * as Status from "../../../consts/status";
import { getWrestler } from "../../../utils";

class PinActuator implements Actuator {
  private readonly chance;

  constructor() {
    this.chance = new Chance(Math.random);
  }

  key(): string {
    return PIN;
  }

  operate(mutable: State, original: Readonly<State>): void {
    const active = getWrestler(mutable.active, mutable.players);
    const target = getWrestler(mutable.targets[0], mutable.players);
    let chance = 100 - target.health.val;

    // Active status
    active.status.forEach(status => {
      chance += this.activeStatus(status, chance);
    });

    // Target status
    target.status.forEach(status => {    
      chance += this.targetStatus(status, chance);
    });

    const win = this.chance.bool({likelihood: Math.max(0, chance)});
    
    // Trigger win event ? Put target health to 0 ? Special state value ?
  }

  private activeStatus(status: string, chance: number): number {
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

  private targetStatus(status: string, chance: number): number {
    switch (status) {
      case Status.KO:
        return 60;
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

export default PinActuator;
