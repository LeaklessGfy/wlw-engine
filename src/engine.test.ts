import "mocha";
import { expect } from "chai";
import * as _ from "lodash";
import Kernel from "./kernel";
import Engine from "./engine";
import { State } from "./models";
import * as W from "./resources/wrestlers";
import * as C from "./resources/cards";
import DamageActuator from "./resources/actuators/damage.actuator";
import getFakeState from "./resources/fake-state";

describe("Engine", () => {
  const engine = new Engine(new Kernel());

  it("should be able to make a new turn", () => {
    const f = getFakeState();
    const mutable = engine.newTurn(f);

    /* NO CHANGES */
    expect(mutable.players).to.eql(f.players);

    /* CHANGES */
    expect(mutable.turn).to.equal(1);
    expect(mutable.targets.length).to.equal(0);
    expect(mutable.next.length).to.equal(0);
    expect(mutable.card).to.equal(null);
    expect(mutable.active).to.equal("CPU");
  });

  it("should be able to make a simple card play", () => {
    const f = getFakeState();
    const engine = new Engine(new Kernel([new DamageActuator()]));
    const mutable = engine.playCard(f);

    /* NO CHANGES */
    expect(mutable.active).to.equal(f.active);
    expect(mutable.turn).to.equal(f.turn);

    /* CHANGES */
    expect(mutable.card).to.equal(null);
    expect(mutable.targets.length).to.equal(0);
    expect(mutable.players.CPU.health.val).to.equal(
      f.players.CPU.health.val - f.card.damage
    );
    expect(mutable.players.P1.stamina.val).to.equal(
      f.players.P1.stamina.val - f.card.stamina
    );
    expect(mutable.players.P1.intensity.val).to.equal(
      f.players.P1.intensity.val - f.card.intensity
    );
    expect(mutable.players.P1.dead.length).to.equal(1);
    expect(mutable.players.P1.dead[0]).to.eql(f.card);
  });

  it("should be able to make a simple card distribution", () => {
    // Add distributor
    const f = getFakeState();
    const mutable = engine.distributeCards(f);
  });

  it("should be able to make a card validation", () => {
    // Add validator
    const f = getFakeState();
    const mutable = engine.validateCards(f);
  });

  it("should be able to choose a random card", () => {});

  it("should be able to add validator", () => {
    const f = getFakeState();
    f.players.P1.hand = [new C.Ddt()];
    let counter = 0;

    engine.addValidator((card, mutable, e) => {
      expect(e).to.eql(engine);
      counter++;
    });

    engine.validateCards(f);
    expect(counter).to.equal(1);
  });
});
