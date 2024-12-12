export const b_types = {
  P_FETCH_TECHNOLOGIES: "p_fetchtechnologies",
  P_FETCH_MODULES: "p_fetchmodules",
  P_FETCH_TOPICS: "p_fetchtopics",
  P_FETCH_SUBTOPICS: "p_fetchsubtopics",

  P_FETCH_PROGRAMS: "p_fetch_programs",
  P_DELETE_PROGRAM: "p_delete_program",

  P_A_LANGAUAGES: "p_a_languages",
  P_A_ADD_PROGRMAS: "p_a_add_programs",
  P_A_FETCH_MODULES: "p_a_fetch_modules",
  P_A_FETCH_TOPICS: "p_a_fetch_topics",
  P_A_FETCH_SUBTOPICS: "p_a_fetch_subtopics",

  T_FETCH_TECHNOLOGIES: "t_fetchtechnologies",
  T_FETCH_MODULES: "t_fetchmodules",
  T_FETCH_TOPICS: "t_fetchtopics",
  T_FETCH_SUBTOPICS: "t_fetchsubtopics",

  T_FETCH_PROGRAMS: "t_fetch_programd",
  T_FETCH_TESTCASES: "t_fetch_testcases",
  T_DELETE_TESTCASES: "t_delete_testcases",
  T_A_FETCH_PROGRAMS: "t_a_fetch_programd",

  T_A_ADD_TESTCASES: "t_a_add_testcases",
  T_A_FETCH_TECHNOLOGIES: "t_a_fetchtechnologies",
  T_A_FETCH_MODULES: "t_a_fetch_modules",
  T_A_FETCH_TOPICS: "t_a_fetch_topics",
  T_A_FETCH_SUBTOPICS: "t_a_fetch_subtopics",

  // Interviewer
  REGISTER_INTERVIEWER: "register_interviewer",
  SUBMIT_EVOLUTIONSHEET: "submit_evolutionsheet",

  // Admin
  // Home
  AC_CURRICULUMLIST: "ac_curriculumlist",
  AC_CURRICULUMBYID: "ac_curriculumbyid",
};

export const fetchProgramsDispatch = (payload) => ({
  type: b_types.P_FETCH_PROGRAMS,
  payload,
});

export const deleteProgramDispatch = (payload) => ({
  type: b_types.P_DELETE_PROGRAM,
  payload,
});

export const fetchTechnologyDispatch = (payload) => ({
  type: b_types.P_FETCH_TECHNOLOGIES,
  payload,
});
export const fetchModuleDispatch = (payload) => ({
  type: b_types.P_FETCH_MODULES,
  payload,
});
export const fetchTopicDispatch = (payload) => ({
  type: b_types.P_FETCH_TOPICS,
  payload,
});
export const fetchSubTopicDispatch = (payload) => ({
  type: b_types.P_FETCH_SUBTOPICS,
  payload,
});

export const p_a_addProgramDispatch = (payload) => ({
  type: b_types.P_A_ADD_PROGRMAS,
  payload,
});

export const p_a_fetchModulesDispatch = (payload) => ({
  type: b_types.P_A_FETCH_MODULES,
  payload,
});

export const p_a_fetchLanguagesDispatch = (payload) => ({
  type: b_types.P_A_LANGAUAGES,
  payload,
});

export const p_a_fetchTopicsDispatch = (payload) => ({
  type: b_types.P_A_FETCH_TOPICS,
  payload,
});

export const p_a_fetchSubtopicsDispatch = (payload) => ({
  type: b_types.P_A_FETCH_SUBTOPICS,
  payload,
});

export const t_fetchProgramsDispatch = (payload) => ({
  type: b_types.T_FETCH_PROGRAMS,
  payload,
});

export const t_fetchTestCasesDispatch = (payload) => ({
  type: b_types.T_FETCH_TESTCASES,
  payload,
});

export const t_a_fetchProgramsDispatch = (payload) => ({
  type: b_types.T_A_FETCH_PROGRAMS,
  payload,
});

export const t_a_fetchTechnologyDispatch = (payload) => {
  return {
    type: b_types.T_A_FETCH_TECHNOLOGIES,
    payload,
  };
};

export const t_a_fetchModulesDispatch = (payload) => ({
  type: b_types.T_A_FETCH_MODULES,
  payload,
});

export const t_a_fetchTopicsDispatch = (payload) => ({
  type: b_types.T_A_FETCH_TOPICS,
  payload,
});

export const t_a_fetchSubtopicsDispatch = (payload) => ({
  type: b_types.T_A_FETCH_SUBTOPICS,
  payload,
});

export const t_a_add_testcasesDispatch = (payload) => ({
  type: b_types.T_A_ADD_TESTCASES,
  payload,
});

export const t_fetchTechnologyDispatch = (payload) => ({
  type: b_types.T_FETCH_TECHNOLOGIES,
  payload,
});
export const t_fetchModuleDispatch = (payload) => ({
  type: b_types.T_FETCH_MODULES,
  payload,
});
export const t_fetchTopicDispatch = (payload) => ({
  type: b_types.T_FETCH_TOPICS,
  payload,
});
export const t_fetchSubTopicDispatch = (payload) => ({
  type: b_types.T_FETCH_SUBTOPICS,
  payload,
});

export const t_deleteTestcasesDispatch = (payload) => ({
  type: b_types.T_DELETE_TESTCASES,
  payload,
});
