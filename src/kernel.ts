import Actuator from "./interfaces/actuator";
import Validator from "./interfaces/validator";
import State from "./models/state";
/* DEFAULTS */
import AttackActuator from "./resources/actuators/attack-actuator";
import AttackValidator from "./resources/validators/attack-validator";

class Kernel {
  private actuators: any;
  private validators: any;

  constructor(actuatorList: Actuator[] = [], validatorList: Validator[] = []) {
    this.actuators = {};
    this.validators = {};
    actuatorList.forEach(actuator => this.addActuator(actuator));
    validatorList.forEach(validator => this.addValidator(validator));
    this.defaults();
  }

  public addActuator(actuator: Actuator): void {
    this.add(this.actuators, actuator.key(), actuator);
  }

  public getActuators(key: string): Actuator[] {
    return this.get(this.actuators, key);
  }

  public addValidator(validator: Validator): void {
    this.add(this.validators, validator.key(), validator);
  }

  public getValidators(key: string): Validator[] {
    return this.get(this.validators, key);
  }

  private defaults(): void {
    this.addActuator(new AttackActuator());
    this.addValidator(new AttackValidator());
  }

  private add(holder: any, key: string, obj: any): void {
    if (!holder[key]) holder[key] = [];
    holder[key].push(obj);
  }

  private get(arr: Array<any>, key: string): Array<any> {
    if (!arr[key]) return [];
    return arr[key];
  }
}

export default Kernel;
