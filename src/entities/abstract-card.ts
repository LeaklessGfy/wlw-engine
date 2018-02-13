import * as _ from "lodash";
import { Card, State, Engine, Wrestler } from "../models";
import { Targets } from "../consts";

abstract class AbstractCard implements Card {
  abstract uid;
  actuators: string[];
  validators: string[];
  abstract name;
  abstract img;
  abstract description;
  requirements;
  abstract stamina;
  abstract intensity;
  damage;
  effects;
  targets = [Targets.OPPONENT];
  reverseable = true;
  valid?: boolean;

  public consume(active: Wrestler): void {
    active.stamina.val = Math.max(0, active.stamina.val - this.stamina);
    active.intensity.val = Math.max(0, active.intensity.val - this.intensity);
  }

  public operate(state: State, engine: Engine): void {}
}

export default AbstractCard;
