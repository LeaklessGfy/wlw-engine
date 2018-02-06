import State from "./models/state";

interface Middleware {
  key: string;
  apply(mutable: State, original: State): void;
}

export default Middleware;
