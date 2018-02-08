import Distributor from "../../interfaces/distributor";
import { State, Wrestler } from "../../models";

class BaseDistributor implements Distributor {
  key(): string {
    return "base";
  }

  distribute(wrestler: Wrestler, state: Readonly<State>): void {
    wrestler.hand = wrestler.cards;
  }
}

export default BaseDistributor;
