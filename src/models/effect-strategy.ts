import { CardProxy, EffectProxy, WrestlerProxy } from "proxies";

interface EffectStrategy {
  apply(effect: EffectProxy, active: WrestlerProxy, target: WrestlerProxy);
  run(effect: EffectProxy, wrestler: WrestlerProxy);
}

export default EffectStrategy;
