import "mocha";
import { expect } from "chai";
import BaseValidator from "./base.validator";
import CoreKernel from "../../kernel";
import CoreEngine from "../../engine";
import getFakeState from "../fake-state";

describe("Base Validator", () => {
  it("should be able to validate correctly", () => {
    const kernel = new CoreKernel();
    const engine = new CoreEngine(kernel);
    const mutable = getFakeState();

    BaseValidator(mutable.card, mutable, engine);

    expect(mutable.card.valid).to.equal(true);
  });
});
