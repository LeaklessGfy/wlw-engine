import "mocha";
import { expect } from "chai";
import container from "inversify.config";
import Action from "models/action";
import TYPES from "types";
import StateProxy from "proxies/state.proxy";
import fakeState from "../fake-state";

describe("[ACTION] Init", () => {
  const init = container.getNamed<Action>(TYPES.Action, "init");

  it("should be able to act", () => {
    const b = fakeState();
    const f = fakeState();
    const s = new StateProxy(f);
    init.act(s);

    // Base next built
    expect(f.baseNext.length).to.equal(2);

    // Deck shuffle
    expect(b.players.P1.deck[0].name).to.not.equal(f.players.P1.deck[0].name);
  });
});
