import Effect from "./effect";
import Requirements from "./requirements";

interface Card {
  id?: number;
  uid: string;
  actuators: string[];
  validators: string[];
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
}

export default Card;
