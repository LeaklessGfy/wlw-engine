import { CardProxy, StateProxy } from "../../proxies";
import Actuator from "../../models/actuator";
import { Records, Reports } from "../../consts";
import OperatorStrategy from "../operator.strategy";

class CoreOperatorStrategy implements OperatorStrategy {
  private readonly kernel;

  constructor(actuators: Actuator[] = []) {
    this.kernel = {};
    for (let actuator of actuators) {
      this.kernel[actuator.key] = actuator;
    }
  }

  operate(state: StateProxy): void {
    const targets = state.getTargets();
    const card = state.getCard();
    const active = state.getActive();
    const actuators = this.actuators(card);
    const records = [];

    targets.forEach(target => {
      if (!target.hasDodge(card, active)) {
        records.push({ key: Records.CARD_STATUS, val: Reports.TOUCH });
        actuators.forEach(a => a.operate(card, target, active, state));
        //effectors.apply ?
      } else if (target.hasReverse(card)) {
        records.push({ key: Records.CARD_STATUS, val: Reports.REVERSE });
        actuators.forEach(a => a.operate(card, active, target, state));
        //effectors.apply ?
      } else {
        records.push({ key: Records.CARD_STATUS, val: Reports.DODGE });
        //has dodge
      }
    });

    state.setRecords(records);
  }

  winner(state: StateProxy) {
    const mode = state.getMode();
    const active = state.getActiveKey();
    const players = state.getPlayers();

    switch (mode.winning) {
      case "health":
        const opponents = state.getOpponents(active);
        if (opponents.every(k => players[k].health.val === 0)) {
          state.setWinner(active);
        }
    }
  }

  private actuators(card: CardProxy): Actuator[] {
    return card
      .getActuators()
      .map(k => this.kernel[k])
      .filter(a => a);
  }
}

export default CoreOperatorStrategy;
