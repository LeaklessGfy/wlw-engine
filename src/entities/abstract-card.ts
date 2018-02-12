import * as _ from "lodash";
import { Card, State, Wrestler } from "../models";
import { Engine } from "../interfaces";
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
    active.stamina = Math.max(0, active.stamina - this.stamina);
    active.intensity = Math.max(0, active.intensity - this.intensity);
  }

  public operate(state: State, engine: Engine): void {

  }
}

export default AbstractCard;
