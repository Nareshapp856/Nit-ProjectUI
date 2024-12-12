import { combineReducers } from "redux";
import {
  assessmentListSlice,
  assessmentPageSlice,
  availableDBQuestionCountSlice,
  batchDetailsListSlice,
  batchListSlice,
  deleteEnrollItemSlice,
  enrollListSlice,
  facultyListSlice,
  listOfAssessmentPageSlice,
  mentorListSlice,
  // modulesListSlice,
  // questionListSlice,
  retriveBatchDetailsSlice,
  retriveUserSelectionPageSlice,
  schedulePageSlice,
  studentListByTechModuleSlice,
  studentListSlice,
  subTopicsListSlice,
  submitBatchCreationActionSlice,
  submitEnrollStudentPageSlice,
  technologiesListSlice,
  technologyPageSlice,
  testListSlice,
  testSelectionPageSlice,
  testsByDateSlice,
  // topicsListSlice,
  userSelectionPageSlice,
} from "./root.slice";
import { userSelectionSlice } from "./slice/userSelectionsSlice";
import { enrollStudentSlice } from "./slice/enrollStudent.slice";
import userManagementSlice from "./slice/userManagement.slice";
import { excelStudentSlice } from "./slice/excelStudents.slice";

import { registerInterviewerSlice } from "./slice/interviewer";
// DB reducers
import {
  technologiesListSliceDB,
  selectedtechnologySlice,
  createTechnologySlice,
  deleteTechnologySlice,
  excelTechnologySlice,
  editTechnologySlice,
  modulesListSlice,
  createModuleSlice,
  deleteModuleSlice,
  editModuleSlice,
  excelModuleSlice,
  moduleTechIdSlice,
  topicsListSlice,
  createTopicSlice,
  deleteTopicSlice,
  editTopicSlice,
  excelTopicSlice,
  subTopicListSlice,
  createSubTopicSlice,
  editSubTopicSlice,
  deleteSubTopicSlice,
  excelSubTopicSlice,
  questionListSlice,
  questionImagelistslice,
  createQuestionlice,
  deleteQuestionSlice,
  editQuestionSlice,
  excelQuestionSlice,
  groupparagraphListSlice,
  programcodeListSlice,
  createQuestionFormDataSlice,
  editQuestionFormDataSlice,
  cascadeResultSlice,
  p_programsListSlice,
  p_testCasesListSlice,
} from "./QuestionDB/root.slice";
import {
  p_moduleSlice,
  p_subTopicsSlice,
  p_technologySlice,
  p_topicsSlice,
} from "./slices/programView";
import {
  p_deleteProgramSlice,
  p_programsSlice,
} from "./slices/programView/programsSlice";
import {
  p_a_addProgramSlice,
  p_a_languageSlice,
  p_a_moduleSlice,
  p_a_subTopicsSlice,
  p_a_topicsSlice,
} from "./slices/programView/addModal";
import { t_programsSlice } from "./slices/testcaseVite/programsSlice";
import {
  t_moduleSlice,
  t_subTopicsSlice,
  t_technologySlice,
  t_topicsSlice,
} from "./slices/testcaseVite";
import {
  t_a_moduleSlice,
  t_a_subTopicsSlice,
  t_a_topicsSlice,
} from "./slices/testcaseVite/addModal";
import { t_a_programsSlice } from "./slices/testcaseVite/addModal/programsSlice";
import {
  t_deleteTestcasesSlice,
  t_testcasesSlice,
} from "./slices/testcaseVite/testcasesSlice";
import { t_a_add_testcasesSlice } from "./slices/testcaseVite/addModal/testcaseSlice";

import facultycurriculumreducer from "./Faculty/slices/facultycurriculum";
import admincurriculumreducer from "./slices/admin/adminListSlice";

