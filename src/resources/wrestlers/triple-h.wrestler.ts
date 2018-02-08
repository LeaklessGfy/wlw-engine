import Wrestler from "../../models/wrestler";
import * as Cards from "../cards";
import * as C from "../../consts";

const TripleH: Wrestler = {
  uid: C.Uids.TRIPLE_H,
  name: "Triple H",
  img: "",
  gender: C.Genders.MALE,
  category: C.Categories.HEAVYWEIGHT,
  health: {
    val: 100,
    max: 100
  },
  stamina: 10,
  intensity: 3,
  cards: [Cards.Ddt],
  hand: [],
  dead: [],
  status: [],
  distributors: [C.Distributors.BASE]
};

export default TripleH;
