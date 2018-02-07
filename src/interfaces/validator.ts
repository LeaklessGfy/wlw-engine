import { Card, State } from "../models";

interface Validator {
  key(): string;
  isValid(card: Readonly<Card>, state: Readonly<State>): boolean;
}

export default Validator;
