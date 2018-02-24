import "mocha";
import { expect } from "chai";
import * as utils from "./state.utils";
import fakeState from "../resources/fake-state";

describe("State Utils", () => {
  const F = fakeState();

  it("should be able to deliver initial state", () => {
    const state = utils.getInitialState();
  });

  it("should be able to return the active wrestler", () => {
    const active = utils.getActive(F);
    expect(active).to.eql(F.players.P1);
  });

  it("should be able to return the first target", () => {
    const target = utils.getFirstTarget(F);
    expect(target).to.eql(F.players.CPU1);
  });

  it("should be able to return the targets", () => {
    const targets = utils.getTargets(F);
    expect(targets.length).to.equal(1);
    expect(targets).to.eql([F.players.CPU1]);
  });

  it("should be able to return all wrestlers", () => {
    const wrestlers = utils.getWrestlers(F);
    expect(wrestlers.length).to.equal(2);
    expect(wrestlers).eql([F.players.P1, F.players.CPU1]);
  });

  it("should be able to generate next", () => {
    const state = fakeState();
    state.next = [];
    utils.generateNext(state);

    expect(state.next.length).to.be.greaterThan(1);
  });

  it("should be able to clean state", () => {
    const state = utils.getInitialState();
    state.card = 0;
    state.targets = ["SMTH", "JOHN"];

    utils.cleanState(state);

    expect(state.card).to.equal(null);
    expect(state.targets.length).to.equal(0);
  });
});
