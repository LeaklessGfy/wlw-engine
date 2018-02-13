import "mocha";
import { expect } from "chai";
import Kernel from "./kernel";

const fake1 = {};
const fake2 = {};
const fake3 = {};

describe("Kernel", () => {
  it("should be able to add one card", () => {
    const k = new Kernel();
    k.add(fake1);
    expect(k.get("fake1")).to.equal(fake1);
  });

  it("should be able to add multiple cards", () => {
    const k = new Kernel();
    k.addAll(fake1, fake2, fake3);
    expect(k.get("fake1")).to.equal(fake1);
    expect(k.get("fake2")).to.equal(fake2);
    expect(k.get("fake3")).to.equal(fake3);
  });

  it("should be able to add directly from constructor", () => {
    const k = new Kernel([fake1, fake2, fake3]);
    expect(k.get("fake1")).to.equal(fake1);
    expect(k.get("fake2")).to.equal(fake2);
    expect(k.get("fake3")).to.equal(fake3);
  });
});
