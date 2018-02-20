import "mocha";
import { expect } from "chai";
import BaseDistributor from "./base.distributor";
import CoreEngine from "../../engine";
import CoreKernel from "../../kernel";
import FakeState from "../fake-state";
import Ddt from "../cards/banals/ddt.card";

describe("Base Distributor", () => {
  it("should be able to distribute correctly", () => {
    const kernel = new CoreKernel([{ uid: "ddt", fn: Ddt }]);
    const engine = new CoreEngine(kernel);
    const mutable = engine.clone(FakeState);

    BaseDistributor(mutable.players.P1, mutable, engine);

    expect(mutable.players.P1.hand.length).to.equal(5);
  });
});
