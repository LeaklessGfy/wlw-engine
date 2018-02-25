import Wrestler from "../models/wrestler";
import { randomInt, minMax } from "../utils";

class WrestlerService {
  /**
   * Apply recovery on wrestlers.
   */
  recovery(wrestler: Wrestler, turn: number): void {
    const max = turn + wrestler.combat.recovery;

    const stamina = wrestler.stamina.val + randomInt(turn, max);
    wrestler.stamina.val = minMax(0, wrestler.stamina.max, stamina);

    const intensity = wrestler.intensity.val + randomInt(turn, max);
    wrestler.intensity.val = minMax(0, wrestler.intensity.max, intensity);
  }
}

export default WrestlerService;
