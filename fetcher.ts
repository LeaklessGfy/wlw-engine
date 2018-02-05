import Wrestler from "./Model/wrestler";
import Card from "./Model/card";
import State from "./Model/state";

export class Fetcher {
  public fetchWrestlers(): Wrestler[] {}
  public fetchWrestler(id: Number): Wrestler {}

  public fetchCards(wrestler: Wrestler): Card[] {}
  public fetchCard(id: Number): Card {}
}
