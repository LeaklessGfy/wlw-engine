import Validator from "../../interfaces/validator";
import { Card, State } from "../../models";
import { BASE } from "../../consts/validators";
import { getWrestler } from "../../utils/utils";

class BaseValidator implements Validator {
  key(): string {
    return BASE;
  }

  isValid(card: Readonly<Card>, state: Readonly<State>): boolean {
    const active = getWrestler(state.active, state.players);
    if (active.stamina >= card.stamina && active.intensity > card.intensity) {
      return true;
    }
    return false;
  }
}

export default BaseValidator;
