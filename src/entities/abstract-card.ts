import * as _ from "lodash";
import { Card, State, Engine, Wrestler } from "../models";
import { Targets } from "../consts";

abstract class AbstractCard implements Card {
  abstract uid;
  abstract name;
  abstract img;
  abstract description;
  requirements;
  abstract stamina;
  abstract intensity;
  damage;
  effects;
  abstract targets;
  reverseable = true;
  abstract rarity;
  valid?: boolean;

  public operate(state: State, engine: Engine): void {
    const target = engine.getFirstTarget(state);
    target.health.val = Math.max(0, target.health.val - this.damage);
  }
}

export default AbstractCard;
