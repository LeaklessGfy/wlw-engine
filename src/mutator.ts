import * as _ from "lodash";
import { Kernel, State, Record, Wrestler } from "./models";
import StateProxy from "./proxies/state.proxy";
import * as utils from "./utils";
import * as Records from "./consts/records";
import * as Reports from "./consts/reports";
import * as States from "./consts/states";
import * as Targets from "./consts/targets";

import MutationHolder from "./mutation-holder";
import * as Mutations from "./mutations";

class Mutator {
  private readonly mutations: MutationHolder;

  constructor(private readonly proxy: StateProxy) {
    this.mutations = new MutationHolder(null);
  }

  init(): void {
    const state = this.mutations.getState();

    for (let k of _.keys(state.players)) {
      const w = state.players[k];
      this.mutations.mutate(Mutations.shuffle(k, _.shuffle(w.deck)));
    }

    this.mutations.mutate(Mutations.next([]));
    this.mutations.mutate(Mutations.clean());
    this.mutations.mutate(Mutations.state(States.NEW_TURN));
  }

  skipTurn(): void {
    const state = this.mutations.getState();
    this.mutations.mutate(Mutations.turn(state.turn + 1));
    this.mutations.mutate(Mutations.active(state.next[state.turn % 2]));
    this.mutations.mutate(Mutations.recovery(state.active, 0, 0));

    const v = state.turn % state.mode.numbers === 0;
    this.mutations.mutate(Mutations.clean());
    this.mutations.mutate(
      Mutations.state(v ? States.DISTRIBUTE_HANDS : States.VALIDATE_HANDS)
    );
  }

  distributeHands(length: number = 3): void {
    const state = this.mutations.getState();

    for (let k of _.keys(state.players)) {
      const w = state.players[k];
      utils.discardHand(w);
      if (w.deck < 1) utils.respawnDeck(w);
      utils.distributeHand(w, length);
      this.mutations.mutate(Mutations.distribute(k, w));
    }

    this.mutations.mutate(Mutations.clean());
    this.mutations.mutate(Mutations.state(States.VALIDATE_HANDS));
  }

  validateHands(): void {
    const state = this.mutations.getState();

    for (let k of _.keys(state.players)) {
      const w = state.players[k];
      utils.validateHand(w);
      this.mutations.mutate(Mutations.validate(k, w));
    }

    const v = utils.isInteractive(state.active);
    this.mutations.mutate(Mutations.clean());
    this.mutations.mutate(
      Mutations.state(v ? States.CHOOSE_CARD : States.RANDOM_CARD)
    );
  }

  playCard(kernel: Kernel): void {
    const state = this.mutations.getState();
    const a = state.players[state.active];
    const c = a.hand[state.card];

    //utils.consumeCard(active, card);
    const s = a.stamina.val;
    const sNew = Math.min(0, s - c.stamina);
    const i = a.intensity.val;
    const iNew = Math.min(0, i - c.intensity);

    this.mutations.mutate(Mutations.consume(state.active, sNew, iNew));

    for (let k of state.targets) {
      const t = state.players[k];
      if (!utils.hasDodge(c, a, t)) {
        //actuators.operate();
      } else if (utils.hasReverse(a, t)) {
        //actuators.operate(card, active, target, this.proxy);
      } else {
        //dodge
      }
    }
    // effect card

    utils.discardCard(a, c);
    this.mutations.mutate(Mutations.discard(state.active, active));
    this.mutations.mutate(Mutations.clean());
    this.mutations.mutate(Mutations.state(States.VALIDATE_HANDS));
  }

  randomCard(): void {
    const active = this.proxy.getActive();
    const hand = active.getHand().getRef();
    const valid = hand.filter(card => card.valid);
    if (valid.length < 1) {
      this.proxy.clean();
      this.proxy.setState(States.NEW_TURN);
      return;
    }
    this.proxy.setCard(randomInt(0, valid.length - 1));

    // POST
    this.proxy.setState(States.RANDOM_TARGETS);
  }

  randomTargets(): void {
    const card = this.proxy.getCard();
    const targets = this.proxy.getTargetsKey();

    for (let target of card.getTargets()) {
      switch (target) {
        case Targets.OPPONENT:
          const opponents = this.proxy.getOpponents(this.proxy.getActiveKey());
          const random = randomInt(0, opponents.length - 1);
          targets.push(opponents[random]);
          break;
        case Targets.SELF:
          targets.push(this.proxy.getActiveKey());
          break;
      }
    }

    this.proxy.setState(States.PLAY_CARD);
  }
}

export default Mutator;
