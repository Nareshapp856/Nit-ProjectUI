import getSlice from "./root.utility";
import { types } from "./root.actions";

// LISTS

/* Dashboard */

const testsByDateSlice = getSlice(types.TESTSBYDATE);

/* Assessment-View */

const technologiesListSlice = getSlice(types.TECHNOLOGY_LIST);
const modulesListSlice = getSlice(types.MODULE_LIST);
const topicsListSlice = getSlice(types.TOPIC_LIST);
const subTopicsListSlice = getSlice(types.SUBTOPIC_LIST);
const questionListSlice = getSlice(types.QUESTION_LIST);
const assessmentListSlice = getSlice(types.ASSESSMENT_LIST);

/* Enroll-Student */

const testListSlice = getSlice(types.TEST_LIST);
const batchDetailsListSlice = getSlice(types.BATCHDETAILS_LIST);
const studentListSlice = getSlice(types.STUDENT_LIST);
const enrollListSlice = getSlice(types.ENROLL_LIST);
const deleteEnrollItemSlice = getSlice(types.DELETE_ENROLL);

/* User-Management */

const batchListSlice = getSlice(types.BATCH_LIST);
const facultyListSlice = getSlice(types.FACULTY_LIST);
const mentorListSlice = getSlice(types.MENTORE_LIST);
const studentListByTechModuleSlice = getSlice(
  types.STUDENT_LIST_BY_TECH_MODULE
);

/* Enroll-Student */

const userManagementPageSlice = getSlice(types.USERMANAGEMENT_PAGE);

// LOADERS

/* Assessment-View*/

const listOfAssessmentPageSlice = getSlice(types.LISTOFASSESSMENT_PAGE);
const technologyPageSlice = getSlice(types.TECHNOLOGY_PAGE);
const assessmentPageSlice = getSlice(types.ASSESSMENT_PAGE);
const schedulePageSlice = getSlice(types.SCHEDULE_PAGE);

/* Enroll-Student */

const testSelectionPageSlice = getSlice(types.TESTSELECTION_PAGE);

/* User-Management */

const retriveUserSelectionPageSlice = getSlice(
  types.RETRIVEUSERMANAGEMENT_PAGE
);
const retriveBatchDetailsSlice = getSlice(types.RETRIVEBATCH_PAGE);

// ACTIONS

/* Enroll-Student */

const submitEnrollStudentPageSlice = getSlice(types.ENROLLSTUDENTS_ACTION);

/* User-Management */

const submitBatchCreationActionSlice = getSlice(types.BATCHCREATION_ACTION);

// UTIL
const availableDBQuestionCountSlice = getSlice(types.AVAILABLEDBQUESTIONCOUNT);

export {
  testsByDateSlice,
  assessmentListSlice,
  technologiesListSlice,
  modulesListSlice,
  topicsListSlice,
  subTopicsListSlice,
  questionListSlice,
  enrollListSlice,
  testListSlice,
  batchDetailsListSlice,
  studentListSlice,
  batchListSlice,
  facultyListSlice,
  mentorListSlice,
  deleteEnrollItemSlice,
  studentListByTechModuleSlice,
};
export {
  listOfAssessmentPageSlice,
  technologyPageSlice,
  assessmentPageSlice,
  schedulePageSlice,
  testSelectionPageSlice,
  userManagementPageSlice,
  retriveUserSelectionPageSlice,
  retriveBatchDetailsSlice,
};
export { submitEnrollStudentPageSlice, submitBatchCreationActionSlice };
export { availableDBQuestionCountSlice };
