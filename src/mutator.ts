import * as _ from "lodash";
import { Kernel, State, Wrestler } from "./models";
import { randomInt, isInteractive } from "./utils";
import * as Reports from "./consts/reports";
import * as States from "./consts/states";
import Accessor from "./accessors/accessor";

class Mutator {
  constructor(private readonly accessor: Accessor) {}

  newTurn(): void {
    if (this.accessor.isState(States.INIT)) {
      this.accessor.getWrestlers().forEach(w => w.shuffleDeck());
    }
    if (!this.accessor.hasNext()) {
      this.accessor.buildNext();
    }
    const active = this.accessor.nextActive();
    active.recovery(this.accessor.getTurn());
    this.accessor.nextTurn();
  }

  nextNewTurn(): void {
    this.accessor.clean();
    this.accessor.cleanReports();
    this.accessor.setState(States.DISTRIBUTE_HANDS);
  }

  distributeHands(length: number = 3): void {
    this.accessor.getWrestlers().forEach(w => {
      w.discardHand();
      if (w.shouldRespawnDeck()) w.respawnDeck();
      w.distributeHand(length);
    });
  }

  nextDistributeHands(): void {
    this.accessor.clean();
    this.accessor.cleanReports();
    this.accessor.setState(States.VALIDATE_HANDS);
  }

  validateHands(): void {
    this.accessor.getWrestlers().forEach(w => w.validateHand());
  }

  nextValidateHands(): void {
    this.accessor.clean();
    this.accessor.cleanReports();
    this.accessor.setState(States.RANDOM_CARD);
    if (isInteractive(this.accessor.getActiveKey())) {
      this.accessor.setState(States.PLAY_CARD);
    }
  }

  playCard(kernel: Kernel): void {
    const targets = this.accessor.getTargets();
    const active = this.accessor.getActive();
    const card = this.accessor.getCard();
    const actuators = card.getActuators(kernel);
    const reports = [];

    active.consumeCard(card);
    targets.forEach(target => {
      if (!target.hasDodge(card, active)) {
        reports.push(Reports.TOUCH);
        actuators.operate(card, target, active, this.accessor);
      } else if (target.hasReverse(card)) {
        reports.push(Reports.REVERSE);
        actuators.operate(card, active, target, this.accessor);
      } else {
        reports.push(Reports.DODGE);
      }
    });
    // effect card
    active.discardCard(card);

    this.accessor.setReports(reports);
  }

  nextPlayCard(): void {
    this.accessor.clean();
  }

  randomCard(): void {
    const active = this.accessor.getActive();
    const hand = active.getHand().getRef();
    const valid = hand.filter(card => card.valid);
    if (valid.length < 1) {
      this.accessor.clean();
      return;
    }
    this.accessor.setCard(randomInt(0, valid.length - 1));
  }

  nextRandomCard(): void {
    this.accessor.setState(States.NEW_TURN);
    if (this.accessor.getCardKey() !== null) {
      this.accessor.setState(States.RANDOM_TARGET);
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
