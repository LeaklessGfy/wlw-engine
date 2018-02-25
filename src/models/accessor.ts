import Actuator from "./actuator";
import Card from "./card";
import Kernel from "./kernel";
import State from "./state";
import Wrestler from "./wrestler";

interface Accessor {
  readonly state: State;
  getActive(): Wrestler;
  getFirstTarget(): Wrestler;
  getTargets(): Wrestler[];
  getWrestler(key: string): Wrestler;
  getWrestlers(): Wrestler[];
  getKeys(): string[];
  getOpponents(key: string): string[];
  getParteners(key: string): string[];
  getCard(): Card;
  getActuators(card: Card, kernel: Kernel): Actuator[];
}

export default Accessor;
