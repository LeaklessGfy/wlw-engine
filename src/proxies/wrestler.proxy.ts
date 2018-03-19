import * as _ from "lodash";
import { Card, Wrestler } from "../models";
import ArrayProxy from "./array.proxy";
import BarProxy from "./bar.proxy";
import CardProxy from "./card.proxy";
import CombatProxy from "./combat.proxy";
import { randomInt } from "../utils";

class WrestlerProxy {
  private readonly health: BarProxy;
  private readonly stamina: BarProxy;
  private readonly intensity: BarProxy;
  private readonly combat: CombatProxy;

  constructor(private readonly wrestler: Wrestler) {
    this.health = new BarProxy(wrestler.health);
    this.stamina = new BarProxy(wrestler.stamina);
    this.intensity = new BarProxy(wrestler.intensity);
    this.combat = new CombatProxy(wrestler.combat);
  }

  // GETTERS

  getUid(): string {
    return this.wrestler.uid;
  }

  getName(): string {
    return this.wrestler.name;
  }

  getImg(): string {
    return this.wrestler.img;
  }

  getGender(): number {
    return this.wrestler.gender;
  }

  getCategory(): number {
    return this.wrestler.category;
  }

  getHealth(): BarProxy {
    return this.health;
  }

  getStamina(): BarProxy {
    return this.stamina;
  }

  getIntensity(): BarProxy {
    return this.intensity;
  }

  getDeck(): ArrayProxy<CardProxy> {
    return new ArrayProxy(this.wrestler.deck, v => new CardProxy(v));
  }

  getHand(): ArrayProxy<CardProxy> {
    return new ArrayProxy(this.wrestler.hand, v => new CardProxy(v));
  }

  getDead(): ArrayProxy<CardProxy> {
    return new ArrayProxy(this.wrestler.dead, v => new CardProxy(v));
  }

  getStatus(): number[] {
    return this.wrestler.status;
  }

  getCombat(): CombatProxy {
    return this.combat;
  }

  // SETTERS

  setDeck(deck: Card[]): WrestlerProxy {
    this.wrestler.deck = deck;
    return this;
  }

  setHand(hand: Card[]): WrestlerProxy {
    this.wrestler.hand = hand;
    return this;
  }

  setDead(dead: Card[]): WrestlerProxy {
    this.wrestler.dead = dead;
    return this;
  }

  // SPECIAL

  recovery(turn: number): void {
    const max = (turn + this.wrestler.combat.recovery) / 2;

    const stamina = this.getStamina();
    stamina.addVal(randomInt(turn / 2, max));

    const intensity = this.getIntensity();
    intensity.addVal(randomInt(turn / 2, max));
  }

  hasDodge(card: CardProxy, w: WrestlerProxy): boolean {
    if (!card.isBlockable()) {
      return false;
    }
    const accuracy =
      randomInt(0, 10) + randomInt(0, w.wrestler.combat.accuracy);
    const dodge = randomInt(0, 2) + randomInt(0, this.wrestler.combat.dodge);

    return dodge > accuracy;
  }

  hasReverse(card: CardProxy): boolean {
    if (!card.isReverseable() || !this.hasCrit()) {
      return false;
    }
    return true;
  }

  hasCrit(): boolean {
    return randomInt(0, 100) <= this.wrestler.combat.crit;
  }
}

export default WrestlerProxy;
