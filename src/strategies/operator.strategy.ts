import { StateProxy, WrestlerProxy } from "../proxies";

interface OperatorStrategy {
  recovery(wrestler: WrestlerProxy, state: StateProxy): void;
  operate(state: StateProxy): void;
  winner(state: StateProxy): void;
}

export default OperatorStrategy;
