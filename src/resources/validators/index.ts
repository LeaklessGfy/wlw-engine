import BaseValidator from "./base-validator";
import AttackValidator from "./attack-validator";

export default [
  new BaseValidator(),
  new AttackValidator()
];
