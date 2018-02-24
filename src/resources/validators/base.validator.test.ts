import "mocha";
import { expect } from "chai";
import BaseValidator from "./base.validator";
import { getActiveCard } from "../../utils/state.utils";
import fakeState from "../fake-state";

describe("[VALIDATOR] Base", () => {
  it("should be able to validate correctly", () => {
    const mutable = fakeState();
    mutable.players.P1.hand = mutable.players.P1.deck;
    mutable.card = 0;
    const card = getActiveCard(mutable);

    BaseValidator(card, mutable);

    expect(card.valid).to.equal(true);
  });
});
