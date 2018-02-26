import * as _ from "lodash";
import { Card, Wrestler } from "../models";
import { ArrayAccessor, BarAccessor, CardAccessor, CombatAccessor } from "./";
import { randomInt } from "../../../api/wlw-engine/src/utils";

class WrestlerAccessor {
  private readonly health: BarAccessor;
  private readonly stamina: BarAccessor;
  private readonly intensity: BarAccessor;

  constructor(private readonly wrestler: Wrestler) {
    this.health = new BarAccessor(this.wrestler.health);
    this.stamina = new BarAccessor(this.wrestler.stamina);
    this.intensity = new BarAccessor(this.wrestler.intensity);
  }

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

  getHealth(): BarAccessor {
    return this.health;
  }

  getStamina(): BarAccessor {
    return this.stamina;
  }

  getIntensity(): BarAccessor {
    return this.intensity;
  }

  getDeck(): ArrayAccessor<CardAccessor, Card> {
    return new ArrayAccessor(this.wrestler.deck, v => new CardAccessor(v));
  }

  getHand(): ArrayAccessor<CardAccessor, Card> {
    return new ArrayAccessor(this.wrestler.hand, v => new CardAccessor(v));
  }

  getDead(): ArrayAccessor<CardAccessor, Card> {
    return new ArrayAccessor(this.wrestler.dead, v => new CardAccessor(v));
  }

  getStatus(): string[] {
    return this.wrestler.status;
  }

  getCombat(): CombatAccessor {
    return new CombatAccessor(this.wrestler.combat);
  }

  setHand(hand: Card[]): WrestlerAccessor {
    this.wrestler.hand = hand;
    return this;
  }

  shuffleDeck(): void {
    this.wrestler.deck = _.shuffle(this.wrestler.deck);
  }

  shouldRespawnDeck(): boolean {
    return this.wrestler.deck.length === 0;
  }

  respawnDeck(): void {
    this.wrestler.deck = _.shuffle(this.wrestler.dead);
    this.wrestler.dead = [];
  }

  discardHand(): void {
    for (let card of this.wrestler.hand) {
      this.wrestler.dead.push(card);
    }
    this.wrestler.hand = [];
  }

  distributeHand(length: number): void {
    if (this.wrestler.deck.length > length) {
      for (let i = 0; i < length; i++) {
        this.wrestler.hand.push(this.wrestler.deck.shift());
      }
    } else {
      this.wrestler.hand = this.wrestler.deck;
      this.wrestler.deck = [];
    }
  }

  validateHand() {
    for (let c of this.wrestler.hand) {
      let stamina = this.wrestler.stamina.val >= c.stamina;
      let intensity = this.wrestler.intensity.val >= c.intensity;
      c.valid = stamina && intensity;
    }
  }

  consumeCard(card: CardAccessor): void {
    const stamina = this.getStamina();
    stamina.addVal(-card.getStamina());

    const intensity = this.getIntensity();
    intensity.addVal(-card.getIntensity());
  }

  discardCard(card: CardAccessor): void {
    this.wrestler.hand = this.wrestler.hand.filter(c => c !== card.getRef());
    this.wrestler.dead.push(card.getRef());
  }

  recovery(turn: number): void {
    const max = turn + this.wrestler.combat.recovery;

    const stamina = this.getStamina();
    stamina.addVal(randomInt(turn, max));

    const intensity = this.getIntensity();
    intensity.addVal(randomInt(turn, max));
  }
}

export default WrestlerAccessor;
