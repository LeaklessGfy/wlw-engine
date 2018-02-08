import Validator from "../../interfaces/validator";
import { Card, State } from "../../models";
import { ATTACK } from "../../consts/validators";

class AttackValidator implements Validator {
  key(): string {
    return ATTACK;
  }

  validate(card: Card, state: Readonly<State>): void {
    card.valid = true;
  }
}

export default AttackValidator;
