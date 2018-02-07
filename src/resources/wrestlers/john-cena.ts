import Wrestler from "../../models/wrestler";
import { JOHN_CENA } from "../../consts/uids";
import { MALE } from "../../consts/genders";
import { HEAVYWEIGHT } from "../../consts/categories";

const JohnCena: Wrestler = {
  id: 2,
  uid: "johncena",
  name: "John Cena",
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
}

export default JohnCena;
