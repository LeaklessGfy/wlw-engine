import "mocha";
import { expect } from "chai";
import fakeState from "../fake-state";
import CoreAccessor from "../../accessor";
import DamageActuactor from "./damage.actuator";

describe("[ACTUATOR] Damage", () => {
  it("should be able to operate correctly", () => {
    const f = fakeState();
    const mutable = fakeState();
    mutable.players.P1.hand = mutable.players.P1.deck;
    mutable.card = 0;

    const accessor = new CoreAccessor(mutable);
    const actuator = new DamageActuactor();

    actuator.operate(mutable, accessor);

    const card = accessor.getCard();
    expect(accessor.getFirstTarget().health.val).to.be.lessThan(
      f.players.CPU1.health.val
    );
  });
});
