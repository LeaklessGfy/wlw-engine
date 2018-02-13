import { Card, Engine, State } from "../models";

type Validator = (card: Card, mutable: State, engine: Engine) => void;

export default Validator;
