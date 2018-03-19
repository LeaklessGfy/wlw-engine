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

  it("should be able to apply recovery", () => {
    const w = fakeState().players.P1;
    const proxy = new WrestlerProxy(w);
    proxy.recovery(1);
  });
});
