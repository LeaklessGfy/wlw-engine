import Wrestler from "./models/wrestler";
import Card from "./models/card";
import State from "./models/state";

export class Fetcher {
  public fetchWrestlers(): Wrestler[] {}
  public fetchWrestler(id: Number): Wrestler {}

  public fetchCards(wrestler: Wrestler): Card[] {}
  public fetchCard(id: Number): Card {}
}
