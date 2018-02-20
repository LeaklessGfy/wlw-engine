import Effect from "./effect";
import Engine from "./engine";
import Requirements from "./requirements";
import State from "./state";
import Wrestler from "./wrestler";

interface Card {
  uid: string;
  name: string;
  img: string;
  description: string;
  requirements?: Requirements;
  stamina: number;
  intensity: number;
  damage?: number;
  effects?: Effect[];
  targets: string[];
  reverseable: boolean;
  rarity: string;
  valid?: boolean;

  preOperate(mutable: State, engine: Engine): void;
  operate(mutable: State, engine: Engine): void;
  postOperate(mutable: State, engine: Engine): void;
}

export default Card;
