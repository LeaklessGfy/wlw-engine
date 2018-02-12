import * as _ from "lodash";
import * as postal from "postal";
import ActionManager from "./interfaces/action-manager";
import DefaultActionManager from "./action-manager"
import { State, Card } from "./models";
import * as Events from "./consts/events";

class WLW {
  constructor(private readonly $a: ActionManager = new DefaultActionManager()) {}
}

export default WLW;
