import "mocha";
import { expect } from "chai";
import fakeState from "../resources/fake-state";
import StateService from "./state.service";

describe("[SERVICE] State", () => {
  it("should be able to generate next", () => {
    const f = fakeState();
    f.next = [];

    const service = new StateService();
    service.next(f);

    expect(f.next.length).to.equal(2);
  });

  it("should be able to clean state", () => {
    const f = fakeState();
    f.card = 0;
    f.targets = ["SMTH", "JOHN"];

    const service = new StateService();
    service.clean(f);

    expect(f.card).to.equal(null);
    expect(f.targets.length).to.equal(0);
  });
});
