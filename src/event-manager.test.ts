import "mocha";
import { expect } from "chai";
import EventManager from "./event-manager";

describe("Event Manager", () => {
  const event = EventManager;

  it("should be able to subscribe and publish", () => {
    let counter = 0;

    event.subscribe("fake::event", (data, envelope) => {
      expect(data).to.eql({ test: 1 });
      counter++;
    });

    event.publish("fake::event", { test: 1 });
    expect(counter).to.equal(1);
  });
});
