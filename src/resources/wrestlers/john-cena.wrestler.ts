import Wrestler from "../../models/wrestler";
import * as C from "../../consts";

class JohnCena implements Wrestler {
  uid = "john-cena";
  name = "John Cena";
  img = "./john_cena.png";
  gender = C.Genders.MALE;
  category = C.Categories.HEAVYWEIGHT;
  health = {
    val: 100,
    max: 100
  };
  stamina = {
    val: 10,
    max: 10
  };
  intensity = {
    val: 0,
    max: 10
  };
  deck = [];
  hand = [];
  dead = [];
  status = [];
  combat = {
    accuracy: 0,
    damage: 0,
    speed: 0,
    crit: 0,
    dodge: 0,
    agility: 0,
    recovery: 0,
    submission: 0
  };
}

export default JohnCena;
