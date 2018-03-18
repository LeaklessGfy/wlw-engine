import * as _ from "lodash";
import Wrestler from "../../models/wrestler";
import * as Cards from "../cards";
import * as C from "../../consts";

class TripleH implements Wrestler {
  uid = "triple-h";
  name = "Triple H";
  img = "./triple_h.png";
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
  deck = [
    _.toPlainObject(new Cards.Ddt()),
    _.toPlainObject(new Cards.Clothesline()),
    _.toPlainObject(new Cards.Dropkick()),
    _.toPlainObject(new Cards.Pin()),
    _.toPlainObject(new Cards.Facebuster()),
    _.toPlainObject(new Cards.Pedigree()),
    _.toPlainObject(new Cards.Rest()),
    _.toPlainObject(new Cards.Mirror()),
    _.toPlainObject(new Cards.TimeWrap()),
    _.toPlainObject(new Cards.AttitudeAdjustement()),
    _.toPlainObject(new Cards.SpringBoardDiving())
  ];
  hand = [];
  dead = [];
  status = [];
  combat = {
    accuracy: 0,
    damage: 0,
    speed: 5,
    crit: 0,
    dodge: 0,
    agility: 0,
    recovery: 0,
    submission: 0
  };
}

export default TripleH;
