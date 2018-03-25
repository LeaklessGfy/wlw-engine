import "mocha";
import { expect } from "chai";
import fakeState from "../fake-state";
import TimewrapActuator from "./timewrap.actuator";
import StateProxy from "proxies/state.proxy";

describe("[ACTUATOR] Timewrap", () => {
  it("should be able to operate", () => {
    const f = fakeState();
    f.next = ["P1", "CPU1"];

    const s = new StateProxy(f);
    const a = new TimewrapActuator();

    a.operate(s.getCard(), s.getFirstTarget(), s.getActive(), s);

    expect(f.next).to.eql(["P1", "P1", "CPU1"]);
  });
});
