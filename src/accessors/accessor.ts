import * as _ from "lodash";
import { Actuator, Card, Kernel, State, Wrestler } from "../models";
import ArrayAccessor from "./array.accessor";
import CardAccessor from "./card.accessor";
import WrestlerAccessor from "./wrestler.accessor";
import { randomInt } from "../../../api/wlw-engine/src/utils";

class Accessor {
  constructor(private readonly state: State) {}

  getTurn(): number {
    return this.state.turn;
  }

  getActiveKey(): string {
    return this.state.active;
  }

  /**
   * Return the wrestler accessor for the active player.
   *
   * @return {WrestlerAccessor} the active wrestler
   */
  getActive(): WrestlerAccessor {
    return new WrestlerAccessor(this.state.players[this.state.active]);
  }

  /**
   * Return the wrestler accessor for the first target.
   *
   * @return {WrestlerAccessor} the first target wrestler
   */
  getFirstTarget(): WrestlerAccessor {
    return new WrestlerAccessor(this.state.players[this.state.targets[0]]);
  }

  /**
   * Return an array of wrestler accessor for the targets.
   *
   * @return {ArrayAccessor<WrestlerAccessor, Wrestler>} array of targets wrestler
   */
  getTargets(): ArrayAccessor<WrestlerAccessor, Wrestler> {
    return new ArrayAccessor<WrestlerAccessor, Wrestler>(
      this.state.targets.map(target => this.state.players[target]),
      v => new WrestlerAccessor(v)
    );
  }

  /**
   *
   * @param {string} key
   *
   * @return {WrestlerAccessor} the wrestler corresponding to the key
   */
  getWrestler(key: string): WrestlerAccessor {
    return new WrestlerAccessor(this.state.players[key]);
  }

  /**
   * Return an array of wrestler accessor for all players.
   *
   * @return {ArrayAccessor<WrestlerAccessor, Wrestler>} array of players wrestler
   */
  getWrestlers(): ArrayAccessor<WrestlerAccessor, Wrestler> {
    return new ArrayAccessor<WrestlerAccessor, Wrestler>(
      _.values(this.state.players),
      v => new WrestlerAccessor(v)
    );
  }

  /**
   * Return an array of wrestlers keys.
   *
   * @return {string[]} keys of wrestlers
   */
  getKeys(): string[] {
    return _.keys(this.state.players);
  }

  /**
   * Return an array of wrestler key for all opponents.
   *
   * @param {string} key the wrestler key to get opponents
   *
   * @return {string[]} array of opponents key
   */
  getOpponents(key: string): string[] {
    if (!this.state.mode.team) {
      return _.keys(this.state.players).filter(k => key !== k);
    }

    return [];
  }

  /**
   * Return an array of wrestler key for all parteners.
   *
   * @param {string} key the wrestler key to get parteners
   *
   * @return {string[]} array of parteners key
   */
  getParteners(key: string): string[] {
    if (!this.state.mode.team) {
      return [];
    }

    return [];
  }

  /**
   * Return the active card accessor.
   *
   * @return {CardAccessor} active card
   */
  getCard(): CardAccessor {
    return this.getActive()
      .getHand()
      .get(this.state.card);
  }

  /**
   * Get the actuators of the given card.
   *
   * @param {Card} c
   * @param {Kernel} k
   */
  getActuators(c: Card, k: Kernel): Actuator[] {
    return c.actuators.map(a => k.get(a)).filter(a => a !== null);
  }

  nextTurn(): number {
    this.state.turn++;

    return this.getTurn();
  }

  isState(state: number): boolean {
    return this.state.state === state;
  }

  hasNext(): boolean {
    return this.state.next.length > 0;
  }

  nextActive(): WrestlerAccessor {
    this.state.active = this.state.next.shift();

    return this.getActive();
  }

  setState(state: number): Accessor {
    this.state.state = state;

    return this;
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

  clean(): void {
    this.state.card = null;
    this.state.targets = [];
  }
}

export default Accessor;
