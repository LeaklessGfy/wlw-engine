import "mocha";
import { expect } from "chai";
import fakeState from "../fake-state";
import PinActuator from "./pin.actuator";
import StateProxy from "proxies/state.proxy";

describe("[ACTUATOR] Pin", () => {
  it("should be able to operate", () => {
    const f = fakeState();
    const s = new StateProxy(f);
    const a = new PinActuator();

    f.players.CPU1.health.val = 10;
    f.players.CPU1.status = [10];

    a.operate(s.getCard(), s.getFirstTarget(), s.getActive(), s);

    expect(f.players.CPU1.health.val).to.equal(0);
  });
});
