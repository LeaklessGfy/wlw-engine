import "mocha";
import { expect } from "chai";
import fakeState from "../fake-state";
import DamageActuactor from "./damage.actuator";
import Accessor from "../../accessors/accessor";

describe("[ACTUATOR] Damage", () => {
  it("should be able to operate correctly", () => {
    const f = fakeState();
    const mutable = fakeState();
    mutable.players.P1.hand = mutable.players.P1.deck;
    mutable.card = 0;

    const accessor = new Accessor(mutable);
    const actuator = new DamageActuactor();

    actuator.operate(accessor);

    const card = accessor.getCard();
    expect(
      accessor
        .getFirstTarget()
        .getHealth()
        .getVal()
    ).to.be.lessThan(f.players.CPU1.health.val);
    expect(accessor.getFirstTarget().getUid()).to.equal(
      mutable.players.CPU1.uid
    );
  });
});
