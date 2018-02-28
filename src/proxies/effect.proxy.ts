import Effect from "../models/effect";

class EffectProxy {
  constructor(private readonly effect: Effect) {}

  getUid(): string {
    return this.effect.uid;
  }

  getName(): string {
    return this.effect.name;
  }

  getDescription(): string {
    return this.effect.description;
  }

  getDuration(): number {
    return this.effect.duration;
  }

  getLuck(): number {
    return this.effect.luck;
  }

  getTarget(): number {
    return this.effect.target;
  }

  getIcon(): string {
    return this.effect.icon;
  }

  getRef(): Effect {
    return this.effect;
  }
}

export default EffectProxy;
