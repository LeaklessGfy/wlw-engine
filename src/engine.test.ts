import "mocha";
import { expect } from "chai";
import * as _ from "lodash";
import Kernel from "./kernel";
import Engine from "./engine";
import { State } from "./models";
import * as W from "./resources/wrestlers";
import * as C from "./resources/cards";
import FakeState from "./resources/fake-state";
import DamageActuator from "./resources/actuators/damage.actuator";

describe("Engine", () => {
  const engine = new Engine(new Kernel());

  it("should be able to make a new turn", () => {
    const mutable = engine.newTurn(FakeState);

    /* NO CHANGES */
    expect(mutable.players).to.eql(FakeState.players);

    /* CHANGES */
    expect(mutable.turn).to.equal(1);
    expect(mutable.targets.length).to.equal(0);
    expect(mutable.next.length).to.equal(0);
    expect(mutable.card).to.equal(null);
    expect(mutable.active).to.equal("CPU");
  });

  it("should be able to make a simple card play", () => {
    const engine = new Engine(new Kernel([new DamageActuator()]));
    const mutable = engine.playCard(FakeState);

    /* NO CHANGES */
    expect(mutable.active).to.equal(FakeState.active);
    expect(mutable.turn).to.equal(FakeState.turn);

    /* CHANGES */
    expect(mutable.card).to.equal(null);
    expect(mutable.targets.length).to.equal(0);
    expect(mutable.players.CPU.health.val).to.equal(
      FakeState.players.CPU.health.val - FakeState.card.damage
    );
    expect(mutable.players.P1.stamina.val).to.equal(
      FakeState.players.P1.stamina.val - FakeState.card.stamina
    );
    expect(mutable.players.P1.intensity.val).to.equal(
      FakeState.players.P1.intensity.val - FakeState.card.intensity
    );
    expect(mutable.players.P1.dead.length).to.equal(1);
    expect(mutable.players.P1.dead[0]).to.eql(FakeState.card);
  });

  it("should be able to make a simple card distribution", () => {
    // Add distributor
    const mutable = engine.distributeCards(FakeState);
  });

  it("should be able to make a card validation", () => {
    // Add validator
    const mutable = engine.validateCards(FakeState);
  });

  it("should be able to choose a random card", () => {});

  it("should be able to add validator", () => {
    const f = _.cloneDeep(FakeState);
    f.players.P1.hand.push(new C.Ddt());
    let counter = 0;

    engine.addValidator((card, mutable, e) => {
      expect(e).to.eql(engine);
      counter++;
    });

    engine.validateCards(f);
    expect(counter).to.equal(1);
  });
});
