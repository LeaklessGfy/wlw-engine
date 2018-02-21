import * as _ from "lodash";
import { Distributor, State, Wrestler } from "../../models";

const BaseDistributor: Distributor = (wrestler, mutable, engine) => {
  const length = wrestler.cards.length ? wrestler.cards.length - 1 : 0;
  wrestler.hand = [];

  _.shuffle(wrestler.cards);

  for (let i = 0; i < 5; i++) {
    const random = engine.randomInt(0, length);
    const card = wrestler.cards[random];

    if (card) {
      wrestler.hand.push(_.cloneDeep(card));
    }
  }
};

export default BaseDistributor;
