import { Card, State } from "../models";

type Validator = (card: Card, state: State) => boolean;

export default Validator;
