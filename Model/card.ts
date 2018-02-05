import Effect from "./effect";

export default interface Card {
  id: number;
  handlers: string[];
  name: string;
  img: string;
  stamina: number[];
  damages: number;
  effects: Effect[];
  targets: string[];
  reverseable: boolean;
}
