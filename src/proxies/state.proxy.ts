import * as _ from "lodash";
import { Actuator, Card, State, Players, Record, Wrestler } from "../models";
import { randomInt } from "../utils";
import ArrayProxy from "./array.proxy";
import CardProxy from "./card.proxy";
import RecordProxy from "./record.proxy";
import WrestlerProxy from "./wrestler.proxy";
import * as Targets from "../consts/targets";

class StateProxy {
  constructor(private readonly state: State) {}

  getTurn(): number {
    return this.state.turn;
  }

  getViewerKey(): string {
    return this.state.viewer;
  }

  getActiveKey(): string {
    return this.state.active;
  }

  getTargetsKey(): string[] {
    return this.state.targets;
  }

  getBaseNextKey(): string[] {
    return this.state.baseNext;
  }

  getNextKey(): string[] {
    return this.state.next;
  }

  getPlayers(): Players {
    return this.state.players;
  }

  getCardKey(): number {
    return this.state.card;
  }

  getMode() {
    return this.state.mode;
  }

  getRecords(): ArrayProxy<RecordProxy> {
    return new ArrayProxy(this.state.records, v => new RecordProxy(v));
  }

  getActive(): WrestlerProxy {
    return new WrestlerProxy(this.state.players[this.state.active]);
  }

  getFirstTarget(): WrestlerProxy {
    return new WrestlerProxy(this.state.players[this.state.targets[0]]);
  }

  getTargets(): ArrayProxy<WrestlerProxy> {
    return new ArrayProxy<WrestlerProxy>(
      this.state.targets.map(target => this.state.players[target]),
      v => new WrestlerProxy(v)
    );
  }

  getWrestler(key: string): WrestlerProxy {
    return new WrestlerProxy(this.state.players[key]);
  }

  getWrestlers(): ArrayProxy<WrestlerProxy> {
    return new ArrayProxy<WrestlerProxy>(
      _.values(this.state.players),
      v => new WrestlerProxy(v)
    );
  }

  getKeys(): string[] {
    return _.keys(this.state.players);
  }

  getOpponents(key: string): string[] {
    if (!this.state.mode.team) {
      return _.keys(this.state.players).filter(k => key !== k);
    }
    return [];
  }

  getParteners(key: string): string[] {
    if (!this.state.mode.team) {
      return [key];
    }
    return [];
  }

  getCard(): CardProxy {
    return this.getActive()
      .getHand()
      .get(this.state.card);
  }

  /* SETTERS */

  setCard(card: number | null): StateProxy {
    if (!_.isInteger(card) && card !== null) {
      throw new Error("ILLEGAL ARGUMENT card. State.setCard");
    }
    this.state.card = card;
    return this;
  }

  setRecords(records: Record[]): StateProxy {
    if (!_.isArray(records)) {
      throw new Error("ILLEGAL ARGUMENT records. State.setRecords");
    }
    this.state.records = records;
    return this;
  }

  setTargets(targets: string[]): StateProxy {
    if (!_.isArray(targets)) {
      throw new Error("ILLEGAL ARGUMENT targets. State.setTargets");
    }
    this.state.targets = targets;
    return this;
  }

  setWinner(winner: string): StateProxy {
    if (!_.isString(winner)) {
      throw new Error("ILLEGAL ARGUMENT winner. State.setWinner");
    }
    this.state.winner = winner;
    return this;
  }

  setNext(next: string[]): StateProxy {
    if (!_.isArray(next)) {
      throw new Error("ILLEGAL ARGUMENT next. State.setNext");
    }
    this.state.next = next;
    return this;
  }

  /* SPECIAL */

  hasBaseNext(): boolean {
    return this.state.baseNext.length > 0;
  }

  hasNext(): boolean {
    return this.state.next.length > 0;
  }

  hasWinner(): boolean {
    return this.state.winner !== undefined && this.state.winner !== null;
  }

  nextTurn(): number {
    this.state.turn++;
    return this.state.turn;
  }

  nextActive(): WrestlerProxy {
    this.state.active = this.state.next.shift();
    return this.getActive();
  }

  buildNext() {
    const keys = this.getKeys();
    const tmp = keys.map(key => {
      const w = this.state.players[key];
      const speed = randomInt(0, w.combat.speed);
      return { key, speed };
    });

    tmp.sort((a, b) => {
      if (a.speed > b.speed) return -1;
      return 1;
    });

    this.state.baseNext = tmp.map(t => t.key);
  }

  clean(): void {
    this.state.card = null;
    this.state.targets = [];
  }
}

export default StateProxy;
