import "mocha";
import { expect } from "chai";
import container from "inversify.config";
import Action from "models/action";
import TYPES from "types";
import StateProxy from "proxies/state.proxy";
import fakeState from "../fake-state";

describe("[ACTION] Play", () => {
  const play = container.getNamed<Action>(TYPES.Action, "play");

  it("should be able to act", () => {
    const f = fakeState();
    f.active = "P1";
    f.players.P1.hand = f.players.P1.deck;
    f.card = 0;
    const s = new StateProxy(f);

    play.act(s);

    // Consume card

    // Targets operate

    // Discard card

    // Validate hand

    // Check winner
  });
});
