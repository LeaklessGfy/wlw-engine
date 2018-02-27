import "mocha";
import { expect } from "chai";
import CombatAccessor from "./combat.accessor";

describe("[ACCESSOR] Combat", () => {
  it("should be able to return accuracy", () => {
    const c = {
      accuracy: 0,
      damage: 1,
      speed: 2,
      crit: 3,
      dodge: 4,
      agility: 5,
      recovery: 6,
      submission: 7
    };
    const accessor = new CombatAccessor(c);
    expect(accessor.getAccuracy()).to.equal(c.accuracy);
    c.accuracy += 10;
    expect(accessor.getAccuracy()).to.equal(c.accuracy);
  });

  it("should be able to return damage", () => {
    const c = {
      accuracy: 0,
      damage: 1,
      speed: 2,
      crit: 3,
      dodge: 4,
      agility: 5,
      recovery: 6,
      submission: 7
    };
    const accessor = new CombatAccessor(c);
    expect(accessor.getDamage()).to.equal(c.damage);
    c.damage += 10;
    expect(accessor.getDamage()).to.equal(c.damage);
  });

  it("should be able to return speed", () => {
    const c = {
      accuracy: 0,
      damage: 1,
      speed: 2,
      crit: 3,
      dodge: 4,
      agility: 5,
      recovery: 6,
      submission: 7
    };
    const accessor = new CombatAccessor(c);
    expect(accessor.getSpeed()).to.equal(c.speed);
    c.speed += 10;
    expect(accessor.getSpeed()).to.equal(c.speed);
  });

  it("should be able to return crit", () => {
    const c = {
      accuracy: 0,
      damage: 1,
      speed: 2,
      crit: 3,
      dodge: 4,
      agility: 5,
      recovery: 6,
      submission: 7
    };
    const accessor = new CombatAccessor(c);
    expect(accessor.getCrit()).to.equal(c.crit);
    c.crit += 10;
    expect(accessor.getCrit()).to.equal(c.crit);
  });

  it("should be able to return dodge", () => {
    const c = {
      accuracy: 0,
      damage: 1,
      speed: 2,
      crit: 3,
      dodge: 4,
      agility: 5,
      recovery: 6,
      submission: 7
    };
    const accessor = new CombatAccessor(c);
    expect(accessor.getDodge()).to.equal(c.dodge);
    c.dodge += 10;
    expect(accessor.getDodge()).to.equal(c.dodge);
  });

  it("should be able to return agility", () => {
    const c = {
      accuracy: 0,
      damage: 1,
      speed: 2,
      crit: 3,
      dodge: 4,
      agility: 5,
      recovery: 6,
      submission: 7
    };
    const accessor = new CombatAccessor(c);
    expect(accessor.getAgility()).to.equal(c.agility);
    c.agility += 10;
    expect(accessor.getAgility()).to.equal(c.agility);
  });

  it("should be able to return recovery", () => {
    const c = {
      accuracy: 0,
      damage: 1,
      speed: 2,
      crit: 3,
      dodge: 4,
      agility: 5,
      recovery: 6,
      submission: 7
    };
    const accessor = new CombatAccessor(c);
    expect(accessor.getRecovery()).to.equal(c.recovery);
    c.recovery += 10;
    expect(accessor.getRecovery()).to.equal(c.recovery);
  });

  it("should be able to return submission", () => {
    const c = {
      accuracy: 0,
      damage: 1,
      speed: 2,
      crit: 3,
      dodge: 4,
      agility: 5,
      recovery: 6,
      submission: 7
    };
    const accessor = new CombatAccessor(c);
    expect(accessor.getSubmission()).to.equal(c.submission);
    c.submission += 10;
    expect(accessor.getSubmission()).to.equal(c.submission);
  });

  it("should be able to set accuracy", () => {
    const c = {
      accuracy: 0,
      damage: 1,
      speed: 2,
      crit: 3,
      dodge: 4,
      agility: 5,
      recovery: 6,
      submission: 7
    };
    const accessor = new CombatAccessor(c);
    accessor.setAccuracy(10);
    expect(accessor.getAccuracy()).to.equal(10);
    expect(c.accuracy).to.equal(10);
  });

  it("should be able to set damage", () => {
    const c = {
      accuracy: 0,
      damage: 1,
      speed: 2,
      crit: 3,
      dodge: 4,
      agility: 5,
      recovery: 6,
      submission: 7
    };
    const accessor = new CombatAccessor(c);
    accessor.setDamage(10);
    expect(accessor.getDamage()).to.equal(10);
    expect(c.damage).to.equal(10);
  });
});
