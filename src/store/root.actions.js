import { userSelectionSlice } from "./slice/userSelectionsSlice";

export const types = {
  // Dashboard
  TESTSBYDATE: "testsbydate",
  // Test-Creation
  ASSESSMENT_LIST: "assessmentlist",
  // Assessment-View
  TECHNOLOGY_LIST: "technologylist",
  MODULE_LIST: "modulelist",
  TOPIC_LIST: "topiclist",
  SUBTOPIC_LIST: "subtopiclist",
  QUESTION_LIST: "questionlist",
  // Enroll-Student
  TEST_LIST: "listoftests",
  BATCHDETAILS_LIST: "listofbatchdetails",
  STUDENT_LIST: "listofstudent",
  ENROLL_LIST: "enrolllist",
  // User-management
  BATCH_LIST: "listofbatches",
  FACULTY_LIST: "listoffaculty",
  MENTORE_LIST: "listofmentore",
  STUDENT_LIST_BY_TECH_MODULE: "studentlistByTechModule",

  // PAGES

  // Assessment-View
  LISTOFASSESSMENT_PAGE: "listofassessmentpage",
  TECHNOLOGY_PAGE: "technologypage",
  ASSESSMENT_PAGE: "assessmentpage",
  SCHEDULE_PAGE: "schedulepage",
  // ENROLL-STUDENTS
  TESTSELECTION_PAGE: "testselectionpage",
  // USER-MANAGEMENT
  USERMANAGEMENT_PAGE: "userselectionpage",
  RETRIVEBATCH_PAGE: "retrivebatchpage",
  RETRIVEUSERMANAGEMENT_PAGE: "retriveuserselectionpage",

  // ACTIONS

  // ENROLL-STUDENTS
  ENROLLSTUDENTS_ACTION: "enrollstudentsaction",
  DELETE_ENROLL: "deleteenroll",
  // User-management
  BATCHCREATION_ACTION: "usermanagementaction",

  // UTIL
  /**
   * In Question View Getting DB Count for each selected combination from backend to show DBCount column in Question View Edit Modal table.
   */
  AVAILABLEDBQUESTIONCOUNT: "availabledbquestioncount",
  /**
   * Instead of loading 5 api's at the same time using saga to load all data on after another
   */
  USERMANAGEMENTESSENTIAL_LISTS: "usermanagementessentials",
};

// LISTS
export const fetchTestsByDate = (payload) => {
  return {
    type: types.TESTSBYDATE,
    payload,
  };
};

export const fetchAssessmentList = () => {
  return {
    type: types.LISTOFASSESSMENT_PAGE,
  };
};

export const fetchTechnologyList = () => {
  return {
    type: types.TECHNOLOGY_LIST,
  };
};

export const fetchModuleList = (payload) => {
  return {
    type: types.MODULE_LIST,
    payload,
  };
};

export const fetchTopicList = (payload) => {
  return {
    type: types.TOPIC_LIST,
    payload,
  };
};

export const fetchSubTopicList = (payload) => {
  return {
    type: types.SUBTOPIC_LIST,
    payload,
  };
};

export const fetchTestList = (payload) => {
  return {
    type: types.TEST_LIST,
    payload,
  };
};

export const fetchBatchDetailsList = (payload) => {
  return {
    type: types.BATCHDETAILS_LIST,
    payload,
  };
};

export const fetchStudentList = (payload) => {
  return {
    type: types.STUDENT_LIST,
    payload,
  };
};

export const fetchEnrollList = (payload) => {
  return {
    type: types.ENROLL_LIST,
    payload,
  };
};

export const deleteEnrollDispatch = (payload) => ({
  type: types.DELETE_ENROLL,
  payload,
});

export function fetchBatchList(payload) {
  return {
    type: types.BATCH_LIST,
    payload,
  };
}

export function fetchStudentListbyTechModule(payload) {
  return {
    type: types.STUDENT_LIST_BY_TECH_MODULE,
    payload,
  };
}

export function fetchFacultyList(payload) {
  return {
    type: types.FACULTY_LIST,
    payload,
  };
}

export function fetchMentorList(payload) {
  return {
    type: types.MENTORE_LIST,
    payload,
  };
}

//  PAGES

export const fetchAssessmentPageDetails = (payload) => {
  return {
    type: types.ASSESSMENT_PAGE,
    payload,
  };
};

export const fetchTechnologyPageDetails = (payload) => {
  return {
    type: types.TECHNOLOGY_PAGE,
    payload,
  };
};

export const retriveTestSelectionPageDetails = (payload) => {
  return {
    type: types.TESTSELECTION_PAGE,
    payload,
  };
};

export const retriveUserSelectionPageDetails = (payload) => {
  return {
    type: types.RETRIVEUSERMANAGEMENT_PAGE,
    payload,
  };
};

//  ACTIONS

export const submitEnrollStudentPage = (payload) => {
  return {
    type: types.ENROLLSTUDENTS_ACTION,
    payload,
  };
};

export const submitBatchCreationPage = (payload) => {
  return {
    type: types.BATCHCREATION_ACTION,
    payload,
  };
};

// UTIL
export const userManagementEssentials = (_) => {
  return {
    type: types.USERMANAGEMENTESSENTIAL_LISTS,
  };
};

export const userSelectionAction = userSelectionSlice.actions;
