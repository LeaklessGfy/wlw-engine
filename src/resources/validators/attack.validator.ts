import Validator from "../../models/validator";

const AttackValidator: Validator = (card, mutable, engine) => {
  card.valid = true;
};

export default AttackValidator;
