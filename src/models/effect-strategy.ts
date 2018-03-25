import { CardProxy, EffectProxy, WrestlerProxy } from "proxies";

interface EffectStrategy {
  applyEffect(
    effect: EffectProxy,
    active: WrestlerProxy,
    target: WrestlerProxy
  );
  runEffect(effect: EffectProxy, wrestler: WrestlerProxy);
}

export default EffectStrategy;
