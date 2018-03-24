import "mocha";
import { expect } from "chai";
import container from "inversify.config";
import Action from "models/action";
import TYPES from "types";
import StateProxy from "proxies/state.proxy";
import fakeState from "../fake-state";

describe("[ACTION] Turn", () => {
  const turn = container.getNamed<Action>(TYPES.Action, "turn");

  it("should be able to act", () => {
    const f = fakeState();
    f.baseNext = ["P1", "CPU1"];
    const s = new StateProxy(f);

    turn.act(s);

    // Set next to base next

    // Distribute hand

    // Get next active

    // Recovery

    // Validate hand

    // Clean
  });
});
