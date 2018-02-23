import * as _ from "lodash";
import * as Chance from "chance";

const random = new Chance(Math.random);

/**
 * Clone the object pass in parameter
 *
 * @param {T} o
 *
 * @return {T}
 */
export const clone = <T>(o: T): T => {
  return _.cloneDeep(o);
};

/**
 * Return a freeze copy of the object pass in parameter
 *
 * @param {T} o
 *
 * @return {T}
 */
export const freeze = <T>(o: T): Readonly<T> => {
  return Object.freeze(o);
};

/**
 * Return a random integer. Can be influenced by min and max parameter (inclusive).
 *
 * @param {number} min minimum that random int can be
 * @param {number} max maximum that random int can be
 *
 * @return {number} random integer
 */
export const randomInt = (min: number = 0, max: number = 1): number => {
  return random.integer({ min, max });
};

/**
 * Return a random boolean. Can be influenced by percent parameter.
 *
 * @param {number} percent a number that represent the percent of success
 *
 * @return {boolean} random boolean
 */
export const randomBool = (percent: number = 50): boolean => {
  return random.bool({ likelihood: percent });
};
