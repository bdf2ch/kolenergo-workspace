export class AhoRequestFilter<T> {
  public value: T | null;
  title: string;
  label: string;

  constructor(title: string, value?: T) {
    this.title = title;
    this.value = value ? value : null;
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
