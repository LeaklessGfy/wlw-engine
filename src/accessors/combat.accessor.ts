import CombatStat from "../models/combat-stat";

class CombatAccessor {
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

  setAccuracy(val: number): CombatAccessor {
    this.combat.accuracy = Math.max(0, val);

    return this;
  }

  setDamage(val: number): CombatAccessor {
    this.combat.damage = Math.max(0, val);

    return this;
  }
}

export default CombatAccessor;
