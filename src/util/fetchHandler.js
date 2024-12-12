const titles = [
  { id: 1, title: "Test Name" },
  { id: 2, title: "IsActive" },
  { id: 3, title: "Start Date" },
  { id: 4, title: "End Date" },
  { id: 5, title: "State Time" },
  { id: 6, title: "End Time" },
  { id: 7, title: "CreatedBy" },
  { id: 8, title: "CreatedAt" },
];

const progLangs = [
  { id: 1, language: "select language" },
  { id: 2, language: "java" },
  { id: 3, language: ".net" },
];

class DataHandlerClass {
  static instance;
  static getInstance() {
    if (!this.instance) {
      this.instance = new DataHandlerClass();
    }
    return this.instance;
  }

  getProgLangs() {
    return progLangs;
  }

  getTitles() {
    return titles;
  }
}

const DataHandler = DataHandlerClass.getInstance();

export default DataHandler;
