import Bar from "./bar";
import Card from "./card";

interface Wrestler {
  id?: number;
  uid: string;
  name: string;
  img: string;
  gender: string;
  category: string;
  health: Bar;
  stamina: number; // Energy
  intensity: number; // Finisher
  cards: Card[]; //Paquet
  hand: Card[]; //Main
  dead: Card[]; //Defausse
  status: string[];
  distributors: string[];
  //show: Show; * COMING SOON *
  //combat: CombatStat; * COMING SOON *
  //moral: MoralStat; * COMING SOON *
  //crowd: CrowdStat; * COMING SOON *
  //quirks: any; * COMING SOON *
  //skills: any; *COMING SOON*
  //effects: Effect[]; * COMING SOON *
  //managers?: Official[]; * COMING SOON *
  //team?: Team; * COMING SOON *

  //height: number; * DEPRECATED *
  //weight: number; * DEPRECATED *
  //resistances: BodyStat; * DEPRECATED *
  //hits: BodyStat; * DEPRECATED *
}

export default Wrestler;
