import { Actuator, Card, Kernel } from "../models";
import ActuatorsAccessor from "./actuators.accessor";
import ArrayAccessor from "./array.accessor";

class CardAccessor {
  constructor(private readonly card: Card) {}

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

  getEffects(): ArrayAccessor<number, number> {
    return new ArrayAccessor([], v => v);
  }

  getTargets(): string[] {
    return this.card.targets;
  }

  getRarity(): string {
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
