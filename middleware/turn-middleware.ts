import PubSub from "pubsub-js";
import Middleware from "../middleware";
import State from "../model/state";
import { NEW_TURN } from "../events";

class TurnMiddleware implements Middleware {
  key: "middleware::turn";

  apply(mutable: State, original: State): void {
    mutable.turn++;
    PubSub.publish(NEW_TURN, mutable);
  }
}
