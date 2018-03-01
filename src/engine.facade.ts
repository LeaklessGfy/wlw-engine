import { Engine, State } from "./models";
import * as States from "./consts/states";
import { CHOOSE_CARD } from "./consts/states";

class EngineFacade {
  constructor(private readonly engine: Engine) {}

  go(_state: State): State {
    let next = { state: _state, go: true };

    while (next.go) {
      next = this.next(_state);
    }

    return next.state;
  }

  private next(state: State): { state: State; go: boolean } {
    switch (state.state) {
      case States.INIT:
      case States.NEW_TURN:
        return { state: this.engine.newTurn(state), go: true };
      case States.DISTRIBUTE_HANDS:
        return { state: this.engine.distributeHands(state), go: true };
      case States.VALIDATE_HANDS:
        return { state: this.engine.validateHands(state), go: true };
      case States.PLAY_CARD:
        return { state: state, go: true };
      case States.RANDOM_CARD:
        return { state: state, go: true };
      case States.RANDOM_TARGETS:
        return { state: this.engine.randomTargets(state), go: true };
      default:
        return { state: state, go: false };
    }
  }
}

export default EngineFacade;
