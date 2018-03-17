import * as _ from "lodash";
import { Kernel, State, Record, Wrestler } from "./models";
import StateProxy from "./proxies/state.proxy";
import { randomInt, isInteractive } from "./utils";
import * as Records from "./consts/records";
import * as Reports from "./consts/reports";

class Mutator {
  constructor(private readonly proxy: StateProxy) {}

  newTurn(): void {
    if (!this.proxy.hasNext()) {
      this.proxy.buildNext();
      this.proxy.getWrestlers().forEach(w => w.shuffleDeck());
    }

    const turn = this.proxy.getTurn();
    const mode = this.proxy.getMode();
    if (turn % mode.numbers === 0) {
      this.proxy.getWrestlers().forEach(w => w.respawnHand());
    }

    const active = this.proxy.nextActive();
    active.recovery(turn);
    active.validateHand();
    this.proxy.nextTurn();

    if (!isInteractive(this.proxy.getActiveKey())) {
      const c = this.proxy.randomCard();
      if (c !== null) this.proxy.randomTargets();
    } else {
      this.proxy.clean();
    }
  }

  playCard(kernel: Kernel): void {
    const targets = this.proxy.getTargets();
    const active = this.proxy.getActive();
    const card = this.proxy.getCard();
    const actuators = card.getActuators(kernel);
    const records = this.proxy.getRecords();

    active.consumeCard(card);
    targets.forEach(target => {
      if (!target.hasDodge(card, active)) {
        records.push({ key: Records.CARD_STATUS, val: Reports.TOUCH });
        actuators.operate(card, target, active, this.proxy);
      } else if (target.hasReverse(card)) {
        records.push({ key: Records.CARD_STATUS, val: Reports.REVERSE });
        actuators.operate(card, active, target, this.proxy);
      } else {
        records.push({ key: Records.CARD_STATUS, val: Reports.DODGE });
      }
    });
    // effect card

    if (this.proxy.checkWinner()) {
      this.proxy.clean();
      return;
    }

    active.discardCard(card);
    active.validateHand();

    if (!isInteractive(this.proxy.getActiveKey())) {
      const c = this.proxy.randomCard();
      if (c !== null) this.proxy.randomTargets();
    } else {
      this.proxy.clean();
    }
  }
}

export default Mutator;
