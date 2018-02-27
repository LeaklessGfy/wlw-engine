import Effect from "./effect";
import Requirements from "./requirements";
import Wrestler from "./wrestler";

interface Card {
  uid: string;
  actuators: string[];
  name: string;
  img: string;
  description: string;
  stamina: number;
  intensity: number;
  damage?: number;
  targets: number[];
  rarity: number;
  effects?: Effect[];
  //requirements?: Requirements;
  blockable?: boolean;
  reverseable?: boolean;
  valid?: boolean;
}

export default Card;
