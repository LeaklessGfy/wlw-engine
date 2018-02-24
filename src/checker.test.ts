import "mocha";
import { expect } from "chai";
import * as check from "./checker";

describe("Checker", () => {
  it("should be able to check state", () => {
    expect(check.checkState.bind(check, null))
      .to
      .throw(Error, /State is null or not object/);
  });

  it("should be able to check card", () => {
    expect(check.checkCard.bind(check, null))
      .to
      .throw(Error, /Card is null or not object/);
  });

  it("should be able to check wrestler", () => {
    expect(check.checkWrestler.bind(check, null))
      .to
      .throw(Error, /Wrestler is null or not object/);
  });

  it("should be able to check bar", () => {
    expect(check.checkBar.bind(check, null))
      .to
      .throw(Error, /Bar undefined is null or not object/);

    expect(check.checkBar.bind(check, { val: 10 }))
      .to
      .throw(Error, /Bar undefined max is null or not integer/);

    expect(check.checkBar.bind(check, { max: 10 }))
      .to
      .throw(Error, /Bar undefined val is null or not integer/);
    
    expect(check.checkBar.bind(check, { val: "L" }))
      .to
      .throw(Error, /Bar undefined val is null or not integer/);
    
    expect(check.checkBar.bind(check, { val: 0, max: "L" }))
      .to
      .throw(Error, /Bar undefined max is null or not integer/);
    
    expect(check.checkBar.bind(check, { val: 0, max: 0}))
      .to
      .not
      .throw(Error);
  });

  it("should be able to check combat", () => {
    expect(check.checkCombat.bind(check, null))
      .to
      .throw(Error, /Combat is null or not object/);
  });

  it("should be able to check mode", () => {
    expect(check.checkMode.bind(check, null))
      .to
      .throw(Error, /Mode is null or not object/);
  });
});