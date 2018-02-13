import Effect from "./effect";
import Requirements from "./requirements";
import State from "./state";
import Wrestler from "./wrestler";

interface Card {
  id?: number;
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
  valid?: boolean;
  rarity?: string;

  consume(active: Wrestler): void;
  operate(mutable: State, engine): void;
}

export default Card;
