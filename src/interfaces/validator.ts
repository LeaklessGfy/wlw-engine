import Card from "../models/card";
import State from "../models/state";

interface Validator {
  key(): string;
  isValid(card: Readonly<Card>, state: Readonly<State>): boolean;
}

export default Validator;
