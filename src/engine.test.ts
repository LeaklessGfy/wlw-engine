import "mocha";
import { expect } from "chai";
import * as _ from "lodash";
import Engine from "./engine";
import { State } from "./models";
import { Reports } from "./consts";
import * as R from "./resources";
import * as S from "./strategies/core";
import InitAction from "./actions/core/init.action";
import TurnAction from "./actions/core/turn.action";
import PlayAction from "./actions/core/play.action";

describe("Engine", () => {
  const card = new S.CardStrategy();
  const wrestler = new S.WrestlerStrategy();
  const init = new InitAction(card, wrestler);
  const turn = new TurnAction(card, wrestler);
  const play = new PlayAction(card, wrestler);
  const engine = new Engine(init, turn, play);

  it("should be able to make an init", () => {});

  it("should be able to make a turn", () => {
    const f = R.FakeState();
    const mutable = engine.turn(f);

    /* CHANGES */
    expect(mutable.players).to.not.eql(f.players);
    expect(mutable.turn).to.equal(1);
    expect(mutable.targets.length).to.equal(0);
    expect(mutable.next.length).to.equal(1);
    expect(mutable.card).to.equal(null);
    expect(mutable.active).to.equal("P1");
  });

  it("should be able to make a play", () => {
    const f = R.FakeState();
    f.players.P1.hand = f.players.P1.deck;
    f.players.P1.hand[0].valid = true;
    f.card = 0;
    const mutable = engine.play(f);

    /* NO CHANGES */
    expect(mutable).to.not.equal(f);
    expect(mutable.active).to.equal(f.active);
    expect(mutable.turn).to.equal(f.turn);

    /* CHANGES */
    expect(mutable.card).to.equal(null);
    expect(mutable.targets.length).to.equal(0);

    if (mutable.records[0].val === Reports.TOUCH) {
      expect(mutable.players.CPU1.health.val).to.equal(
        f.players.CPU1.health.val - f.players.P1.hand[0].damage
      );
    } else if (mutable.records[0].val === Reports.REVERSE) {
      expect(mutable.players.P1.health.val).to.equal(
        f.players.P1.health.val - f.players.P1.hand[0].damage
      );
    } else {
      expect(mutable.players.CPU1.health).to.eql(f.players.CPU1.health);
      expect(mutable.players.P1.health).to.eql(f.players.P1.health);
    }
    expect(mutable.players.P1.stamina.val).to.equal(
      f.players.P1.stamina.val - f.players.P1.hand[0].stamina
    );
    expect(mutable.players.P1.intensity.val).to.equal(
      f.players.P1.intensity.val - f.players.P1.hand[0].intensity
    );
    expect(mutable.players.P1.dead.length).to.equal(1);
    expect(mutable.players.P1.dead[0]).to.eql(f.players.P1.hand[0]);
  });
});
