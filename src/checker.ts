import { Card, Mode, State, Wrestler } from "./models";

export const checkState = (state: State): void => {
  if (!state) {
    throw new Error("INVALID STATE - State is null");
  }
  if (!state.active) {
    throw new Error("INVALID STATE - State active is null");
  }
  if (!state.players) {
    throw new Error("INVALID STATE - State players is null");
  }
  if (!state.targets) {
    throw new Error("INVALID STATE - State targets is null");
  }
  if (!state.players[state.active]) {
    throw new Error("INVALID STATE - State active doesn't exist");
  }
  for (let target of state.targets) {
    if (!state.players[target]) {
      throw new Error(
        "INVALID STATE - State target doesn't exist (" + target + ")"
      );
    }
  }
};

export const checkCard = (card: Card): void => {
  if (!card) {
    throw new Error("INVALID STATE - Card is null");
  }
};

export const checkWrestler = (wrestler: Wrestler): void => {
  if (!wrestler) {
    throw new Error("INVALID STATE - Wrestler is null");
  }
};

export const checkMode = (mode: Mode): void => {
  if (!mode) {
    throw new Error("INVALID STATE - Mode is null");
  }
};
