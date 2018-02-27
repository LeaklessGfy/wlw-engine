import "mocha";
import { expect } from "chai";
import ArrayAccessor from "./array.accessor";

describe("[ACCESSOR] Array", () => {
  it("should be able to get", () => {
    const arr = [0, 1, 2, 3];
    const accessor = new ArrayAccessor<string, number>(arr, v => v.toString());
    expect(accessor.get(0)).to.equal(arr[0].toString());
    expect(accessor.get(1)).to.equal(arr[1].toString());
    arr.push(4);
    expect(accessor.get(4)).to.equal(arr[4].toString());
  });

  it("should be able to get first", () => {
    const arr = [0, 1, 2, 3];
    const accessor = new ArrayAccessor<string, number>(arr, v => v.toString());

    expect(accessor.getFirst()).to.equal("0");
    expect(accessor.getFirst()).to.equal(arr[0].toString());
    arr.unshift(-1);
    expect(accessor.getFirst()).to.equal("-1");
    expect(accessor.getFirst()).to.equal(arr[0].toString());

    const arr2 = [];
    const accessor2 = new ArrayAccessor<number, number>(arr2, v => v);

    expect(accessor2.getFirst()).to.equal(null);
  });

  it("should be able to get last", () => {
    const arr = [0, 1, 2, 3];
    const accessor = new ArrayAccessor<string, number>(arr, v => v.toString());

    expect(accessor.getLast()).to.equal("3");
    expect(accessor.getLast()).to.equal(arr[3].toString());
    arr.push(4);
    expect(accessor.getLast()).to.equal("4");
    expect(accessor.getLast()).to.equal(arr[4].toString());

    const arr2 = [];
    const accessor2 = new ArrayAccessor<number, number>(arr2, v => v);

    expect(accessor2.getLast()).to.equal(null);
  });

  it("should be able to get ref", () => {
    const arr = [0, 1, 2, 3];
    const accessor = new ArrayAccessor<string, number>(arr, v => v.toString());
    expect(accessor.getRef()).to.equal(arr);
  });

  it("should be able to shift", () => {
    const arr = [0, 1, 2, 3];
    const accessor = new ArrayAccessor<string, number>(arr, v => v.toString());
    expect(accessor.shift()).to.equal("0");
    expect(accessor.shift()).to.equal("1");
    expect(arr.length).to.equal(2);
  });

  it("should be able to unshift", () => {
    const arr = [0, 1, 2, 3];
    const accessor = new ArrayAccessor<string, number>(arr, v => v.toString());
    expect(accessor.length()).to.equal(4);
    expect(accessor.unshift(-1)).to.equal(accessor);
    expect(accessor.getFirst()).to.equal("-1");
    expect(arr[0]).to.equal(-1);
    expect(accessor.length()).to.equal(5);
  });

  it("should be able to length", () => {
    const arr = [0, 1, 2, 3];
    const accessor = new ArrayAccessor<string, number>(arr, v => v.toString());
    expect(accessor.length()).to.equal(4);
    arr.push(4);
    expect(accessor.length()).to.equal(5);
  });

  it("should be able to for each", () => {
    const arr = [0, 1, 2, 3];
    const accessor = new ArrayAccessor<string, number>(arr, v => v.toString());
    let base = "";
    accessor.forEach(v => (base = base + v));
    expect(base).to.equal("0123");
  });
});
