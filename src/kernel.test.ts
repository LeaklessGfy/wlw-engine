import "mocha";
import { expect } from "chai";
import Kernel from "./kernel";

const fake1 = {
  key: "fake1",
  preOperate(m, e) {},
  operate(m, e) {},
  postOperate(m, e) {}
};

const fake2 = {
  key: "fake2",
  preOperate(m, e) {},
  operate(m, e) {},
  postOperate(m, e) {}
};

const fake3 = {
  key: "fake3",
  preOperate(m, e) {},
  operate(m, e) {},
  postOperate(m, e) {}
};

describe("Kernel", () => {
  it("should be able to add one card", () => {
    const k = new Kernel();
    k.add(fake1);
    expect(k.get("fake1").key).to.equal("fake1");
    expect(k.get("fake1")).to.eql(fake1);
    expect(k.get("unknow")).to.equal(null);
  });

  it("should be able to add multiple cards", () => {
    const k = new Kernel();
    k.addAll(fake1, fake2, fake3);
    expect(k.get("fake1").key).to.equal("fake1");
    expect(k.get("fake2").key).to.equal("fake2");
    expect(k.get("fake3").key).to.equal("fake3");
    expect(k.get("fake1")).to.eql(fake1);
    expect(k.get("fake2")).to.eql(fake2);
    expect(k.get("fake3")).to.eql(fake3);
    expect(k.get("unknow")).to.equal(null);
  });

  it("should be able to add directly from constructor", () => {
    const k = new Kernel([fake1, fake2, fake3]);
    expect(k.get("fake1").key).to.equal("fake1");
    expect(k.get("fake2").key).to.equal("fake2");
    expect(k.get("fake3").key).to.equal("fake3");
    expect(k.get("fake1")).to.eql(fake1);
    expect(k.get("fake2")).to.eql(fake2);
    expect(k.get("fake3")).to.eql(fake3);
    expect(k.get("unknow")).to.equal(null);
  });
});
