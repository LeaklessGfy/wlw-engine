import Validator from "../../models/validator";

const AttackValidator: Validator = (card, engine) => {
  card.valid = true;
};

export default AttackValidator;
