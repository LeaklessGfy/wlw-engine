import BaseActuator from "./base-actuator";
import AttackActuator from "./attack-actuator";
import PinActuator from "./pin-actuator";

export default [
  new BaseActuator(),
  new AttackActuator(),
  new PinActuator()
];
