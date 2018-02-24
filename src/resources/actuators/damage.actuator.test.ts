import "mocha";
import { expect } from "chai";
import CoreKernel from "../../kernel";
import CoreEngine from "../../engine";
import DamageActuactor from "./damage.actuator";
import fakeState from "../fake-state";
import { getActiveCard, getFirstTarget } from "../../utils/state.utils";

describe("[ACTUATOR] Damage", () => {
  it("should be able to operate correctly", () => {
    const kernel = new CoreKernel();
    const engine = new CoreEngine(kernel);
    const actuator = new DamageActuactor();
    const f = fakeState();
    const mutable = fakeState();
    mutable.players.P1.hand = mutable.players.P1.deck;
    mutable.card = 0;

    actuator.operate(mutable, engine);

    const card = getActiveCard(mutable);
    expect(getFirstTarget(mutable).health.val).to.equal(getFirstTarget(f).health.val - card.damage);
  });
});
