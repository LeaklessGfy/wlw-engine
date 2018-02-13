import { Distributor, State, Wrestler } from "../../models";

const BaseDistributor: Distributor = (wrestler, engine) => {
  for (let i = 0; i < 5; i++) {
    const kernel = engine.getKernel();
    const random = engine.randomInt(0, wrestler.cards.length);
    const card = kernel.get(wrestler.cards[random]);

    console.log(card);

    wrestler.hand.push(card);
  }
};

export default BaseDistributor;
