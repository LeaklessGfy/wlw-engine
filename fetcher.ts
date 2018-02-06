import Wrestler from "./model/wrestler";
import Card from "./model/card";
import State from "./model/state";

export class Fetcher {
  public fetchWrestlers(): Wrestler[] {}
  public fetchWrestler(id: Number): Wrestler {}

  public fetchCards(wrestler: Wrestler): Card[] {}
  public fetchCard(id: Number): Card {}
}
