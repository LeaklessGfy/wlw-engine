class ArrayProxy<T> {
  constructor(
    private readonly arr: any[],
    private readonly transform: (val: any) => T
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

  getRef(): any[] {
    return this.arr;
  }

  forEach(callback: (t: T) => void) {
    this.arr.forEach(val => callback(this.transform(val)));
  }
}

export default ArrayProxy;
