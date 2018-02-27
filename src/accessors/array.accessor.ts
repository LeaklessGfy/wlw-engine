class ArrayAccessor<T, E> {
  constructor(
    private readonly arr: E[],
    private readonly transform: (val: E) => T
  ) {}

  get(index: number): T | null {
    if (this.arr[index] !== undefined) return this.transform(this.arr[index]);
    return null;
  }

  getFirst(): T | null {
    return this.get(0);
  }

  getLast(): T | null {
    if (this.arr.length < 1) return null;
    return this.get(this.arr.length - 1);
  }

  getRef(): E[] {
    return this.arr;
  }

  shift(): T {
    return this.transform(this.arr.shift());
  }

  unshift(val: E): ArrayAccessor<T, E> {
    this.arr.unshift(val);
    return this;
  }

  length(): number {
    return this.arr.length;
  }

  forEach(callback: (t: T) => void) {
    this.arr.forEach(val => callback(this.transform(val)));
  }
}

export default ArrayAccessor;
