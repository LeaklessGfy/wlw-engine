import Show from "./show";
import Bar from "./bar";
import CombatStat from "./combat-stat";
import CrowdStat from "./crowd-stat";
import MoralStat from "./moral-stat";
import BodyStat from "./body-stat";
import Card from "./card";
import Effect from "./effect";
import Team from "./team";
import Status from "./status";
import Official from "./official";

interface Wrestler {
  id: number;
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
  //status: Status[]; * COMING SOON *
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
