import Bar from "../models/bar";
import { minMax } from "../utils";

class BarProxy {
  constructor(private readonly bar: Bar) {}

  getVal(): number {
    return this.bar.val;
  }

  getMax(): number {
    return this.bar.max;
  }

  setVal(val: number): BarProxy {
    this.bar.val = minMax(0, this.bar.max, val);

    return this;
  }

  setMax(max: number): BarProxy {
    this.bar.max = Math.max(1, max);

    return this;
  }

  addVal(val: number): BarProxy {
    return this.setVal(this.bar.val + val);
  }

  addMax(max: number): BarProxy {
    return this.setMax(this.bar.max + max);
  }
}

export default BarProxy;
