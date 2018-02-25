import "mocha";
import { expect } from "chai";
import fakeState from "../resources/fake-state";
import WrestlerService from "./wrestler.service";

describe("[SERVICE] Wrestler", () => {
  it("should be able to apply recovery", () => {
    const w = fakeState().players.P1;
    const service = new WrestlerService();
    service.recovery(w, 1);
  });
});
