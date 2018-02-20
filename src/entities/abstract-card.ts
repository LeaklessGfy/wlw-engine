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

  public preOperate(mutable: State, engine: Engine) {}

  public operate(mutable: State, engine: Engine): void {
    const target = engine.getFirstTarget(mutable);
    target.health.val = Math.max(0, target.health.val - this.damage);
  }

  public postOperate(mutable: State, engine: Engine) {}
}

export default AbstractCard;
