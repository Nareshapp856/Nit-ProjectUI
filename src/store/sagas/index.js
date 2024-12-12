import { takeLatest } from "redux-saga/effects";
import { technologySaga } from "./utils/technologies";
import { b_types } from "../types";
import { modulesSaga, subTopicsSaga, topicsSaga } from "./utils/modules";
import { deleteProgramSaga, programsSaga } from "./programView";
import {
  p_a_addProgramSage,
  p_a_fetchLanguages,
  p_a_modulesSaga,
  p_a_subTopicsSaga,
  p_a_topicsSaga,
} from "./programView/addModal";
import { t_technologySaga } from "./testcaseView/technologies";
import {
  t_a_addTestCasesSaga,
  t_a_modulesSaga,
  t_a_programsSaga,
  t_a_subTopicsSaga,
  t_a_topicsSaga,
} from "./testcaseView/addModal";
import { t_programsSaga } from "./testcaseView/programSaga";
import {
  t_deleteTestCasesSaga,
  t_testCasesSaga,
} from "./testcaseView/testCaseSaga";
import {
  t_modulesSaga,
  t_subTopicsSaga,
  t_topicsSaga,
} from "./testcaseView/modules";

export function* b_adminSaga() {
  yield takeLatest(b_types.P_FETCH_TECHNOLOGIES, technologySaga);
  yield takeLatest(b_types.P_FETCH_MODULES, modulesSaga);
  yield takeLatest(b_types.P_FETCH_TOPICS, topicsSaga);
  yield takeLatest(b_types.P_FETCH_SUBTOPICS, subTopicsSaga);

  yield takeLatest(b_types.P_FETCH_PROGRAMS, programsSaga);
  yield takeLatest(b_types.P_DELETE_PROGRAM, deleteProgramSaga);

  yield takeLatest(b_types.P_A_LANGAUAGES, p_a_fetchLanguages);
  yield takeLatest(b_types.P_A_ADD_PROGRMAS, p_a_addProgramSage);
  yield takeLatest(b_types.P_A_FETCH_MODULES, p_a_modulesSaga);
  yield takeLatest(b_types.P_A_FETCH_TOPICS, p_a_topicsSaga);
  yield takeLatest(b_types.P_A_FETCH_SUBTOPICS, p_a_subTopicsSaga);

  //
  yield takeLatest(b_types.T_FETCH_TECHNOLOGIES, t_technologySaga);
  yield takeLatest(b_types.T_FETCH_MODULES, t_modulesSaga);
  yield takeLatest(b_types.T_FETCH_TOPICS, t_topicsSaga);
  yield takeLatest(b_types.T_FETCH_SUBTOPICS, t_subTopicsSaga);

  yield takeLatest(b_types.T_FETCH_PROGRAMS, t_programsSaga);
  yield takeLatest(b_types.T_FETCH_TESTCASES, t_testCasesSaga);
  yield takeLatest(b_types.T_DELETE_TESTCASES, t_deleteTestCasesSaga);
  yield takeLatest(b_types.T_A_ADD_TESTCASES, t_a_addTestCasesSaga);
  yield takeLatest(b_types.T_A_FETCH_PROGRAMS, t_a_programsSaga);

  yield takeLatest(b_types.T_A_FETCH_MODULES, t_a_modulesSaga);
  yield takeLatest(b_types.T_A_FETCH_TOPICS, t_a_topicsSaga);
  yield takeLatest(b_types.T_A_FETCH_SUBTOPICS, t_a_subTopicsSaga);
}
