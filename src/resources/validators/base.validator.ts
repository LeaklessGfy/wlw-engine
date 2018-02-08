import Validator from "../../interfaces/validator";
import { Card, State, Wrestler } from "../../models";
import { BASE } from "../../consts/validators";
import { getWrestler } from "../../utils";

class BaseValidator implements Validator {
  key(): string {
    return BASE;
  }

  validate(card: Card, state: Readonly<State>): void {
    const active = getWrestler(state.active, state.players);
    card.valid = this.isValid(active, card);
  }

  private isValid(active: Wrestler, card: Card): boolean {
    return active.stamina >= card.stamina && active.intensity > card.intensity;
  }
}

export default BaseValidator;
