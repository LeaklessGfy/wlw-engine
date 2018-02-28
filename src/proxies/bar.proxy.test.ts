import "mocha";
import { expect } from "chai";
import BarProxy from "./bar.proxy";

describe("[PROXY] Bar", () => {
  it("should be able to return val", () => {
    const bar = { val: 5, max: 10 };
    const proxy = new BarProxy(bar);

    expect(proxy.getVal()).to.equal(bar.val);
    bar.val = 12;
    expect(proxy.getVal()).to.equal(bar.val);
  });

  it("should be able to return max", () => {
    const bar = { val: 5, max: 10 };
    const proxy = new BarProxy(bar);

    expect(proxy.getMax()).to.equal(bar.max);
    bar.max = 6;
    expect(proxy.getMax()).to.equal(bar.max);
  });

  it("should be able to set val", () => {
    const bar = { val: 5, max: 10 };
    const proxy = new BarProxy(bar);

    proxy.setVal(6);
    expect(proxy.getVal()).to.equal(6);
    expect(bar.val).to.equal(6);

    proxy.setVal(bar.max + 1);
    expect(proxy.getVal()).to.equal(bar.max);
    expect(bar.val).to.equal(bar.max);

    proxy.setVal(-15);
    expect(proxy.getVal()).to.equal(0);
    expect(bar.val).to.equal(0);
  });

  it("should be able to set max", () => {
    const bar = { val: 5, max: 10 };
    const proxy = new BarProxy(bar);

    proxy.setMax(20);
    expect(proxy.getMax()).to.equal(20);
    expect(bar.max).to.equal(20);

    proxy.setMax(0);
    expect(proxy.getMax()).to.equal(1);
    expect(bar.max).to.equal(1);
  });

  it("should be able to add val", () => {
    const bar = { val: 5, max: 10 };
    const proxy = new BarProxy(bar);

    proxy.addVal(2);
    expect(proxy.getVal()).to.equal(7);
    expect(bar.val).to.equal(7);

    proxy.addVal(6);
    expect(proxy.getVal()).to.equal(bar.max);
    expect(bar.val).to.equal(bar.max);

    proxy.addVal(-15);
    expect(proxy.getVal()).to.equal(0);
    expect(bar.val).to.equal(0);
  });

  it("should be able to add max", () => {
    const bar = { val: 5, max: 10 };
    const proxy = new BarProxy(bar);

    proxy.addMax(10);
    expect(proxy.getMax()).to.equal(20);
    expect(bar.max).to.equal(20);

    proxy.addMax(-25);
    expect(proxy.getMax()).to.equal(1);
    expect(bar.max).to.equal(1);
  });
});
