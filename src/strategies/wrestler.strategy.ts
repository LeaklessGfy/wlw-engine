import { StateProxy, WrestlerProxy } from "../proxies";

interface WrestlerStrategy {
  order(s: StateProxy): void;
  recovery(w: WrestlerProxy, s: StateProxy): void;
  action(s: StateProxy): void;
  winner(s: StateProxy): void;
}

export default WrestlerStrategy;
