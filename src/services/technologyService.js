class Composite {
  updateData() {
    throw new Error("This method must be implimented.");
  }
}

class SelectTechnologyClass extends Composite {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new SelectTechnologyClass();
    return this.instance;
  }

  constructor() {
    super();
    this.programmingLanguage = "Select A Technology";
  }

  updateData(newLanguage) {
    this.programmingLanguage = newLanguage;

    return this;
  }
}

class NatureOfAssessmentClass extends Composite {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new NatureOfAssessmentClass();
    return this.instance;
  }

  constructor() {
    super();
    this.natureOfAssessment = "dynamic";
  }

  updateData(newType) {
    this.natureOfAssessment = newType;

    return this;
  }
}

class RandomClass extends Composite {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new RandomClass();
    return this.instance;
  }

  constructor() {
    super();
    this.random = "noRandom";
  }

  updateData(newRandom) {
    this.random = newRandom;

    return this;
  }
}

export class TechnologyClass extends Composite {
  static instance;
  static getInstance() {
    if (!this.instance) this.instance = new TechnologyClass();
    return this.instance;
  }

  constructor() {
    super();
    this._technology = {
      programmingLanguage: SelectTechnologyService.programmingLanguage,
      natureOfAssessment: NatureOfAssessmentService.natureOfAssessment,
      assessmentNature: RandomService.random,
    };
  }

  get technology() {
    return this._technology;
  }

  updateData(newTechnology) {
    this._technology = newTechnology;

    return this;
  }

  isValid() {
    if (Object.keys(this._technology).length >= 2) {
      return true;
    }
    return false;
  }
}

export const SelectTechnologyService = SelectTechnologyClass.getInstance();
export const NatureOfAssessmentService = NatureOfAssessmentClass.getInstance();
export const RandomService = RandomClass.getInstance();

const TechnologyService = TechnologyClass.getInstance();
export default TechnologyService;
