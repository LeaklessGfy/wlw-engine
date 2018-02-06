import Effect from "./effect";

interface Card {
  id: number;
  uid: string;
  actuators: string[];
  validators: string[];
  name: string;
  img: string;
  stamina: number;
  intensity: number;
  damages: number;
  effects: Effect[];
  targets: string[];
  reverseable: boolean;
}

export default Card;
