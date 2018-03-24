import { CardProxy, StateProxy, WrestlerProxy } from "../proxies";

interface Actuator {
  readonly KEY: string;

  operate(
    card: CardProxy,
    target: WrestlerProxy,
    active: WrestlerProxy,
    accessor: StateProxy
  ): void;
}

export default Actuator;
