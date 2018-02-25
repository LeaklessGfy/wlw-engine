class WrestlerService {
  /**
   * Apply recovery on wrestlers.
   */
  recovery(): void {
    const turn = this.accessor.state.turn;

    for (let w of this.accessor.getWrestlers()) {
      const max = turn + w.combat.recovery;

      const stamina = w.stamina.val + randomInt(turn, max);
      this.accessor.setStaminaVal(w, stamina);

      const intensity = w.intensity.val + randomInt(turn, max);
      this.accessor.setIntensityVal(w, intensity);
    }
  }
}

export default WrestlerService;
