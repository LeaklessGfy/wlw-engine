import "mocha";
import { expect } from "chai";
import * as utils from "./wrestler.utils";
import fakeState from "../resources/fake-state";

describe("Wrestler Utils", () => {
  it("should be able to apply recovery", () => {
    const w = fakeState().players.P1;
    utils.applyRecovery(w, 1);
  });

  it("should be able to say if key is interactive", () => {
    expect(utils.isInteractive("P1")).to.equal(true);
    expect(utils.isInteractive("CPU1")).to.equal(false);
  });
});
