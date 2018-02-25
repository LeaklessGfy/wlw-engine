import "mocha";
import { expect } from "chai";
import fakeState from "../resources/fake-state";
import CardService from "./card.service";

describe("[SERVICE] Card", () => {
  const service = new CardService();

  it("should be able to shuffle deck", () => {
    const w = fakeState().players.P1;
    const cards = w.deck;

    service.shuffleDeck(w);
    expect(w.deck).to.not.equal(cards);
  });

  it("should be able to respawn deck", () => {
    const w = fakeState().players.P1;
    w.dead = w.deck;
    w.deck = [];
    const length = w.dead.length;

    service.respawnDeck(w);
    expect(w.deck.length).to.equal(length);
    expect(w.dead.length).to.equal(0);
  });

  it("should be able to discard hand", () => {});

  it("should be able to distribute hand", () => {
    const w = fakeState().players.P1;
    service.distributeHand(w, 3);
    expect(w.hand.length).to.equal(3);
  });

  it("should be able to validate hand", () => {
    const w = fakeState().players.P1;
    w.hand = w.deck;
    service.validateHand(w);
    expect(w.hand[0].valid).to.equal(true);
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

    service.consumeCard(w, c);

    expect(w.stamina.val).to.equal(5);
    expect(w.intensity.val).to.equal(2);
  });

  it("should be able to operate card", () => {});

  it("should be able to effect card", () => {});

  it("should be able to discard card", () => {});

  it("should be able to return a random valid card", () => {});
});
