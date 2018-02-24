import Validator from "../../models/validator";

const AttackValidator: Validator = (card, mutable) => {
  card.valid = true;
};

export default AttackValidator;
