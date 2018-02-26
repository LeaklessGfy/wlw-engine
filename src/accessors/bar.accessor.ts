import Bar from "../models/bar";
import { minMax } from "../../../api/wlw-engine/src/utils";

class BarAccessor {
  constructor(private readonly bar: Bar) {}

  getVal(): number {
    return this.bar.val;
  }

  getMax(): number {
    return this.bar.max;
  }

  setVal(val: number): BarAccessor {
    this.bar.val = minMax(0, this.bar.max, val);

    return this;
  }

  setMax(max: number): BarAccessor {
    this.bar.max = Math.max(1, max);

    return this;
  }
}

export default BarAccessor;
