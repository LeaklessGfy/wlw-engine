import ArrayAccessor from "./array.accessor";
import { Actuator, Card, Kernel } from "../models";

class CardAccessor {
  private readonly effects: ArrayAccessor<number, number>;

  constructor(private readonly card: Card) {
    this.effects = new ArrayAccessor([0], v => v);
  }

  getUid(): string {
    return this.card.uid;
  }

  getActuatorsKey(): string[] {
    return this.card.actuators;
  }

  getActuators(kernel: Kernel): Actuator[] {
    return this.card.actuators.map(key => kernel.get(key)).filter(a => a);
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
    return this.effects;
  }

  getTargets(): string[] {
    return this.card.targets;
  }

  isReverseable(): boolean {
    return this.card.reverseable;
  }

  getRarity(): string {
    return this.card.rarity;
  }

  isValid(): boolean {
    return this.card.valid;
  }

  getRef(): Card {
    return this.card;
  }
}

export default CardAccessor;
