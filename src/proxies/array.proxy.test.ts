import "mocha";
import { expect } from "chai";
import ArrayProxy from "./array.proxy";

describe("[PROXY] Array", () => {
  it("should be able to get", () => {
    const arr = [0, 1, 2, 3];
    const proxy = new ArrayProxy<string>(arr, v => v.toString());
    expect(proxy.get(0)).to.equal(arr[0].toString());
    expect(proxy.get(1)).to.equal(arr[1].toString());
    arr.push(4);
    expect(proxy.get(4)).to.equal(arr[4].toString());
  });

  it("should be able to get first", () => {
    const arr = [0, 1, 2, 3];
    const proxy = new ArrayProxy<string>(arr, v => v.toString());

    expect(proxy.getFirst()).to.equal("0");
    expect(proxy.getFirst()).to.equal(arr[0].toString());
    arr.unshift(-1);
    expect(proxy.getFirst()).to.equal("-1");
    expect(proxy.getFirst()).to.equal(arr[0].toString());

    const arr2 = [];
    const proxy2 = new ArrayProxy<number>(arr2, v => v);

    expect(proxy2.getFirst()).to.equal(null);
  });

  it("should be able to get last", () => {
    const arr = [0, 1, 2, 3];
    const proxy = new ArrayProxy<string>(arr, v => v.toString());

    expect(proxy.getLast()).to.equal("3");
    expect(proxy.getLast()).to.equal(arr[3].toString());
    arr.push(4);
    expect(proxy.getLast()).to.equal("4");
    expect(proxy.getLast()).to.equal(arr[4].toString());

    const arr2 = [];
    const proxy2 = new ArrayProxy<number>(arr2, v => v);

    expect(proxy2.getLast()).to.equal(null);
  });

  it("should be able to get ref", () => {
    const arr = [0, 1, 2, 3];
    const proxy = new ArrayProxy<string>(arr, v => v.toString());
    expect(proxy.getRef()).to.equal(arr);
  });

  it("should be able to for each", () => {
    const arr = [0, 1, 2, 3];
    const proxy = new ArrayProxy<string>(arr, v => v.toString());
    let base = "";
    proxy.forEach(v => (base = base + v));
    expect(base).to.equal("0123");
  });
});
