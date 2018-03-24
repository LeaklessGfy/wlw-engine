import "mocha";
import { expect } from "chai";
import fakeState from "../fake-state";
import DamageActuator from "./damage.actuator";
import StateProxy from "proxies/state.proxy";

describe("[ACTUATOR] Damage", () => {
  it("should be able to operate", () => {
    const f = fakeState();
    const mutable = fakeState();
    mutable.players.P1.hand = mutable.players.P1.deck;
    mutable.card = 0;

    const proxy = new StateProxy(mutable);
    const actuator = new DamageActuator();

    actuator.operate(
      proxy.getCard(),
      proxy.getFirstTarget(),
      proxy.getActive(),
      proxy
    );

    expect(
      proxy
        .getFirstTarget()
        .getHealth()
        .getVal()
    ).to.be.lessThan(f.players.CPU1.health.val);
    expect(proxy.getFirstTarget().getUid()).to.equal(mutable.players.CPU1.uid);
  });
});
