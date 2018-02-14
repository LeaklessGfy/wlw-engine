import "mocha";
import { expect } from "chai";
import BaseDistributor from "./base.distributor";
import CoreEngine from "../../engine";
import CoreKernel from "../../kernel";

describe("Base Distributor", () => {
  it("should be able to distribute correctly", () => {
    const wrestler = {};
    const mutable = {};
    const kernel = new CoreKernel();
    const engine = new CoreEngine(kernel);

    BaseDistributor(wrestler, mutable, engine);
  });
});
