import { injectable } from "inversify";
import EffectStrategy from "models/effect-strategy";
import { EffectProxy, StateProxy, WrestlerProxy } from "proxies";

@injectable()
class CoreEffectStrategy implements EffectStrategy {
  applyEffect(
    effect: EffectProxy,
    active: WrestlerProxy,
    target: WrestlerProxy
  ) {}

  runEffect(effect: EffectProxy, wrestler: WrestlerProxy) {}
}

export default CoreEffectStrategy;
