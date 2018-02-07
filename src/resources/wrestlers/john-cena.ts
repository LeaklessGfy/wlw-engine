import Wrestler from "../../models/wrestler";
import * as C from "../../consts";

const JohnCena: Wrestler = {
  uid: C.UIDS.JOHN_CENA,
  name: "John Cena",
  img: "",
  gender: C.Genders.MALE,
  category: C.Categories.HEAVYWEIGHT,
  health: {
    val: 100,
    max: 100
  },
  stamina: 10,
  intensity: 3,
  cards: [],
  hand: [],
  dead: [],
  status: [C.Status.NORMAL]
}

export default JohnCena;
