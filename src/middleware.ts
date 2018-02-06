import State from "./models/state";

interface Middleware {
  key: string;
  apply(mutable: State, original: State);
}

export default Middleware;
