import { Card, Engine } from "../models";

type Validator = (card: Card, engine: Engine) => void;

export default Validator;
