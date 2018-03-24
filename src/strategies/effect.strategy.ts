import { CardProxy, EffectProxy, WrestlerProxy } from "../proxies";

interface EffectStrategy {
  runEffect(effect: EffectProxy, wrestler: WrestlerProxy);
  applyEffect(
    effect: EffectProxy,
    active: WrestlerProxy,
    target: WrestlerProxy
  );
}

export default EffectStrategy;
