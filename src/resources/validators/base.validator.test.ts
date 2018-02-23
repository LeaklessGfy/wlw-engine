import "mocha";
import { expect } from "chai";
import BaseValidator from "./base.validator";
import CoreKernel from "../../kernel";
import CoreEngine from "../../engine";
import { getActiveCard } from "../../utils/state.utils";
import FakeState from "../fake-state";

describe("Base Validator", () => {
  it("should be able to validate correctly", () => {
    const kernel = new CoreKernel();
    const engine = new CoreEngine(kernel);
    const mutable = new FakeState();
    mutable.players.P1.hand = mutable.players.P1.cards;
    const card = getActiveCard(mutable);

    BaseValidator(card, mutable, engine);

    expect(card.valid).to.equal(true);
  });
});
