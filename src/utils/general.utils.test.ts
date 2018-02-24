import "mocha";
import { expect } from "chai";
import * as utils from "./general.utils";

describe("General Utils", () => {
  it("should be able to clone", () => {
    const A = { a: 0, b: 0, c: 1, d: { a: 0 } };
    const B = utils.clone(A);

    expect(A).to.eql(B);
    expect(A).to.not.equal(B);
    expect(A.d).to.eql(B.d);
    expect(A.d).to.not.equal(B.d);
  });

  it("should be able to freeze", () => {
    const A = { a: 0, b: 0 };
    const B = utils.freeze(A);

    expect(A).to.eql(B);
  });

  it("should be able to generate a random bool", () => {
    expect(utils.randomBool(100)).to.equal(true);
    expect(utils.randomBool(0)).to.equal(false);
  });

  it("should be able to generate a random int", () => {
    expect(utils.randomInt(0, 0)).to.equal(0);
    expect(utils.randomInt(100, 100)).to.equal(100);
    expect(utils.randomInt(0, 10))
      .to.be.greaterThan(-1)
      .and.lessThan(11);
  });
});