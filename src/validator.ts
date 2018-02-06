import Card from "./models/card";
import State from "./models/state";

interface Validator {
  key(): string;
  isValid(card: Card, state: State): boolean;
}

export default Validator;
