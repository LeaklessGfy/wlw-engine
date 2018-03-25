import { injectable } from "inversify";
import EffectStrategy from "models/effect-strategy";
import { EffectProxy, StateProxy, WrestlerProxy } from "proxies";
import { randomInt } from "utils";
import { Targets } from "consts";

@injectable()
class CoreEffectStrategy implements EffectStrategy {
  apply(effect: EffectProxy, active: WrestlerProxy, target: WrestlerProxy) {
    if (randomInt(0, 100) <= effect.getLuck()) {
      switch (effect.getTarget()) {
        case Targets.OPPONENT:
          target.addEffect(effect);
          break;
        case Targets.SELF:
          active.addEffect(effect);
          break;
      }
    }
  }

  run(effect: EffectProxy, wrestler: WrestlerProxy) {}
}

export default CoreEffectStrategy;
