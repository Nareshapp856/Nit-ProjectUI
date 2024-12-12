class LocalStorageClass {
  static instance;
  static getInstance() {
    if (!this.instance) {
      this.instance = new LocalStorageClass();
    }
    return this.instance;
  }

  constructor() {
    this.technology = {};
  }

  get technology() {
    let data = localStorage.getItem("technology");

    return JSON.parse(data);
  }

  set technology(newTechnology) {
    let data = JSON.stringify(newTechnology);

    localStorage.setItem("technology", data);
  }
}
