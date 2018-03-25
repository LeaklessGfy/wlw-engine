import "mocha";
import { expect } from "chai";
import fakeState from "../fake-state";
import MirrorActuator from "./mirror.actuator";
import StateProxy from "proxies/state.proxy";

describe("[ACTUATOR] Mirror", () => {
  it("should be able to operate", () => {
    const f = fakeState();
    const m = fakeState();

    m.players.P1.hand = m.players.P1.deck;
    m.card = 0;

    const s = new StateProxy(m);
    const a = new MirrorActuator();
    const card = s.getCard();

    a.operate(card, s.getFirstTarget(), s.getActive(), s);

    f.players.P1.deck.shift();
    expect(m.players.P1.hand).to.eql(f.players.CPU1.hand);
    expect(m.players.CPU1.hand).to.eql(f.players.P1.deck);
  });
});
