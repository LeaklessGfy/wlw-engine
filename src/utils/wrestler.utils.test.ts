import "mocha";
import { expect } from "chai";
import * as utils from "./wrestler.utils";
import FakeState from "../resources/fake-state";

describe("Wrestler Utils", () => {
  it("should be able to apply recovery", () => {
    const w = new FakeState().players.P1;
    utils.applyRecovery(w, 1);
  });
});
