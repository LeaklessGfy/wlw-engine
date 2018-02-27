import * as _ from "lodash";
import { Kernel, State, Wrestler } from "./models";
import { randomInt, isInteractive } from "./utils";
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
    this.accessor.setState(States.DISTRIBUTE);
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
    this.accessor.setState(States.VALIDATION);
  }

  validateHands(): void {
    this.accessor.getWrestlers().forEach(w => w.validateHand());
  }

  nextValidateHands(): void {
    this.accessor.clean();
    const nstate = isInteractive(this.accessor.getActiveKey())
      ? States.PLAYER_ACTION
      : States.CHOOSE_RANDOM_CARD;
    this.accessor.setState(nstate);
  }

  playCard(kernel: Kernel): void {
    const targets = this.accessor.getTargets();
    const active = this.accessor.getActive();
    const card = this.accessor.getCard();
    const actuators = card.getActuators(kernel);

    active.consumeCard(card);
    targets.forEach(target => {
      if (!target.hasBlock(card, active)) {
        actuators.operate(card, target, active, this.accessor);
        return;
      }

      if (target.hasReverse(card)) {
        actuators.operate(card, active, target, this.accessor);
      }
    });
    // effect card
    active.discardCard(card);
  }

  nextPlayCard(): void {
    this.accessor.clean();
  }
}

export default Mutator;
