import Card from "./card";

class Mode {
  uid: string;
  name: string;
  img: string;
  description: string;
  numbers: number;
  team: boolean;
  winning: string;
  cards?: Card[];
}

export default Mode;
