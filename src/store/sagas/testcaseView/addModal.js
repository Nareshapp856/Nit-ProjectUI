import { call, put } from "redux-saga/effects";

import {
  addTestCasesApi,
  fetchModulesApi,
  fetchProgramsByTechnbologyApi,
  fetchSubTopicsApi,
  fetchTopicsApi,
} from "../../../services/QuestionDB/api";
import {
  t_a_fetchModulesError,
  t_a_fetchModulesStart,
  t_a_fetchModulesSuccess,
  t_a_fetchSubTopicsError,
  t_a_fetchSubTopicsStart,
  t_a_fetchSubTopicsSuccess,
  t_a_fetchTopicsError,
  t_a_fetchTopicsStart,
  t_a_fetchTopicsSuccess,
} from "../../slices/testcaseVite/addModal";
import {
  fetchProgramsError,
  fetchProgramsStart,
  fetchProgramsSuccess,
} from "../../slices/testcaseVite/addModal/programsSlice";
import {
  t_a_addTestCasesSuccess,
  t_a_addTestcasesError,
  t_a_addTestcasesRequest,
} from "../../slices/testcaseVite/addModal/testcaseSlice";

export function* t_a_modulesSaga(action) {
  try {
    yield put(t_a_fetchModulesStart({}));

    const res = yield call(fetchModulesApi, action.payload);

    yield put(t_a_fetchModulesSuccess({ ...res }));
  } catch (error) {
    yield put(
      t_a_fetchModulesError({
        error: { error: error?.name },
        status: error?.response?.status,
      })
    );
  }
}

export function* t_a_topicsSaga(action) {
  try {
    yield put(t_a_fetchTopicsStart({}));

    const res = yield call(fetchTopicsApi, action.payload);

    yield put(t_a_fetchTopicsSuccess({ ...res }));
  } catch (error) {
    yield put(
      t_a_fetchTopicsError({
        error: { error: error?.name },
        status: error?.response?.status,
      })
    );
  }
}

export function* t_a_subTopicsSaga(action) {
  try {
    yield put(t_a_fetchSubTopicsStart({}));

    const res = yield call(fetchSubTopicsApi, action.payload);

    yield put(t_a_fetchSubTopicsSuccess({ ...res }));
  } catch (error) {
    yield put(
      t_a_fetchSubTopicsError({
        error: { error: error?.name },
        status: error?.response?.status,
      })
    );
  }
}

export function* t_a_programsSaga(action) {
  try {
    yield put(fetchProgramsStart({}));
    const res = yield call(fetchProgramsByTechnbologyApi, action.payload);

    yield put(fetchProgramsSuccess({ ...res }));
  } catch (error) {
    yield put(
      fetchProgramsError({
        error: { error: error?.name },
        status: error?.response?.status,
      })
    );
  }
}

export function* t_a_addTestCasesSaga(action) {
  try {
    yield put(t_a_addTestcasesRequest({}));
    const res = yield call(addTestCasesApi, action.payload);

    yield put(t_a_addTestCasesSuccess({ ...res }));
  } catch (error) {
    yield put(
      t_a_addTestcasesError({
        error: { error: error?.name },
        status: error?.response?.status,
      })
    );
  }
}
