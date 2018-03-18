import StateProxy from "../proxies/state.proxy";

interface StateStrategy {
  apply(state: StateProxy): void;
}

export default StateStrategy;
