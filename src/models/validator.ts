import { Card, State } from "../models";

type Validator = (card: Card, mutable: State) => void;

export default Validator;
