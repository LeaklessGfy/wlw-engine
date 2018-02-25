import "mocha";
import { expect } from "chai";
import fakeState from "./resources/fake-state";
import CoreAccessor from "./accessor";
import CoreKernel from "./kernel";

describe("Accessor", () => {
  const f = fakeState();
  const accessor = new CoreAccessor(f);

  it("should be able to return the active wrestler", () => {
    const active = accessor.getActive();
    expect(active).to.equal(f.players.P1);
  });

  it("should be able to return the first target", () => {
    const target = accessor.getFirstTarget();
    expect(target).to.equal(f.players.CPU1);
  });

  it("should be able to return the targets", () => {
    const targets = accessor.getTargets();
    expect(targets.length).to.equal(1);
    expect(targets).to.eql([f.players.CPU1]);
  });

  it("should be able to return a wrestler by key", () => {
    const wrestler = accessor.getWrestler("P1");
    expect(wrestler).to.equal(f.players.P1);
  });

  it("should be able to return all wrestlers", () => {
    const wrestlers = accessor.getWrestlers();
    expect(wrestlers.length).to.equal(2);
    expect(wrestlers).to.eql([f.players.P1, f.players.CPU1]);
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
    const card = accessor.getCard();
    expect(card).to.equal(f.players.P1.hand[0]);
  });

  it("should be able to return the actuators", () => {
    const kernel = new CoreKernel();
    const a1 = {
      key: "test",
      preOperate: function(a, b) {},
      operate: function(a, b) {},
      postOperate: function(a, b) {}
    };
    const a2 = {
      key: "test2",
      preOperate: function(a, b) {},
      operate: function(a, b) {},
      postOperate: function(a, b) {}
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
});
