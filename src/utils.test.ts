import "mocha";
import { expect } from "chai";
import * as utils from "./utils";

describe("Utils", () => {
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

  it("should be able to min max", () => {
    expect(utils.minMax(0, 10, 5)).to.equal(5);
    expect(utils.minMax(0, 10, -1)).to.equal(0);
    expect(utils.minMax(0, 10, 15)).to.equal(10);
  });

  it("should be able to say if key is interactive", () => {
    expect(utils.isInteractive("P1")).to.equal(true);
    expect(utils.isInteractive("CPU1")).to.equal(false);
  });
});
