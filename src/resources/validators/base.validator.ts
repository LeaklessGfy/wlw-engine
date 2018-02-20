import Validator from "../../models/validator";

const BaseValidator: Validator = (card, mutable, engine) => {
  const a = engine.getActive(mutable);

  card.valid =
    a.stamina.val >= card.stamina && a.intensity.val >= card.intensity;
};

export default BaseValidator;
