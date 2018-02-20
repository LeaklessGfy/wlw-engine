import Wrestler from "../../models/wrestler";
import * as Cards from "../cards";
import * as C from "../../consts";

const TripleH: Wrestler = {
  uid: "triple-h",
  name: "Triple H",
  img: "https://www.therichest.com/wp-content/uploads/Triple-H-.jpg",
  gender: C.Genders.MALE,
  category: C.Categories.HEAVYWEIGHT,
  health: {
    val: 100,
    max: 100
  },
  stamina: {
    val: 10,
    max: 10
  },
  intensity: {
    val: 5,
    max: 10
  },
  cards: ["ddt"],
  hand: [],
  dead: [],
  status: [],
  combat: {
    accuracy: 0,
    damage: 0,
    speed: 5,
    crit: 0,
    dodge: 0,
    agility: 0,
    recovery: 0,
    submission: 0
  }
};

export default TripleH;
