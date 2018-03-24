import StateProxy from "../proxies/state.proxy";

interface Action {
  act(state: StateProxy): void;
}

export default Action;
