import BuilderService from "./builder";

class LocalStorageClass {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new LocalStorageClass();
    return this.instance;
  }

  #auth;
  #main;
  constructor() {
    this.#auth = { isLoggedIn: false, type: "user | admin", userName: "dude" };
    this.#main = {};
  }

  /** Utility */

  clear() {
    localStorage.removeItem("main");
  }

  /** End Utility */

  get auth() {
    return JSON.parse(localStorage.getItem("auth"));
  }

  set auth(newData) {
    localStorage.setItem("auth", newData);
  }
}

export const LocalStorage = LocalStorageClass.getInstance();
