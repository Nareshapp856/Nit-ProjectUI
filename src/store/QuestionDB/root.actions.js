const types = {
  TECHNOLOGIES_LIST: "technologieslist",
  CREATE_TECHNOLOGY: "createtechnology",
  EDIT_TECHNOLOGY: "editTechnology",
  DELETE_TECHNOLOGY: "deleteTechnology",
  EXCEL_TECHNOLOGY: "excelTechnology",
  PROGRAMCODE_LIST: "programcodelist",
  CASCADERESULT_LIST: "cascadresultlist",

  MODULES_LIST: "moduleslist",
  CREATE_MODULE: "createmodule",
  EDIT_MODULE: "editmodule",
  DELETE_MODULE: "deletemodule",
  EXCEL_MODULE: "excelmodule",
  MODULES_LIST_TECHNOLOGY: "moduleslisttechnology",

  TOPIC_LIST: "topiclist",
  CREATE_TOPIC: "createtopic",
  EDIT_TOPIC: "edittopic",
  DELETE_TOPIC: "deletetopic",
  EXCEL_TOPIC: "exceltopic",

  SUBTOPIC_LIST: "subtopiclist",
  CREATE_SUBTOPIC: "createsubtopic",
  EDIT_SUBTOPIC: "editsubtopic",
  DELETE_SUBTOPIC: "deletesubtopic",
  EXCEL_SUBTOPIC: "excelsubtopic",

  QUESTIONS_LIST: "questionlist",
  QUESTIONS_IMAGELIST: "qimagelist",
  CREATE_QUESTION: "createquestion",
  EDIT_QUESTION: "editquestion",
  DELETE_QUESTION: "deletequestion",
  EXCEL_QUESTION: "excelquestion",

  CREATE_QUESTIONFORMDATA: "createquestionformdata",
  EDIT_QUESTIONFORMDATA: "editquestionformdata",

  SELECTED_TECHNOLOGY: "selectedtechnology",
  SELECTED_MODULE: "selectedmodule",
  SELECTED_TOPIC: "selectedtopic",
  SELECTED_SUBTOPIC: "selectedsubtopic",

  GROUPPARAGRAPH_LIST: "groupparagraphlist",

  P_PROGRAM_LIST: "p_programlist",
  P_TESTCASES_LIST: "p_testcaseslist",
  T_PROGRAM_LIST: "t_programlist",
  T_TESTCASES_LIST: "t_testcaseslist",
};
export { types };

export const getProgramsByTechnologies = (payload) => ({
  type: types.P_PROGRAM_LIST,
  payload,
});

export const getTestcasesByProgram = (payload) => ({
  type: types.P_TESTCASES_LIST,
  payload,
});
