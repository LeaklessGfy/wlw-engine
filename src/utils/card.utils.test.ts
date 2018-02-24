import "mocha";
import { expect } from "chai";
import * as utils from "./card.utils";
import CoreKernel from "../kernel";
import fakeState from "../resources/fake-state";

describe("Card Utils", () => {
  it("should be able to shuffle deck", () => {
    const w = fakeState().players.P1;
    const cards = w.deck;
    utils.shuffleDeck(w);
    expect(w.deck).to.not.equal(cards);
  });

  it("should be able to distribute hand", () => {
    const w = fakeState().players.P1;
    utils.distributeHand(w);
    expect(w.hand.length).to.equal(1);
  });

  it("should be able to consume card", () => {
    const w = fakeState().players.P1;
    w.stamina.val = 7;
    w.intensity.val = 3;
    const c = {
      uid: "",
      actuators: [],
      name: "",
      img: "",
      description: "",
      stamina: 2,
      intensity: 1,
      targets: [],
      reverseable: true,
      rarity: "",
      valid: true
    };

    utils.consumeCard(w, c);

    expect(w.stamina.val).to.equal(5);
    expect(w.intensity.val).to.equal(2);
  });

  it("should be able to get actuators", () => {
    const kernel = new CoreKernel();
    const a1 = {
      key: "test",
      preOperate: function(a, b) {},
      operate: function(a, b) {},
      postOperate: function(a, b) {}
    };
    const a2 = {
      key: "test2",
      preOperate: function(a, b) {},
      operate: function(a, b) {},
      postOperate: function(a, b) {}
    };
    kernel.addAll(a1, a2);
    const c = {
      uid: "",
      actuators: ["test", "test2"],
      name: "",
      img: "",
      description: "",
      stamina: 2,
      intensity: 1,
      targets: [],
      reverseable: true,
      rarity: "",
      valid: true
    };

    const act = utils.getActuators(c, kernel);
    expect(act.length).to.equal(2);
    expect(act[0]).to.equal(a1);
    expect(act[1]).to.equal(a2);
  });

  it("should be able to apply effects", () => {});

  it("should be able to discard card", () => {});

  it("should be able to return a random valid card", () => {
    const w = fakeState().players.P1;
    const c = {
      uid: "",
      actuators: ["test", "test2"],
      name: "",
      img: "",
      description: "",
      stamina: 2,
      intensity: 1,
      targets: [],
      reverseable: true,
      rarity: "",
      valid: true
    };
    w.hand = [c];

    const card = utils.randomValidCard(w);

    expect(w.hand.length).to.equal(1);
    expect(card).to.equal(c);
  });
});
