import SHA256 from "crypto-js/sha256";

/**
 * Technology Page Main Api Submit Data
 */
const technologySubmit = {
  TestID: 0,
  TechnologyID: -1,
  AssessmentID: 1,
  NatureID: 1,
  RandomID: 1,
  CreatedBy: "Admin",
  ModifiedBy: "Admin",
};

/**
 * Assessment Page Main Api Submit Data
 */
const assessmentSubmit = {
  TestID: 0,
  TestDetailsID: 0,
  QuestionTypeID: 0,
  NumOfEasy: 0,
  NumOfMedium: 0,
  NumOfHard: 0,
  CreatedBy: "Admin",
  ModifiedBy: "Admin",
};

/**
 * Random ID
 */
const generateUniqueId = (input) => {
  const hash = SHA256(input).toString();
  return hash.substring(0, 10);
};

class UserDataClass {
  static instance;

  static getInstance() {
    if (!this.instance) this.instance = new UserDataClass();
    return this.instance;
  }
  //
  static init() {
    this.instance = new UserDataClass();
    return this.instance;
  }

  constructor() {
    this.id = generateUniqueId(new Date().toISOString());
    this.technologyPage = technologySubmit;
    this.assessmentPage = assessmentSubmit;
  }
}

export const UserDataService = () => UserDataClass.getInstance();
export const InitUserDataService = () => UserDataClass.init();
