import "mocha";
import { expect } from "chai";
import Kernel from "../kernel";
import CardAccessor from "./card.accessor";

describe("[ACCESSOR] Card", () => {
  it("should be able to return the uid", () => {});

  it("should be able to return the actuators key", () => {});

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
      rarity: "",
      valid: true
    };

    const accessor = new CardAccessor(c);
    const act = accessor.getActuators(kernel);

    /*
    expect(act.length).to.equal(2);
    expect(act[0]).to.equal(a1);
    expect(act[1]).to.equal(a2);
    */
  });

  it("should be able to return name", () => {});

  it("should be able to return img", () => {});

  it("should be able to return description", () => {});

  it("should be able to return stamina", () => {});

  it("should be able to return intensity", () => {});

  it("should be able to return damage", () => {});

  it("should be able to return effects", () => {});

  it("should be able to return targets", () => {});

  it("should be able to return rarity", () => {});

  it("should be able to say if blockable", () => {});

  it("should be able to say if reverseable", () => {});

  it("should be able to say if valid", () => {});

  it("should be able to return ref", () => {});
});
