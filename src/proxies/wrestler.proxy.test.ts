import "mocha";
import { expect } from "chai";
import fakeState from "../resources/fake-state";
import CardProxy from "./card.proxy";
import WrestlerProxy from "./wrestler.proxy";

describe("[PROXY] Wrestler", () => {
  it("should be able to return uid", () => {
    const w = fakeState().players.P1;
    const proxy = new WrestlerProxy(w);
    expect(proxy.getUid()).to.equal(w.uid);
    w.uid = "test";
    expect(proxy.getUid()).to.equal(w.uid);
  });

  it("should be able to return name", () => {
    const w = fakeState().players.P1;
    const proxy = new WrestlerProxy(w);
    expect(proxy.getName()).to.equal(w.name);
    w.name = "test";
    expect(proxy.getName()).to.equal(w.name);
  });

  it("should be able to return img", () => {
    const w = fakeState().players.P1;
    const proxy = new WrestlerProxy(w);
    expect(proxy.getImg()).to.equal(w.img);
    w.img = "test";
    expect(proxy.getImg()).to.equal(w.img);
  });

  it("should be able to return gender", () => {
    const w = fakeState().players.P1;
    const proxy = new WrestlerProxy(w);
    expect(proxy.getGender()).to.equal(w.gender);
    w.gender = 12;
    expect(proxy.getGender()).to.equal(w.gender);
  });

  it("should be able to return category", () => {
    const w = fakeState().players.P1;
    const proxy = new WrestlerProxy(w);
    expect(proxy.getCategory()).to.equal(w.category);
    w.category = 12;
    expect(proxy.getCategory()).to.equal(w.category);
  });

  it("should be able to return health", () => {
    const w = fakeState().players.P1;
    const proxy = new WrestlerProxy(w);
    expect(proxy.getHealth().getVal()).to.equal(w.health.val);
    w.health.val = 12;
    expect(proxy.getHealth().getVal()).to.equal(w.health.val);
    expect(proxy.getHealth().getMax()).to.equal(w.health.max);
    w.health.max = 12;
    expect(proxy.getHealth().getMax()).to.equal(w.health.max);
  });

  it("should be able to return stamina", () => {
    const w = fakeState().players.P1;
    const proxy = new WrestlerProxy(w);
    expect(proxy.getStamina().getVal()).to.equal(w.stamina.val);
    w.stamina.val = 12;
    expect(proxy.getStamina().getVal()).to.equal(w.stamina.val);
    expect(proxy.getStamina().getMax()).to.equal(w.stamina.max);
    w.stamina.max = 12;
    expect(proxy.getStamina().getMax()).to.equal(w.stamina.max);
  });

  it("should be able to return intensity", () => {
    const w = fakeState().players.P1;
    const proxy = new WrestlerProxy(w);
    expect(proxy.getIntensity().getVal()).to.equal(w.intensity.val);
    w.intensity.val = 12;
    expect(proxy.getIntensity().getVal()).to.equal(w.intensity.val);
    expect(proxy.getIntensity().getMax()).to.equal(w.intensity.max);
    w.intensity.max = 12;
    expect(proxy.getIntensity().getMax()).to.equal(w.intensity.max);
  });

  it("should be able to return deck", () => {});
  it("should be able to return hand", () => {});
  it("should be able to return dead", () => {});

  it("should be able to return status", () => {
    const w = fakeState().players.P1;
    const proxy = new WrestlerProxy(w);
    expect(proxy.getStatus()).to.equal(w.status);
    w.status.push(12);
    expect(proxy.getStatus()).to.equal(w.status);
  });

  it("should be able to return combat", () => {});

  it("should be able to shuffle deck", () => {
    const w = fakeState().players.P1;
    const cards = [...w.deck];

    const proxy = new WrestlerProxy(w);
    proxy.shuffleDeck();

    expect(w.deck).to.not.equal(cards);
  });

  it("should be able to say if should respawn deck", () => {
    const w = fakeState().players.P1;
    const proxy = new WrestlerProxy(w);
    expect(proxy.shouldRespawnDeck()).to.equal(false);
    w.deck = [];
    expect(proxy.shouldRespawnDeck()).to.equal(true);
  });

  it("should be able to respawn deck", () => {
    const w = fakeState().players.P1;
    w.dead = w.deck;
    w.deck = [];
    const length = w.dead.length;

    const proxy = new WrestlerProxy(w);
    proxy.respawnDeck();

    expect(w.deck.length).to.equal(length);
    expect(w.dead.length).to.equal(0);
  });

  it("should be able to discard hand", () => {});

  it("should be able to distribute hand", () => {
    const w = fakeState().players.P1;

    const proxy = new WrestlerProxy(w);
    proxy.distributeHand(3);

    expect(w.hand.length).to.equal(3);
  });

  it("should be able to validate hand", () => {
    const w = fakeState().players.P1;
    w.hand = w.deck;

    const proxy = new WrestlerProxy(w);
    proxy.validateHand();

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
      rarity: 0,
      valid: true
    };

    const proxy = new WrestlerProxy(w);
    proxy.consumeCard(new CardProxy(c));

    expect(w.stamina.val).to.equal(5);
    expect(w.intensity.val).to.equal(2);
  });

  it("should be able to discard card", () => {});

  it("should be able to apply recovery", () => {
    const w = fakeState().players.P1;
    const proxy = new WrestlerProxy(w);
    proxy.recovery(1);
  });
});
