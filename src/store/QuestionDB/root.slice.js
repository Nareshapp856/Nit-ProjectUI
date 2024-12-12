import { getSlice } from "../redux.utility";
import { types } from "./root.actions";

const technologiesListSliceDB = getSlice(types.TECHNOLOGIES_LIST);
const modulesListSlice = getSlice(types.MODULES_LIST);

//const subtopicListSlice = getSlice(types.TSUBTOPIC_LIST);
const selectedtechnologySlice = getSlice(types.SELECTED_TECHNOLOGY);
const createTechnologySlice = getSlice(types.CREATE_TECHNOLOGY);
const deleteTechnologySlice = getSlice(types.DELETE_TECHNOLOGY);
const editTechnologySlice = getSlice(types.EDIT_TECHNOLOGY);
const excelTechnologySlice = getSlice(types.EXCEL_TECHNOLOGY);

const createModuleSlice = getSlice(types.CREATE_MODULE);
const deleteModuleSlice = getSlice(types.DELETE_MODULE);
const editModuleSlice = getSlice(types.EDIT_MODULE);
const excelModuleSlice = getSlice(types.EXCEL_MODULE);
const moduleTechIdSlice = getSlice(types.MODULES_LIST_TECHNOLOGY);

const topicsListSlice = getSlice(types.TOPIC_LIST);
const createTopicSlice = getSlice(types.CREATE_TOPIC);
const deleteTopicSlice = getSlice(types.DELETE_TOPIC);
const editTopicSlice = getSlice(types.EDIT_TOPIC);
const excelTopicSlice = getSlice(types.EXCEL_TOPIC);

const subTopicListSlice = getSlice(types.SUBTOPIC_LIST);
const createSubTopicSlice = getSlice(types.CREATE_SUBTOPIC);
const deleteSubTopicSlice = getSlice(types.DELETE_SUBTOPIC);
const editSubTopicSlice = getSlice(types.EDIT_SUBTOPIC);
const excelSubTopicSlice = getSlice(types.EXCEL_SUBTOPIC);

const questionListSlice = getSlice(types.QUESTIONS_LIST);
const questionImagelistslice = getSlice(types.QUESTIONS_IMAGELIST);
const createQuestionlice = getSlice(types.CREATE_QUESTION);
const deleteQuestionSlice = getSlice(types.DELETE_QUESTION);
const editQuestionSlice = getSlice(types.EDIT_QUESTION);
const excelQuestionSlice = getSlice(types.EXCEL_QUESTION);

const createQuestionFormDataSlice = getSlice(types.CREATE_QUESTIONFORMDATA);
const editQuestionFormDataSlice = getSlice(types.EDIT_QUESTIONFORMDATA);

const groupparagraphListSlice = getSlice(types.GROUPPARAGRAPH_LIST);
const programcodeListSlice = getSlice(types.PROGRAMCODE_LIST);
const cascadeResultSlice = getSlice(types.CASCADERESULT_LIST);

const p_programsListSlice = getSlice(types.P_PROGRAM_LIST);
const p_testCasesListSlice = getSlice(types.P_TESTCASES_LIST);

const t_programsListSlice = getSlice(types.T_PROGRAM_LIST);
const t_testCasesListSlice = getSlice(types.T_TESTCASES_LIST);

export {
  technologiesListSliceDB,
  selectedtechnologySlice,
  createTechnologySlice,
  deleteTechnologySlice,
  excelTechnologySlice,
  editTechnologySlice,
  programcodeListSlice,
  //
  modulesListSlice,
  createModuleSlice,
  deleteModuleSlice,
  editModuleSlice,
  excelModuleSlice,
  moduleTechIdSlice,
  //
  topicsListSlice,
  createTopicSlice,
  deleteTopicSlice,
  editTopicSlice,
  excelTopicSlice,
  //
  subTopicListSlice,
  createSubTopicSlice,
  deleteSubTopicSlice,
  editSubTopicSlice,
  excelSubTopicSlice,
  //
  questionListSlice,
  questionImagelistslice,
  createQuestionlice,
  deleteQuestionSlice,
  editQuestionSlice,
  excelQuestionSlice,
  //
  groupparagraphListSlice,
  createQuestionFormDataSlice,
  editQuestionFormDataSlice,
  cascadeResultSlice,
  //
  p_programsListSlice,
  p_testCasesListSlice,
  t_programsListSlice,
  t_testCasesListSlice,
};