const reducersSlice = {
  //interviewwer
  registerInterviewerReducer: registerInterviewerSlice.reducer,

  //admin curriculum
  adminCurriculumReducer: admincurriculumreducer,

  // faculty curriculum
  facultyCurriculumReducer: facultycurriculumreducer,

  // LISTS
  /* Dashboard */
  testsByDateReducer: testsByDateSlice.reducer,
  /* Test-Creation */
  assessmentListReducer: assessmentListSlice.reducer,
  /* Assessment-View*/
  technologiesListReducer: technologiesListSlice.reducer,
  modulesListReducer: modulesListSlice.reducer,
  topicsListReducer: topicsListSlice.reducer,
  subTopicsListReducer: subTopicsListSlice.reducer,
  questionListReducer: questionListSlice.reducer,
  /* Enroll-Student */
  enrollListReducer: enrollListSlice.reducer,
  testListReducer: testListSlice.reducer,
  batchDetailsListReducer: batchDetailsListSlice.reducer,
  studentListReducer: studentListSlice.reducer,
  deleteEnrollReducer: deleteEnrollItemSlice.reducer,
  /* User-Management */
  facultyListReducer: facultyListSlice.reducer,
  mentorListReducer: mentorListSlice.reducer,
  batchListReducer: batchListSlice.reducer,
  studentListByTechModuleReducer: studentListByTechModuleSlice.reducer,

  // LOADERS
  /* Assessment-View*/
  listOfAssessmentPageReducer: listOfAssessmentPageSlice.reducer,
  technologyPageReducer: technologyPageSlice.reducer,
  assessmentPageReducer: assessmentPageSlice.reducer,
  schedulePageReducer: schedulePageSlice.reducer,
  /* Enroll-Student */
  testSelectionPageReducer: testSelectionPageSlice.reducer,
  /* User-Management */
  userManagementPageReducer: userManagementSlice.reducer,
  retriveBatchDetailsReducer: retriveBatchDetailsSlice.reducer,
  retriveUserSelectionPageReducer: retriveUserSelectionPageSlice.reducer,

  // ACTIONS
  /* Enroll-Student */
  submitEnrollStudentPageReducer: submitEnrollStudentPageSlice.reducer,
  /* User-Management */
  submitBatchCreationActionReducer: submitBatchCreationActionSlice.reducer,

  // UTIL
  availableDBQuestionCountReducer: availableDBQuestionCountSlice.reducer,
  userSelectionReducer: userSelectionSlice.reducer,
  enrollStudentReducer: enrollStudentSlice.reducer,
  excelStudnetReducer: excelStudentSlice.reducer,

  //db reducers
  technologiesListReducerDB: technologiesListSliceDB.reducer,
  selectedTechnologyReducer: selectedtechnologySlice.reducer,
  createNewTechnologyReducer: createTechnologySlice.reducer,
  deleteTechnologyReducer: deleteTechnologySlice.reducer,
  editTechnologyReducer: editTechnologySlice.reducer,
  excelTechnologyReducer: excelTechnologySlice.reducer,

  modulesListReduer: modulesListSlice.reducer,
  createNewModuleReducer: createModuleSlice.reducer,
  deleteModuleReducer: deleteModuleSlice.reducer,
  editModuleReducer: editModuleSlice.reducer,
  excelModuleReducer: excelModuleSlice.reducer,
  modulesByTechidReducer: moduleTechIdSlice.reducer,

  topicsListReducer: topicsListSlice.reducer,
  createTopicReducer: createTopicSlice.reducer,
  deleteTopicReducer: deleteTopicSlice.reducer,
  editTopicReducer: editTopicSlice.reducer,
  excelTopicReducer: excelTopicSlice.reducer,

  subtopicsListReducer: subTopicListSlice.reducer,
  createSubTopicReducer: createSubTopicSlice.reducer,
  editSubTopicReducer: editSubTopicSlice.reducer,
  deleteSubTopicReducer: deleteSubTopicSlice.reducer,
  excelSubTopicReducer: excelSubTopicSlice.reducer,

  QuestionListReducer: questionListSlice.reducer,
  QuestionImageListReducer: questionImagelistslice.reducer,
  createQuestionReducer: createQuestionlice.reducer,
  editQuestionReducer: editQuestionSlice.reducer,
  deleteQuestionReducer: deleteQuestionSlice.reducer,
  excelQuestionReducer: excelQuestionSlice.reducer,

  GroupParagraphLisReducer: groupparagraphListSlice.reducer,
  ProgramCodeLisReducer: programcodeListSlice.reducer,

  createQuestionFormDataReducer: createQuestionFormDataSlice.reducer,
  editQuestionFormDataReducer: editQuestionFormDataSlice.reducer,
  cascadeResultReducer: cascadeResultSlice.reducer,

  p_programs: p_programsSlice.reducer,
  p_deleteProgram: p_deleteProgramSlice.reducer,
  p_testCasesList: p_testCasesListSlice.reducer,
  p_technology: p_technologySlice.reducer,
  p_modules: p_moduleSlice.reducer,
  p_topics: p_topicsSlice.reducer,
  p_subtopics: p_subTopicsSlice.reducer,
  p_a_addProgram: p_a_addProgramSlice.reducer,
  p_a_languages: p_a_languageSlice.reducer,
  p_a_modules: p_a_moduleSlice.reducer,
  p_a_topics: p_a_topicsSlice.reducer,
  p_a_subtopics: p_a_subTopicsSlice.reducer,

  t_programs: t_programsSlice.reducer,
  t_testcases: t_testcasesSlice.reducer,
  t_a_add_testcases: t_a_add_testcasesSlice.reducer,
  t_deleteTestcases: t_deleteTestcasesSlice.reducer,
  t_technology: t_technologySlice.reducer,
  t_modules: t_moduleSlice.reducer,
  t_topics: t_topicsSlice.reducer,
  t_subtopics: t_subTopicsSlice.reducer,

  t_a_programs: t_a_programsSlice.reducer,
  t_a_modules: t_a_moduleSlice.reducer,
  t_a_topics: t_a_topicsSlice.reducer,
  t_a_subtopics: t_a_subTopicsSlice.reducer,
};

const reducers = combineReducers(reducersSlice);

export default reducers;
