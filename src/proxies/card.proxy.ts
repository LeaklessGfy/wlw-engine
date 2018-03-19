import * as _ from "lodash";
import { Actuator, Card, Effect } from "../models";
import ArrayProxy from "./array.proxy";
import EffectProxy from "./effect.proxy";

class CardProxy {
  private readonly effects: ArrayProxy<EffectProxy>;

  constructor(private readonly card: Card) {
    this.effects = new ArrayProxy(card.effects, v => new EffectProxy(v));
  }

  getUid(): string {
    return this.card.uid;
  }

  getActuators(): string[] {
    return this.card.actuators;
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

  getEffects(): ArrayProxy<EffectProxy> {
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

  is(card): boolean {
    return this.card === card;
  }

  toCard(): Card {
    return _.cloneDeep(this.card);
  }

  setValid(valid: boolean): CardProxy {
    if (!_.isBoolean(valid)) {
      throw new Error("ILLEGAL ARGUMENT valid. Card.setValid");
    }
    this.card.valid = valid;
    return this;
  }
}

export default CardProxy;
