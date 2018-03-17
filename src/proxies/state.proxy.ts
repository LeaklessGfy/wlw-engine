import * as _ from "lodash";
import {
  Actuator,
  Card,
  Kernel,
  State,
  Players,
  Record,
  Wrestler
} from "../models";
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
      return [];
    }

    return [];
  }

  getCard(): CardProxy {
    return this.getActive()
      .getHand()
      .get(this.state.card);
  }

  setCard(card: number): StateProxy {
    this.state.card = card;

    return this;
  }

  setReports(records: Record[]): StateProxy {
    this.state.records = records;

    return this;
  }

  nextTurn(): number {
    this.state.turn++;

    return this.getTurn();
  }

  hasNext(): boolean {
    return this.state.next.length > 0;
  }

  nextActive(): WrestlerProxy {
    const s = this.state;
    s.active = s.next[s.turn % s.mode.numbers];

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

    this.state.next = tmp.map(t => t.key);
  }

  randomCard(): null | number {
    const w = this.getActive();
    const hand = w.getHand().getRef();
    const indexes = [];
    for (let i = 0; i < hand.length; i++) {
      if (hand[i].valid) {
        indexes.push(i);
      }
    }
    if (indexes.length < 1) {
      this.setCard(null);
      return null;
    }

    const index = randomInt(0, indexes.length - 1);
    this.setCard(indexes[index]);

    return indexes[index];
  }

  randomTargets(): void {
    const c = this.getCard();
    const targets = [];

    for (let target of c.getTargets()) {
      switch (target) {
        case Targets.OPPONENT:
          const opponents = this.getOpponents(this.state.active);
          const random = randomInt(0, opponents.length - 1);
          targets.push(opponents[random]);
          break;
        case Targets.SELF:
          targets.push(this.state.active);
          break;
      }
    }

    this.state.targets = targets;
  }

  clean(): void {
    this.state.card = null;
    this.state.targets = [];
  }

  prepare(): void {
    this.state.records = [];
  }
}

export default StateProxy;
