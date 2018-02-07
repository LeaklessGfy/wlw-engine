import Wrestler from "../../models/wrestler";
import { TRIPLE_H } from "../../consts/uids";
import { MALE } from "../../consts/genders";
import { HEAVYWEIGHT } from "../../consts/categories";

const TripleH: Wrestler = {
  id: 1,
  uid: "tripleh",
  name: "Triple H",
  img: "",
  gender: MALE,
  category: HEAVYWEIGHT,
  health: {
    val: 100,
    max: 100
  },
  stamina: 10,
  intensity: 3,
  cards: [],
  hand: [],
  dead: []
};

export default TripleH;
