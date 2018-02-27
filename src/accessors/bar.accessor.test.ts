import "mocha";
import { expect } from "chai";
import BarAccessor from "./bar.accessor";

describe("[ACCESSOR] Bar", () => {
  it("should be able to return val", () => {
    const bar = { val: 5, max: 10 };
    const accessor = new BarAccessor(bar);

    expect(accessor.getVal()).to.equal(bar.val);
    bar.val = 12;
    expect(accessor.getVal()).to.equal(bar.val);
  });

  it("should be able to return max", () => {
    const bar = { val: 5, max: 10 };
    const accessor = new BarAccessor(bar);

    expect(accessor.getMax()).to.equal(bar.max);
    bar.max = 6;
    expect(accessor.getMax()).to.equal(bar.max);
  });

  it("should be able to set val", () => {
    const bar = { val: 5, max: 10 };
    const accessor = new BarAccessor(bar);

    accessor.setVal(6);
    expect(accessor.getVal()).to.equal(6);
    expect(bar.val).to.equal(6);

    accessor.setVal(bar.max + 1);
    expect(accessor.getVal()).to.equal(bar.max);
    expect(bar.val).to.equal(bar.max);

    accessor.setVal(-15);
    expect(accessor.getVal()).to.equal(0);
    expect(bar.val).to.equal(0);
  });

  it("should be able to set max", () => {
    const bar = { val: 5, max: 10 };
    const accessor = new BarAccessor(bar);

    accessor.setMax(20);
    expect(accessor.getMax()).to.equal(20);
    expect(bar.max).to.equal(20);

    accessor.setMax(0);
    expect(accessor.getMax()).to.equal(1);
    expect(bar.max).to.equal(1);
  });

  it("should be able to add val", () => {
    const bar = { val: 5, max: 10 };
    const accessor = new BarAccessor(bar);

    accessor.addVal(2);
    expect(accessor.getVal()).to.equal(7);
    expect(bar.val).to.equal(7);

    accessor.addVal(6);
    expect(accessor.getVal()).to.equal(bar.max);
    expect(bar.val).to.equal(bar.max);

    accessor.addVal(-15);
    expect(accessor.getVal()).to.equal(0);
    expect(bar.val).to.equal(0);
  });

  it("should be able to add max", () => {
    const bar = { val: 5, max: 10 };
    const accessor = new BarAccessor(bar);

    accessor.addMax(10);
    expect(accessor.getMax()).to.equal(20);
    expect(bar.max).to.equal(20);

    accessor.addMax(-25);
    expect(accessor.getMax()).to.equal(1);
    expect(bar.max).to.equal(1);
  });
});
