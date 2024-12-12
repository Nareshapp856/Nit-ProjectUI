import AssessmentService from "./assessmentsService";
import TechnologyService from "./technologyService";
import QuestionViewService from "./questionViewService";

import { LocalStorage } from "./LocalStorage";
import ScheduleTimeService from "./scheduleTimeService";

class Builder {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new Builder();
    return this.instance;
  }
  constructor() {
    this.id = {
      testId: 0,
      technologyId: 0,
      testDetailsId: 0,
    };
    this.questionCount = {
      easy: 0,
      medium: 0,
      hard: 0,
      include: 0,
      exclude: 0,
      total: 0,
    };
    this.requestData = { assessments: {} };
    this.assessmentService = AssessmentService;
    this.technologyService = TechnologyService;
    this.questionService = QuestionViewService;
    this.scheduleTimeService = ScheduleTimeService;
  }

  setId(key, value) {
    this.id[key] = value;
  }

  getServices() {
    return {
      assessmentService: this.assessmentService,
      technologyService: this.technologyService,
      questionService: this.questionService,
      scheduleTimeService: this.scheduleTimeService,
    };
  }

  init() {
    const data = LocalStorage.data;
    if (data) {
      if (data.assessmentData)
        this.assessmentService.options = data.assessmentData;
      if (data.technologyData) this.technologyService = data.technologyData;
      if (data.questionData) this.questionService = data.questionData;
      if (data.scheduleTimeService)
        this.scheduleTimeService = data.scheduleTimeService;
    }
  }

  getDifficulty() {
    const optionValues = Object.values(this.assessmentService.options);
    const difficultyValues = [];

    optionValues.forEach((element) => {
      difficultyValues.push(element.difficulty);
    });

    return difficultyValues;
  }

  getDifficultyByTitle(title) {
    const titleValues = this.assessmentService.options[title];
    return titleValues.difficulty;
  }

  getEasy() {
    const difficulty = this.getDifficulty();
    const easy = difficulty
      .map((element) => element.easy)
      .reduce((data, acc) => Number(data) + acc, 0);

    return easy;
  }

  getMedium() {
    const difficulty = this.getDifficulty();
    const medium = difficulty
      .map((element) => element.medium)
      .reduce((data, acc) => Number(data) + acc, 0);

    return medium;
  }

  getHard() {
    const difficulty = this.getDifficulty();
    const hard = difficulty
      .map((element) => element.hard)
      .reduce((data, acc) => Number(data) + acc, 0);

    return hard;
  }

  getTotal() {
    const difficulty = this.getDifficulty();
    const easy = this.getEasy();
    const medium = this.getMedium();
    const hard = this.getHard();
    const total = easy + medium + hard;

    return total;
  }

  setData({
    assessmentService,
    technologyService,
    questionService,
    scheduleTimeService,
  }) {
    this.assessmentService = assessmentService;
    this.technologyService = technologyService;
    this.questionService = questionService;
    this.scheduleTimeService = scheduleTimeService;
    return this;
  }

  getData() {
    const data = {};
    data.assessmentData = this.assessmentService.options;
    data.technologyData = this.technologyService;
    data.questionData = this.questionService;
    data.scheduleTimeData = this.scheduleTimeService;

    const returnValue = JSON.stringify(data);

    return returnValue;
  }
}

const BuilderService = Builder.getInstance();

export default BuilderService;
