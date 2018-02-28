import * as _ from "lodash";
import { Kernel, State, Wrestler } from "./models";
import { randomInt, isInteractive } from "./utils";
import * as Reports from "./consts/reports";
import * as States from "./consts/states";
import StateProxy from "./proxies/state.proxy";

class Mutator {
  constructor(private readonly proxy: StateProxy) {}

  newTurn(): void {
    if (this.proxy.isState(States.INIT)) {
      this.proxy.getWrestlers().forEach(w => w.shuffleDeck());
    }
    if (!this.proxy.hasNext()) {
      this.proxy.buildNext();
    }
    const active = this.proxy.nextActive();
    active.recovery(this.proxy.getTurn());
    this.proxy.nextTurn();
  }

  nextNewTurn(): void {
    this.proxy.clean();
    this.proxy.cleanReports();
    this.proxy.setState(States.DISTRIBUTE_HANDS);
  }

  distributeHands(length: number = 3): void {
    this.proxy.getWrestlers().forEach(w => {
      w.discardHand();
      if (w.shouldRespawnDeck()) w.respawnDeck();
      w.distributeHand(length);
    });
  }

  nextDistributeHands(): void {
    this.proxy.clean();
    this.proxy.cleanReports();
    this.proxy.setState(States.VALIDATE_HANDS);
  }

  validateHands(): void {
    this.proxy.getWrestlers().forEach(w => w.validateHand());
  }

  nextValidateHands(): void {
    this.proxy.clean();
    this.proxy.cleanReports();
    this.proxy.setState(States.RANDOM_CARD);
    if (isInteractive(this.proxy.getActiveKey())) {
      this.proxy.setState(States.PLAY_CARD);
    }
  }

  playCard(kernel: Kernel): void {
    const targets = this.proxy.getTargets();
    const active = this.proxy.getActive();
    const card = this.proxy.getCard();
    const actuators = card.getActuators(kernel);
    const reports = [];

    active.consumeCard(card);
    targets.forEach(target => {
      if (!target.hasDodge(card, active)) {
        reports.push(Reports.TOUCH);
        actuators.operate(card, target, active, this.proxy);
      } else if (target.hasReverse(card)) {
        reports.push(Reports.REVERSE);
        actuators.operate(card, active, target, this.proxy);
      } else {
        reports.push(Reports.DODGE);
      }
    });
    // effect card
    active.discardCard(card);

    this.proxy.setReports(reports);
  }

  nextPlayCard(): void {
    this.proxy.clean();
  }

  randomCard(): void {
    const active = this.proxy.getActive();
    const hand = active.getHand().getRef();
    const valid = hand.filter(card => card.valid);
    if (valid.length < 1) {
      this.proxy.clean();
      return;
    }
    this.proxy.setCard(randomInt(0, valid.length - 1));
  }

  nextRandomCard(): void {
    this.proxy.setState(States.NEW_TURN);
    if (this.proxy.getCardKey() !== null) {
      this.proxy.setState(States.RANDOM_TARGET);
    }
  }

  randomTargets(): void {
    /*
    const card = utilsS.getActiveCard(mutable);
    for (let target of card.targets) {
      switch (target) {
        case Targets.OPPONENT:
          const opponents = utilsS.getOpponents(mutable.active, mutable);
          const len = opponents.length ? opponents.length - 1 : 0;
          const random = utilsG.randomInt(0, len);
          mutable.targets.push(opponents[random]);
          break;
      }
    }
    */
  }

  nextRandomTargets(): void {}
}

export default Mutator;
