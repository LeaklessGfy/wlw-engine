import Validator from "../../models/validator";
import { getActive } from "../../utils/state.utils";

const BaseValidator: Validator = (card, mutable) => {
  const a = getActive(mutable);

  card.valid =
    a.stamina.val >= card.stamina && a.intensity.val >= card.intensity;
};

export default BaseValidator;
