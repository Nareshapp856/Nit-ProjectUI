export class QueryViewClass {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new QueryViewClass();
    return this.instance;
  }

  constructor() {
    this.selectedTechnology = {
      moduleName: "",
      topicName: "",
      subTopicName: "",
    };
  }

  updateSelectedTechnology(newData) {
    this.selectedTechnology = newData;
  }
}

const QuestionViewService = QueryViewClass.getInstance();
export default QuestionViewService;
