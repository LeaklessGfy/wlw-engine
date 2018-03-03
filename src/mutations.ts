import { Card } from "./models";

export const turn = (turn: number) => ({
  key: "turn::next",
  state: {
    turn
  }
});

export const active = (active: string) => ({
  key: "active::next",
  state: {
    active
  }
});

export const shuffle = (k: string, deck: Card[]) => ({
  key: "deck::shuffle",
  state: {
    players: {
      [k]: {
        deck: deck
      }
    }
  }
});

export const next = (next: string[]) => ({
  key: "next::init",
  state: {
    next
  }
});

export const recovery = (k: string, s: number, i: number) => ({
  key: "wrestler::recovery",
  state: {
    players: {
      [k]: {
        stamina: { val: s },
        intensity: { val: i }
      }
    }
  }
});

export const distribute = (
  k: string,
  deck: Card[],
  hand: Card[],
  dead: Card[]
) => ({
  key: "hand::distribute",
  state: {
    players: {
      [k]: {
        deck,
        hand,
        dead
      }
    }
  }
});

export const validate = (k: string, hand: Card[]) => ({
  key: "hand::validate",
  state: {
    players: {
      [k]: {
        hand
      }
    }
  }
});

export const consume = (k: string, s: number, i: number) => ({
  key: "card::consume",
  state: {
    players: {
      [k]: {
        stamina: { val: s },
        intensity: { val: i }
      }
    }
  }
});

export const discard = (k: string, hand: Card[], dead: Card[]) => ({
  key: "card::discard",
  state: {
    players: {
      [k]: {
        hand: hand,
        dead: dead
      }
    }
  }
});

export const clean = () => ({
  key: "state::clean",
  state: {
    card: null,
    targets: []
  }
});

export const state = (state: number) => ({
  key: "state::next",
  state: {
    state
  }
});
