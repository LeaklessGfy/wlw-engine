import "mocha";
import { expect } from "chai";
import fakeState from "../resources/fake-state";
import StateProxy from "./state.proxy";

describe("[PROXY] State", () => {
  const f = fakeState();
  const proxy = new StateProxy(f);

  it("should be able to return the active wrestler", () => {
    const active = proxy.getActive();
    expect(active.getUid()).to.equal(f.players.P1.uid);
  });

  it("should be able to return the first target", () => {
    const target = proxy.getFirstTarget();
    expect(target.getUid()).to.equal(f.players.CPU1.uid);
  });

  it("should be able to return the targets", () => {
    const targets = proxy.getTargets().getRef();
    expect(targets.length).to.equal(1);
    expect(targets).to.eql([f.players.CPU1]);
  });

  it("should be able to return a wrestler by key", () => {
    const wrestler = proxy.getWrestler("P1");
    expect(wrestler.getUid()).to.equal(f.players.P1.uid);
  });

  it("should be able to return all wrestlers", () => {
    const wrestlers = proxy.getWrestlers().getRef();
    expect(wrestlers.length).to.equal(2);
    expect(wrestlers).to.eql([f.players.P1, f.players.CPU1]);
  });

  it("should be able to return all keys", () => {
    const keys = proxy.getKeys();
    expect(keys.length).to.equal(2);
    expect(keys).to.eql(["P1", "CPU1"]);
  });

  it("should be able to return all opponents", () => {
    const opponents = proxy.getOpponents(f.active);
    expect(opponents.length).to.equal(1);
    expect(opponents).to.eql(["CPU1"]);
  });

  it("should be able to return all parteners", () => {
    const parteners = proxy.getParteners(f.active);
    expect(parteners.length).to.equal(1);
  });

  it("should be able to return the active card", () => {
    f.card = 0;
    f.players.P1.hand = f.players.P1.deck;
    const card = proxy.getCard();

    expect(card.getUid()).to.equal(f.players.P1.hand[0].uid);
  });

  it("should be able to clean state", () => {
    const f = fakeState();
    f.card = 0;
    f.targets = ["SMTH", "JOHN"];

    const proxy = new StateProxy(f);
    proxy.clean();

    expect(f.card).to.equal(null);
    expect(f.targets.length).to.equal(0);
  });

  it("should be able to next active", () => {
    const f = fakeState();
    f.next = ["CPU1", "P1", "CPU1", "P1"];
    const proxy = new StateProxy(f);
    proxy.nextActive();
    expect(f.active).to.equal("CPU1");
    proxy.nextActive();
    expect(f.active).to.equal("P1");
    proxy.nextActive();
    expect(f.active).to.equal("CPU1");
    proxy.nextActive();
    expect(f.active).to.equal("P1");
  });

  it("should be able to build next", () => {
    const f = fakeState();

    f.next = [];

    const proxy = new StateProxy(f);
    proxy.buildNext();

    expect(f.baseNext.length).to.equal(2);
  });
});
