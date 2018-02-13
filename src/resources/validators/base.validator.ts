import Validator from "../../models/validator";

const BaseValidator: Validator = (card, engine) => {
  const state = engine.getOriginalState();
  const a = engine.getActive(state);

  card.valid =
    a.stamina.val >= card.stamina && a.intensity.val > card.intensity;
};

export default BaseValidator;
