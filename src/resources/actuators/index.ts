import BaseActuator from "./groups/base.actuator";
import AttackActuator from "./groups/attack.actuator";
import PinActuator from "./uniques/pin.actuator";

export default [
  new BaseActuator(),
  new AttackActuator(),
  new PinActuator()
];
