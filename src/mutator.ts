import * as _ from "lodash";
import { Kernel, State, Record, Wrestler } from "./models";
import StateProxy from "./proxies/state.proxy";
import { randomInt, isInteractive } from "./utils";
import * as Records from "./consts/records";
import * as Reports from "./consts/reports";
import * as States from "./consts/states";
import * as Targets from "./consts/targets";

class Mutator {
  constructor(private readonly proxy: StateProxy) {}

  newTurn(): void {
    let v = false;
    if (this.proxy.isState(States.INIT)) {
      this.proxy.getWrestlers().forEach(w => w.shuffleDeck());
    }
    if (!this.proxy.hasNext()) {
      v = true;
      this.proxy.buildNext();
    }
    const active = this.proxy.nextActive();
    active.recovery(this.proxy.getTurn());
    this.proxy.nextTurn();

    this.proxy.clean();
    this.proxy.setState(v ? States.DISTRIBUTE_HANDS : States.VALIDATE_HANDS);
  }

  distributeHands(length: number = 3): void {
    this.proxy.getWrestlers().forEach(w => {
      w.discardHand();
      if (w.shouldRespawnDeck()) w.respawnDeck();
      w.distributeHand(length);
    });

    // POST
    this.proxy.clean();
    this.proxy.setState(States.VALIDATE_HANDS);
  }

  validateHands(): void {
    this.proxy.getWrestlers().forEach(w => w.validateHand());

    // POST
    this.proxy.clean();
    let v = isInteractive(this.proxy.getActiveKey());
    this.proxy.setState(v ? States.CHOOSE_CARD : States.RANDOM_CARD);
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
    active.discardCard(card);

    // POST
    this.proxy.clean();
    this.proxy.setState(States.VALIDATE_HANDS);
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
