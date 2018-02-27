import { Actuator, Card, Effect, Kernel } from "../models";
import ActuatorsAccessor from "./actuators.accessor";
import ArrayAccessor from "./array.accessor";
import EffectAccessor from "./effect.accessor";

class CardAccessor {
  private readonly effects: ArrayAccessor<EffectAccessor, Effect>;

  constructor(private readonly card: Card) {
    this.effects = new ArrayAccessor(card.effects, v => new EffectAccessor(v));
  }

  getUid(): string {
    return this.card.uid;
  }

  getActuatorsKey(): string[] {
    return this.card.actuators;
  }

  getActuators(k: Kernel): ActuatorsAccessor {
    const arr = this.card.actuators.map(a => k.get(a)).filter(a => a);

    return new ActuatorsAccessor(arr);
  }

  getName(): string {
    return this.card.name;
  }

  getImg(): string {
    return this.card.img;
  }

  getDescription(): string {
    return this.card.description;
  }

  getStamina(): number {
    return this.card.stamina;
  }

  getIntensity(): number {
    return this.card.intensity;
  }

  getDamage(): number | undefined {
    return this.card.damage;
  }

  getEffects(): ArrayAccessor<EffectAccessor, Effect> {
    return this.effects;
  }

  getTargets(): number[] {
    return this.card.targets;
  }

  getRarity(): number {
    return this.card.rarity;
  }

  isBlockable(): boolean {
    return this.card.blockable;
  }

  isReverseable(): boolean {
    return this.card.reverseable;
  }

  isValid(): boolean {
    return this.card.valid;
  }

  getRef(): Card {
    return this.card;
  }
}

export default CardAccessor;
