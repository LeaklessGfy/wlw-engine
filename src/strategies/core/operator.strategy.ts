import OperatorStrategy from "../operator.strategy";
import { CardProxy, StateProxy, WrestlerProxy } from "../../proxies";
import Actuator from "../../models/actuator";
import { Records, Reports } from "../../consts";
import { randomInt } from "../../utils";

class CoreOperatorStrategy implements OperatorStrategy {
  private readonly kernel;

  constructor(actuators: Actuator[] = []) {
    this.kernel = {};
    for (let actuator of actuators) {
      this.kernel[actuator.key] = actuator;
    }
  }

  recovery(w: WrestlerProxy, s: StateProxy): void {
    const max = Math.max(1, w.getCombat().getRecovery() / 2);
    const stamina = w.getStamina();
    stamina.addVal(randomInt(1, max));

    const intensity = w.getIntensity();
    intensity.addVal(w.hasCrit() ? 3 : 1);
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

  winner(state: StateProxy): void {
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
