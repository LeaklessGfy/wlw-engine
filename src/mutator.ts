import * as _ from "lodash";
import { Kernel, State, Wrestler } from "./models";
import Accessor from "./accessor";
import { randomInt, isInteractive } from "./utils";
import * as States from "./consts/states";
import CardService from "./services/card.service";
import StateService from "./services/state.service";
import WrestlerService from "./services/wrestler.service";

class Mutator {
  private readonly cardService: CardService;
  private readonly stateService: StateService;
  private readonly wrestlerServicer: WrestlerService;

  constructor(private readonly accessor: Accessor) {
    this.cardService = new CardService();
    this.stateService = new StateService();
    this.wrestlerServicer = new WrestlerService();
  }

  newTurn(): void {
    const state = this.accessor.state;
    if (state.state === States.INIT) {
      for (let w of this.accessor.getWrestlers()) {
        this.cardService.shuffleDeck(w);
      }
    }
    if (state.next.length < 1) {
      this.stateService.next(state);
    }
    state.active = state.next.shift();
    this.wrestlerServicer.recovery(this.accessor.getActive(), state.turn);
    state.turn++;
  }

  nextNewTurn(): void {
    const state = this.accessor.state;
    this.stateService.clean(state);
    state.state = States.DISTRIBUTE;
  }

  distributeHands(length: number = 3): void {
    for (let w of this.accessor.getWrestlers()) {
      this.cardService.discardHand(w);
      this.cardService.respawnDeck(w);
      this.cardService.distributeHand(w, length);
    }
  }

  nextDistributeHands(): void {
    const state = this.accessor.state;
    this.stateService.clean(state);
    state.state = States.VALIDATION;
  }

  validateHands(): void {
    for (let w of this.accessor.getWrestlers()) {
      this.cardService.validateHand(w);
    }
  }

  nextValidateHands(): void {
    const state = this.accessor.state;
    this.stateService.clean(state);
    const nstate = isInteractive(state.active)
      ? States.PLAYER_ACTION
      : States.CHOOSE_RANDOM_CARD;
    state.state = nstate;
  }

  playCard(kernel: Kernel): void {
    const active = this.accessor.getActive();
    const card = this.accessor.getCard();
    const actuators = this.accessor.getActuators(card, kernel);
    const state = this.accessor.state;

    this.cardService.consumeCard(active, card);
    this.cardService.operateCard(actuators, state);
    this.cardService.effectCard();
    this.cardService.discardCard(active, card);
  }

  nextPlayCard(): void {
    const state = this.accessor.state;
    this.stateService.clean(state);
  }
}

export default Mutator;
