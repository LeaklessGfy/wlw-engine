import Effect from "./effect";
import Requirements from "./requirements";
import Wrestler from "./wrestler";

interface Card {
  uid: string;
  actuators: string[];
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
}

export default Card;
