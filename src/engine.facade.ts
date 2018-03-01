import { Engine, State } from "./models";
import * as States from "./consts/states";
import { CHOOSE_CARD } from "./consts/states";

class EngineFacade {
  constructor(private readonly engine: Engine) {}

  go(_state: State): State {
    let next = { state: _state, go: true };
    let counter = 0;
    let former = _state.state;

    while (next.go) {
      next = this.next(next.state);
      if (former == next.state.state) {
        counter++;
        if (counter > 1) {
          throw new Error("CYCLIC CALL " + former);
        }
      }
      former = next.state.state;
    }

    return next.state;
  }

  private next(state: State): { state: State; go: boolean } {
    switch (state.state) {
      case States.INIT:
        return { state: this.engine.newTurn(state), go: true };
      case States.NEW_TURN:
        return { state: this.engine.newTurn(state), go: true };
      case States.DISTRIBUTE_HANDS:
        return { state: this.engine.distributeHands(state), go: true };
      case States.VALIDATE_HANDS:
        return { state: this.engine.validateHands(state), go: true };
      case States.PLAY_CARD:
        return { state: this.engine.playCard(state), go: true };
      case States.RANDOM_CARD:
        return { state: this.engine.randomCard(state), go: true };
      case States.RANDOM_TARGETS:
        return { state: this.engine.randomTargets(state), go: true };
      default:
        return { state: state, go: false };
    }
  }
}

export default EngineFacade;
