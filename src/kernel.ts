import { Actuator, Validator, Distributor } from "./interfaces";
import State from "./models/state";
/* DEFAULTS */
import actuators from "./resources/actuators";
import validators from "./resources/validators";
import distributors from "./resources/distributors";

class Kernel {
  private actuators: any;
  private validators: any;
  private distributors: any;

  private readonly cards: any[];

  constructor(
    actuatorList: Actuator[] = [],
    validatorList: Validator[] = [],
    distributorList: Distributor[] = []
  ) {
    this.actuators = {};
    this.validators = {};
    this.distributors = {};
    this.defaults();
    actuatorList.forEach(actuator => this.addActuator(actuator));
    validatorList.forEach(validator => this.addValidator(validator));
    distributorList.forEach(distributor => this.addDistributor(distributor));
  }

  public addActuator(actuator: Actuator): void {
    this.actuators[actuator.key()] = actuator;
  }

  public getActuator(key: string): Actuator {
    return this.actuators[key];
  }

  public addValidator(validator: Validator): void {
    this.validators[validator.key()] = validator;
  }

  public getValidator(key: string): Validator {
    return this.validators[key];
  }

  public addDistributor(distributor: Distributor): void {
    this.distributors[distributor.key()] = distributor;
  }

  public getDistributor(key: string): Distributor {
    return this.distributors[key];
  }

  private defaults(): void {
    actuators.forEach(actuator => this.addActuator(actuator));
    validators.forEach(validator => this.addValidator(validator));
    distributors.forEach(distributor => this.addDistributor(distributor));
  }
}

export default Kernel;
