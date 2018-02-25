import * as _ from "lodash";
import { Actuator, Card, Kernel, State, Wrestler } from "./models";

class Accessor {
  constructor(readonly state: State) {}

  /**
   * Return the wrestler object for the active player.
   *
   * @return {Wrestler} the active wrestler
   */
  getActive(): Wrestler {
    return this.state.players[this.state.active];
  }

  /**
   * Return the wrestler object for the first target.
   *
   * @return {Wrestler} the first target wrestler
   */
  getFirstTarget(): Wrestler {
    return this.state.players[this.state.targets[0]];
  }

  /**
   * Return an array of wrestler object for the targets.
   *
   * @return {Wrestler[]} array of targets wrestler
   */
  getTargets(): Wrestler[] {
    return this.state.targets.map(target => this.state.players[target]);
  }

  getWrestler(key: string): Wrestler {
    return this.state.players[key];
  }

  /**
   * Return an array of wrestler object for all players.
   *
   * @return {Wrestler[]} array of players wrestler
   */
  getWrestlers(): Wrestler[] {
    return _.values(this.state.players);
  }

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
   * Return the active card.
   *
   * @return {Card} active card
   */
  getCard(): Card {
    return this.getActive().hand[this.state.card];
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
}

export default Accessor;
