class Composite {
  constructor() {
    this._totalQuestionCount = 0;
    this._difficulty = { easy: 0, medium: 0, hard: 0 };
  }
  updateFlag(newValue) {
    this._flag = newValue;
    return this;
  }
  updateTotalQuestionCount(newCount) {
    //...
  }

  updateDifficulty(newDifficulty) {
    //...
  }
}

class MCQClass extends Composite {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new MCQClass();
    return this.instance;
  }

  constructor() {
    super();
    this._flag = false;
    this._totalQuestionCount = 0;
    this._difficulty = { easy: 0, medium: 0, hard: 0 };
  }
  getFlag() {
    return this._flag;
  }

  getTotalQuestionCount() {
    return this._totalQuestionCount;
  }

  getDifficulty() {
    return this._difficulty;
  }

  updateFlag(newValue) {
    this._flag = newValue;
    return this;
  }
  updateTotalQuestionCount(newCount) {
    this._totalQuestionCount = newCount;
    return this;
  }

  updateDifficulty(newDifficulty) {
    this._difficulty = newDifficulty;
    return this;
  }
}

export class AssessmentClass extends Composite {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new AssessmentClass();
    return this.instance;
  }

  constructor() {
    super();
    this._flag = false;
    this._totalQuestionCount = 0;
    this._difficulty = { easy: 0, medium: 0, hard: 0 };
    this.options = {
      MCQ: {
        flag: true,
        totalQuestions: 0,
        difficulty: { easy: 0, medium: 0, hard: 0 },
      },
    };
  }

  getFlag() {
    return this._flag;
  }

  getTotalQuestionCount() {
    return this._totalQuestionCount;
  }

  getDifficulty() {
    return this._difficulty;
  }
  updateFlag(newValue) {
    this._flag = newValue;
    return this;
  }
  updateTotalQuestionCount(newCount) {
    this._totalQuestionCount = newCount;
    return this;
  }

  updateDifficulty(newDifficulty) {
    this._difficulty = newDifficulty;
    return this;
  }
  insertOptions(option, { key, value }) {
    this.options[option][key] = value;
    return this;
  }

  getData() {
    return this.options;
  }
}

export const MCQService = MCQClass.getInstance();
const AssessmentService = AssessmentClass.getInstance();
export default AssessmentService;
