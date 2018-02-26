import "mocha";
import { expect } from "chai";
import fakeState from "../resources/fake-state";
import Accessor from "./accessor";
import Kernel from "../kernel";

describe("Accessor", () => {
  const f = fakeState();
  const accessor = new Accessor(f);

  it("should be able to return the active wrestler", () => {
    const active = accessor.getActive();
    expect(active.getUid()).to.equal(f.players.P1.uid);
  });

  it("should be able to return the first target", () => {
    const target = accessor.getFirstTarget();
    expect(target.getUid()).to.equal(f.players.CPU1.uid);
  });

  it("should be able to return the targets", () => {
    const targets = accessor.getTargets();
    expect(targets.length()).to.equal(1);
    expect(targets.getRef()).to.eql([f.players.CPU1]);
  });

  it("should be able to return a wrestler by key", () => {
    const wrestler = accessor.getWrestler("P1");
    expect(wrestler.getUid()).to.equal(f.players.P1.uid);
  });

  it("should be able to return all wrestlers", () => {
    const wrestlers = accessor.getWrestlers();
    expect(wrestlers.length()).to.equal(2);
    expect(wrestlers.getRef()).to.eql([f.players.P1, f.players.CPU1]);
  });

  it("should be able to return all keys", () => {
    const keys = accessor.getKeys();
    expect(keys.length).to.equal(2);
    expect(keys).to.eql(["P1", "CPU1"]);
  });

  it("should be able to return all opponents", () => {
    const opponents = accessor.getOpponents(f.active);
    expect(opponents.length).to.equal(1);
    expect(opponents).to.eql(["CPU1"]);
  });

  it("should be able to return all parteners", () => {
    const parteners = accessor.getParteners(f.active);
    expect(parteners.length).to.equal(0);
  });

  it("should be able to return the active card", () => {
    f.card = 0;
    f.players.P1.hand = f.players.P1.deck;
    const card = accessor.getCard();

    expect(card.getUid()).to.equal(f.players.P1.hand[0].uid);
  });

  it("should be able to return the actuators", () => {
    const kernel = new Kernel();
    const a1 = {
      key: "test",
      operate: function(a) {}
    };
    const a2 = {
      key: "test2",
      operate: function(a) {}
    };
    kernel.addAll(a1, a2);
    const c = {
      uid: "",
      actuators: ["test", "test2"],
      name: "",
      img: "",
      description: "",
      stamina: 2,
      intensity: 1,
      targets: [],
      reverseable: true,
      rarity: "",
      valid: true
    };

    const act = accessor.getActuators(c, kernel);
    expect(act.length).to.equal(2);
    expect(act[0]).to.equal(a1);
    expect(act[1]).to.equal(a2);
  });

  it("should be able to clean state", () => {
    const f = fakeState();
    f.card = 0;
    f.targets = ["SMTH", "JOHN"];

    const accessor = new Accessor(f);
    accessor.clean();

    expect(f.card).to.equal(null);
    expect(f.targets.length).to.equal(0);
  });

  it("should be able to build next", () => {
    const f = fakeState();
    f.next = [];

    const accessor = new Accessor(f);
    accessor.buildNext();

    expect(f.next.length).to.equal(2);
  });
});
