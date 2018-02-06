import * as _ from "lodash";
import Actuator from "./actuator";
import Kernel from "./kernel";
import Card from "./models/card";
import State from "./models/state";

class WLW {
  constructor(private kernel: Kernel, private dispatcher: any) {}

  public turnNew(_state: State): State {
    return _state;
  }

  public cardPlay(_state: State): State {
    const original = Object.freeze(_state); //immutableJS ?
    const mutable: State = _.cloneDeep(original);

    //this.dispatcher("pre.card.play");
    for (let key of original.card.actuators) {
      const actuators = this.kernel.get(key);
      actuators.forEach((actuator: Actuator) => actuator.operate(mutable, original));
    }
    //this.dispatcher.dispatch("post.card.play");

    return mutable;
  }
}

export default WLW;
