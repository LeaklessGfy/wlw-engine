import "mocha";
import { expect } from "chai";
import fakeState from "./resources/fake-state";
import CoreEngine from "./engine";
import CoreKernel from "./kernel";
import EngineFacade from "./engine.facade";
import * as States from "./consts/states";

describe("Engine Facade", () => {
  it("should be able to go", () => {
    const f = fakeState();
    f.next = [];
    const kernel = new CoreKernel();
    const engine = new CoreEngine(kernel);
    const facade = new EngineFacade(engine);

    const state = facade.go(f);
    expect(state.state).to.equal(States.CHOOSE_CARD);
    state.state = States.PLAY_CARD;
    state.card = 0;

    const state2 = facade.go(state);
    expect(state2.state).to.equal(States.CHOOSE_CARD);
    state2.state = States.NEW_TURN;

    const state3 = facade.go(state2);
  });
});
