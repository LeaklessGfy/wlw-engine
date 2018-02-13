import { Card, State } from "../models";

interface Validator {
  key(): string;
  validate(card: Card, state: Readonly<State>): void;
}

export default Validator;
