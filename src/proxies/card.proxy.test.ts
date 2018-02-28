import "mocha";
import { expect } from "chai";
import Kernel from "../kernel";
import CardProxy from "./card.proxy";
import Ddt from "../resources/cards/banals/ddt.card";

describe("[PROXY] Card", () => {
  it("should be able to return the uid", () => {
    const c = new Ddt();
    const proxy = new CardProxy(c);
    expect(proxy.getUid()).to.equal(c.uid);
    c.uid = "test";
    expect(proxy.getUid()).to.equal(c.uid);
  });

  it("should be able to return the actuators key", () => {
    const c = new Ddt();
    const proxy = new CardProxy(c);
    expect(proxy.getActuatorsKey()).to.eql(["damage"]);
    c.actuators = ["test"];
    expect(proxy.getActuatorsKey()).to.eql(["test"]);
  });

  it("should be able to return the actuators", () => {
    const kernel = new Kernel();
    const a1 = {
      key: "test",
      operate: function(a) {}
    };
    const a2 = {
      key: "test2",
      operate: function(a) {}
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
      rarity: 0,
      valid: true
    };

    const proxy = new CardProxy(c);
    const act = proxy.getActuators(kernel);

    /*
    expect(act.length).to.equal(2);
    expect(act[0]).to.equal(a1);
    expect(act[1]).to.equal(a2);
    */
  });

  it("should be able to return name", () => {
    const c = new Ddt();
    const proxy = new CardProxy(c);
    expect(proxy.getName()).to.equal(c.name);
    c.name = "test";
    expect(proxy.getName()).to.equal(c.name);
  });

  it("should be able to return img", () => {
    const c = new Ddt();
    const proxy = new CardProxy(c);
    expect(proxy.getImg()).to.equal(c.img);
    c.img = "test";
    expect(proxy.getImg()).to.equal(c.img);
  });

  it("should be able to return description", () => {
    const c = new Ddt();
    const proxy = new CardProxy(c);
    expect(proxy.getDescription()).to.equal(c.description);
    c.description = "test";
    expect(proxy.getDescription()).to.equal(c.description);
  });

  it("should be able to return stamina", () => {
    const c = new Ddt();
    const proxy = new CardProxy(c);
    expect(proxy.getStamina()).to.equal(c.stamina);
    c.stamina = 15;
    expect(proxy.getStamina()).to.equal(c.stamina);
  });

  it("should be able to return intensity", () => {
    const c = new Ddt();
    const proxy = new CardProxy(c);
    expect(proxy.getIntensity()).to.equal(c.intensity);
    c.intensity = 16;
    expect(proxy.getIntensity()).to.equal(c.intensity);
  });

  it("should be able to return damage", () => {
    const c = new Ddt();
    const proxy = new CardProxy(c);
    expect(proxy.getDamage()).to.equal(c.damage);
    c.damage = 19;
    expect(proxy.getDamage()).to.equal(c.damage);
  });

  it("should be able to return effects", () => {});

  it("should be able to return targets", () => {
    const c = new Ddt();
    const proxy = new CardProxy(c);
    expect(proxy.getTargets()).to.equal(c.targets);
    c.targets = [0, 1];
    expect(proxy.getTargets()).to.eql([0, 1]);
  });

  it("should be able to return rarity", () => {
    const c = new Ddt();
    const proxy = new CardProxy(c);
    expect(proxy.getRarity()).to.equal(c.rarity);
    c.rarity = 11;
    expect(proxy.getRarity()).to.equal(c.rarity);
  });

  it("should be able to say if blockable", () => {
    const c = new Ddt();
    const proxy = new CardProxy(c);
    expect(proxy.isBlockable()).to.equal(c.blockable);
    c.blockable = false;
    expect(proxy.isBlockable()).to.equal(false);
  });

  it("should be able to say if reverseable", () => {
    const c = new Ddt();
    const proxy = new CardProxy(c);
    expect(proxy.isReverseable()).to.equal(c.reverseable);
    c.reverseable = false;
    expect(proxy.isReverseable()).to.equal(false);
  });

  it("should be able to say if valid", () => {
    const c = new Ddt();
    const proxy = new CardProxy(c);
    expect(proxy.isValid()).to.equal(undefined);
    c.valid = true;
    expect(proxy.isValid()).to.equal(c.valid);
  });

  it("should be able to return ref", () => {
    const c = new Ddt();
    const proxy = new CardProxy(c);
    expect(proxy.getRef()).to.equal(c);
  });
});
