import { StateProxy, WrestlerProxy } from "../proxies";

interface WrestlerStrategy {
  apply(wrestler: WrestlerProxy, state: StateProxy): void;
}

export default WrestlerStrategy;
