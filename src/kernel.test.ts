import "mocha";
import { expect } from "chai";
import Kernel from "./kernel";

const fake1 = class F1 {
  uid = "fake1";
  name = "fake";
  img = "";
  description = "";
  stamina = 0;
  intensity = 0;
  targets = [];
  reverseable = true;
  rarity = "";
  consume(active) {}
  operate(mutable, engine) {}
};
const fake2 = class F2 {
  uid = "fake2";
  name = "fake";
  img = "";
  description = "";
  stamina = 0;
  intensity = 0;
  targets = [];
  reverseable = true;
  rarity = "";
  consume(active) {}
  operate(mutable, engine) {}
};
const fake3 = class F3 {
  uid = "fake3";
  name = "fake";
  img = "";
  description = "";
  stamina = 0;
  intensity = 0;
  targets = [];
  reverseable = true;
  rarity = "";
  consume(active) {}
  operate(mutable, engine) {}
};

describe("Kernel", () => {
  it("should be able to add one card", () => {
    const k = new Kernel();
    k.add({ uid: "fake1", fn: fake1 });
    expect(k.get("fake1").uid).to.equal("fake1");
  });

  it("should be able to add multiple cards", () => {
    const k = new Kernel();
    k.addAll(
      { uid: "fake1", fn: fake1 },
      { uid: "fake2", fn: fake2 },
      { uid: "fake3", fn: fake3 }
    );
    expect(k.get("fake1").uid).to.equal("fake1");
    expect(k.get("fake2").uid).to.equal("fake2");
    expect(k.get("fake3").uid).to.equal("fake3");
  });

  it("should be able to add directly from constructor", () => {
    const k = new Kernel([
      { uid: "fake1", fn: fake1 },
      { uid: "fake2", fn: fake2 },
      { uid: "fake3", fn: fake3 }
    ]);
    expect(k.get("fake1").uid).to.equal("fake1");
    expect(k.get("fake2").uid).to.equal("fake2");
    expect(k.get("fake3").uid).to.equal("fake3");
  });

  it("should be able to construct new object at every call", () => {
    const k = new Kernel();
    k.add({ uid: "fake1", fn: fake1 });
    const A = k.get("fake1");
    const B = k.get("fake2");

    expect(A).to.not.eql(B);
  });
});
