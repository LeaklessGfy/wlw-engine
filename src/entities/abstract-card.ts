import * as _ from "lodash";
import { Card, Wrestler } from "../models";

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
  targets = ["OPPONENT"];
  reverseable = true;
  valid?: boolean;

  public run(active: Wrestler, targets: Wrestler[], engine) {}

  public validate(engine) {}
}

export default AbstractCard;
