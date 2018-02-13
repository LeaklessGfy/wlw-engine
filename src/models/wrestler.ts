import Bar from "./bar";
import Card from "./card";
import CombatStat from "./combat-stat";

interface Wrestler {
  id?: number;
  uid: string;
  name: string;
  img: string;
  gender: string; // MALE, FEMALE
  category: string; // HEAVYWEIGHT ...
  health: Bar;
  stamina: Bar;
  intensity: Bar;
  cards: Card[]; //Paquet
  hand: Card[]; //Main
  dead: Card[]; //Defausse
  status: string[];
  combat: CombatStat;
  //show: Show; * COMING SOON *
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
