class DifficultySubescribeClass {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new DifficultySubescribeClass();
    return this.instance;
  }

  constructor() {
    this.observers = [];
  }

  source() {
    this.observers = [];
  }

  insert(observer) {
    this.observers.push(observer);
  }

  remove(observer) {
    this.observers.filter((element) => element !== observer);
  }

  notify(data) {
    this.observers.forEach((observer) => observer(data));
  }
}

export const DifficultySubescribeService =
  DifficultySubescribeClass.getInstance();
