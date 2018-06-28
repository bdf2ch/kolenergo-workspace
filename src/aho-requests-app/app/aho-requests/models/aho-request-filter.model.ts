export class AhoRequestFilter<T> {
  public value: T | null;

  constructor(config?: T) {
    this.value = config ? config : null;
  }

  setValue(val: T | null) {
    this.value = val;
  }

  getValue(): T | null {
    return this.value;
  }

  clear() {
    this.value = null;
  }
}
