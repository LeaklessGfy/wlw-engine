import 'mocha';
import * as _ from "lodash";
import { expect } from 'chai';
import ActionManager from "./action-manager";
import { State } from "./models";
import * as W from "./resources/wrestlers";
import * as C from "./resources/cards";

const fakeState: Readonly<State> = Object.freeze({
  turn: 0,
  active: "P1",
  targets: ["CPU"],
  players: {
    P1: W.TripleH,
    CPU: W.JohnCena
  },
  card: null
});

describe('Action Manager', () => {
  it('should be able to make a new turn', () => {
    const a = new ActionManager();
    const mutable: State = _.cloneDeep(fakeState);
    a.makeNewTurn(mutable, fakeState);
    expect(mutable.turn).equal(0);//1 when implemented
  });

  it('should be able to make a card validation', () => {
    const a = new ActionManager();
    const mutable: State = _.cloneDeep(fakeState);
    mutable.card = C.Ddt;
    const freeze = Object.freeze(mutable);    

    const result = a.makeCardValidation(mutable.card, freeze);
    expect(result).to.eql(true);
    expect(freeze.card.valid, undefined);    
    expect(mutable.card.valid).to.equal(true);
    mutable.players.P1.stamina = 0;
    a.makeCardValidation(mutable.card, Object.freeze(mutable));
    expect(mutable.card.valid).to.equal(false);
  });

  it('should be able to make a simple card play', () => {
    const a = new ActionManager();
    const mutable: State = _.cloneDeep(fakeState);
    mutable.card = C.Ddt;

    const w = a.makeCardPlay(mutable, Object.freeze(mutable));
    /* DEEPLY EQUAL CAUSE WRAPPER */
    expect(w).to.eql(mutable);

    /* NO CHANGES */
    expect(w.active).to.equal(fakeState.active);
    expect(w.targets[0]).to.equal(fakeState.targets[0]);
    expect(w.turn).to.equal(fakeState.turn);

    /* CHANGES */
    expect(w.players.CPU.health.val).to.equal(fakeState.players.CPU.health.val - C.Ddt.damage);
    expect(w.players.P1.stamina).to.equal(fakeState.players.P1.stamina - C.Ddt.stamina);
    expect(w.players.P1.intensity).to.equal(fakeState.players.P1.intensity - C.Ddt.intensity);

    mutable.players.P1.stamina = 0;
    mutable.players.P1.intensity = 0;
    a.makeCardPlay(mutable, Object.freeze(mutable));
    expect(mutable.players.CPU.health.val).to.equal(fakeState.players.CPU.health.val - (C.Ddt.damage * 2));
    expect(mutable.players.P1.stamina).to.equal(0);
    expect(mutable.players.P1.intensity).to.equal(0);    
  });

  it('should be able to make a simple card distribution', () => {
    const a = new ActionManager();
    const mutable: State = _.cloneDeep(fakeState);

    const w = a.makeCardDistribution(mutable, fakeState);
    /* DEEPLY EQUAL CAUSE WRAPPER */
    expect(w).to.eql(mutable);

    /* NO CHANGES */
    expect(w.active).to.equal(fakeState.active);
    expect(w.targets[0]).to.contain(fakeState.targets[0]);
    expect(w.targets.length).to.equal(fakeState.targets.length);
    expect(w.turn).to.equal(fakeState.turn);

    /* CHANGES */
    expect(w.players.P1.hand).to.not.equal(fakeState.players.P1.cards);
    expect(w.players.P1.hand[0].valid).to.equal(true);
  });
});
