//import PubSub from "pubsub-js";
import Middleware from "../middleware";
import State from "../models/state";
import { NEW_TURN } from "../consts/events";

class TurnMiddleware implements Middleware {
  key: "middleware::turn";

  apply(mutable: State, original: State): void {
    mutable.turn++;
    //PubSub.publish(NEW_TURN, mutable);
  }
}

export default TurnMiddleware;
