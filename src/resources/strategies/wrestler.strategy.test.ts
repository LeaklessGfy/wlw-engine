import "mocha";
import { expect } from "chai";
import CoreWrestlerStratey from "./wrestler.strategy";
import StateProxy from "proxies/state.proxy";
import fakeState from "resources/fake-state";

describe("[STRATEGY] Wrestler", () => {
  const strategy = new CoreWrestlerStratey();

  it("should be able to order", () => {
    const f = fakeState();
    f.next = [];
    const state = new StateProxy(f);
    strategy.order(state);

    expect(f.baseNext.length).to.equal(2);
  });

  it("should be able to recovery", () => {});

  it("should be able to action", () => {});

  it("should be able to winner", () => {});
});
