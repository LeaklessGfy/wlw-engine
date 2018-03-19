import StateProxy from "../proxies/state.proxy";

interface OperatorStrategy {
  operate(state: StateProxy): void;
  winner(state: StateProxy): void;
}

export default OperatorStrategy;
