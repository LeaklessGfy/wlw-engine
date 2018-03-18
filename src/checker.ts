import * as _ from "lodash";
import { Bar, Card, CombatStat, Mode, State, Wrestler } from "./models";

export const checkState = (state: State): void => {
  if (!_.isPlainObject(state)) {
    throw new Error("INVALID STATE - State is null or not object");
  }
  if (!_.isInteger(state.turn)) {
    throw new Error("INVALID STATE - State turn is null or not integer");
  }
  if (!_.isString(state.viewer)) {
    throw new Error("INVALID STATE - State viewer is null or not string");
  }
  if (!_.isString(state.active)) {
    throw new Error("INVALID STATE - State active is null or not string");
  }
  if (!_.isArray(state.targets)) {
    throw new Error("INVALID STATE - State targets is null or not array");
  }
  if (!_.isArray(state.baseNext)) {
    throw new Error("INVALID STATE - State baseNext is null or not array");
  }
  if (!_.isArray(state.next)) {
    throw new Error("INVALID STATE - State next is null or not array");
  }
  if (!_.isPlainObject(state.players)) {
    throw new Error("INVALID STATE - State players is null or not object");
  }
  if (!_.isPlainObject(state.players[state.viewer])) {
    throw new Error("INVALID STATE - State viewer isn't valid");
  }
  if (!_.isPlainObject(state.players[state.active])) {
    throw new Error("INVALID STATE - State active isn't valid");
  }
  for (let target of state.targets) {
    if (!_.isPlainObject(state.players[target])) {
      throw new Error(
        "INVALID STATE - State target isn't valid (" + target + ")"
      );
    }
  }
  if (!_.isArray(state.records)) {
    throw new Error("INVALID STATE - State records is null or not array");
  }
};

export const checkCard = (card: Card): void => {
  if (!_.isPlainObject(card)) {
    throw new Error("INVALID STATE - Card is null or not object");
  }
  if (!_.isString(card.uid)) {
    throw new Error("INVALID STATE - Card uid is null or not string");
  }
  if (!_.isArray(card.actuators)) {
    throw new Error("INVALID STATE - Card actuators is null or not array");
  }
  if (!_.isString(card.name)) {
    throw new Error("INVALID STATE - Card name is null or not string");
  }
  if (!_.isString(card.img)) {
    throw new Error("INVALID STATE - Card img is null or not string");
  }
  if (!_.isString(card.description)) {
    throw new Error("INVALID STATE - Card description is null or not string");
  }
  if (!_.isInteger(card.stamina)) {
    throw new Error("INVALID STATE - Card stamina is null or not integer");
  }
  if (!_.isInteger(card.intensity)) {
    throw new Error("INVALID STATE - Card intensity is null or not integer");
  }
  if (!_.isArray(card.targets)) {
    throw new Error("INVALID STATE - Card targets is null or not array");
  }
  if (!_.isBoolean(card.reverseable)) {
    throw new Error("INVALID STATE - Card reverseable is null or not boolean");
  }
  if (!_.isBoolean(card.valid)) {
    throw new Error("INVALID STATE - Card valid is null or not boolean");
  }
  if (card.valid !== true) {
    throw new Error("INVALID STATE - Card isn't valid");
  }
};

export const checkWrestler = (wrestler: Wrestler): void => {
  if (!_.isPlainObject(wrestler)) {
    throw new Error("INVALID STATE - Wrestler is null or not object");
  }
  if (!_.isString(wrestler.uid)) {
    throw new Error("INVALID STATE - Wrestler uid is null or not string");
  }
  if (!_.isString(wrestler.name)) {
    throw new Error("INVALID STATE - Wrestler name is null or not string");
  }
  if (!_.isString(wrestler.img)) {
    throw new Error("INVALID STATE - Wrestler img is null or not string");
  }
  if (!_.isInteger(wrestler.gender)) {
    throw new Error("INVALID STATE - Wrestler gender is null or not integer");
  }
  if (!_.isInteger(wrestler.category)) {
    throw new Error("INVALID STATE - Wrestler category is null or not integer");
  }
  checkBar(wrestler.health, "Health");
  checkBar(wrestler.stamina, "Stamina");
  checkBar(wrestler.intensity, "Intensity");
  if (!_.isArray(wrestler.deck)) {
    throw new Error("INVALID STATE - Wrestler deck is null or not array");
  }
  if (!_.isArray(wrestler.hand)) {
    throw new Error("INVALID STATE - Wrestler hand is null or not array");
  }
  if (!_.isArray(wrestler.dead)) {
    throw new Error("INVALID STATE - Wrestler dead is null or not array");
  }
  if (!_.isArray(wrestler.status)) {
    throw new Error("INVALID STATE - Wrestler status is null or not array");
  }
  checkCombat(wrestler.combat);
};

export const checkBar = (bar: Bar, name: string): void => {
  if (!_.isPlainObject(bar)) {
    throw new Error("INVALID STATE - Bar " + name + " is null or not object");
  }
  if (!_.isInteger(bar.val)) {
    throw new Error(
      "INVALID STATE - Bar " + name + " val is null or not integer"
    );
  }
  if (!_.isInteger(bar.max)) {
    throw new Error(
      "INVALID STATE - Bar " + name + " max is null or not integer"
    );
  }
};

export const checkCombat = (combat: CombatStat): void => {
  if (!_.isPlainObject(combat)) {
    throw new Error("INVALID STATE - Combat is null or not object");
  }
  if (!_.isInteger(combat.accuracy)) {
    throw new Error("INVALID STATE - Combat accuracy is null or not integer");
  }
  if (!_.isInteger(combat.damage)) {
    throw new Error("INVALID STATE - Combat damage is null or not integer");
  }
  if (!_.isInteger(combat.speed)) {
    throw new Error("INVALID STATE - Combat speed is null or not integer");
  }
  if (!_.isInteger(combat.crit)) {
    throw new Error("INVALID STATE - Combat crit is null or not integer");
  }
  if (!_.isInteger(combat.dodge)) {
    throw new Error("INVALID STATE - Combat dodge is null or not integer");
  }
  if (!_.isInteger(combat.agility)) {
    throw new Error("INVALID STATE - Combat agility is null or not integer");
  }
  if (!_.isInteger(combat.recovery)) {
    throw new Error("INVALID STATE - Combat recovery is null or not integer");
  }
  if (!_.isInteger(combat.submission)) {
    throw new Error("INVALID STATE - Combat submission is null or not integer");
  }
};

export const checkMode = (mode: Mode): void => {
  if (!_.isPlainObject(mode)) {
    throw new Error("INVALID STATE - Mode is null or not object");
  }
};

export const advancedCheckState = (state: State): void => {
  for (let target of state.targets) {
    // check if target is ok for card card.
  }
};
