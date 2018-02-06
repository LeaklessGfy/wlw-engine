import Middleware from "./middleware";
import State from "./models/state";

class Kernel {
  private middlewares: any;

  constructor(middlewares: Middleware[]) {
    this.middlewares = {};
    middlewares.forEach(middleware => this.subscribe(middleware));
  }

  public subscribe(middleware: Middleware): void {
    if (!this.middlewares[middleware.key]) {
      this.middlewares[middleware.key] = [];
    }
    this.middlewares[middleware.key].push(middleware);
  }

  public dispatch(key: string, mutable: State, original: State): void {
    if (!this.middlewares[key]) {
      return;
    }
    this.middlewares[key].forEach((middleware: Middleware) => {
      middleware.apply(mutable, original);
    });
  }
}

export default Kernel;
