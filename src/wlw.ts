import PubSub from "pubsub-js";
import Kernel from "./kernel";
import Card from "./model/card";
import State from "./model/state";
import { PRE_MIDDLEWARE, POST_MIDDLEWARE } from "./const/events";

class WLW {
  constructor(private kernel: Kernel) {}

  public runCard(_state: State): State {
    const original = Object.freeze(_state);
    let mutable = Object.assign({}, original);

    this.preMiddleware(mutable);
    for (let key of original.card.keys) {
      this.kernel.dispatch(key, mutable, original);
    }
    this.postMiddleware(mutable);

    return mutable;
  }

  private preMiddleware(mutable: State): void {
    PubSub.publish(PRE_MIDDLEWARE, mutable);
  }

  private postMiddleware(mutable: State): void {
    PubSub.publish(POST_MIDDLEWARE, mutable);
  }
}

export default WLW;
