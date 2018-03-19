import * as _ from "lodash";
import CombatStat from "../models/combat-stat";

class CombatProxy {
  constructor(private readonly combat: CombatStat) {}

  getAccuracy(): number {
    return this.combat.accuracy;
  }

  getDamage(): number {
    return this.combat.damage;
  }

  getSpeed(): number {
    return this.combat.speed;
  }

  getCrit(): number {
    return this.combat.crit;
  }

  getDodge(): number {
    return this.combat.dodge;
  }

  getAgility(): number {
    return this.combat.agility;
  }

  getRecovery(): number {
    return this.combat.recovery;
  }

  getSubmission(): number {
    return this.combat.submission;
  }

  setAccuracy(val: number): CombatProxy {
    if (!_.isInteger(val)) {
      throw new Error("Bad value, val isn't an integer. Combat.setAccuracy");
    }
    this.combat.accuracy = Math.max(0, val);
    return this;
  }

  setDamage(val: number): CombatProxy {
    if (!_.isInteger(val)) {
      throw new Error("Bad value, val isn't an integer. Combat.setDamage");
    }
    this.combat.damage = Math.max(0, val);
    return this;
  }
}

export default CombatProxy;
