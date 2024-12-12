class SubescribeServiceClass {
  static instance = undefined;
  static getInstance() {
    if (!this.instance) {
      this.instance = new SubescribeServiceClass();
    }
    return this.instance;
  }

  constructor() {
    this.eventStore = {};
    this.observers = [];
  }

  subescribe(newObserver) {
    if (typeof newObserver !== "function")
      throw new Error("must pass function as observer");

    const key = newObserver.toString();
    this.observers.push({ key, listener: newObserver });

    return key;
  }

  notify(data) {
    this.eventStore.data = true;
    this.observers.forEach((observer) => observer.listener(data));
  }
}

export const SubescribeService = SubescribeServiceClass.getInstance();
