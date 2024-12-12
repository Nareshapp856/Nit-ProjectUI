import { call, put } from "redux-saga/effects";

import {
  addProgramApi,
  fetchLanguagesApi,
  fetchModulesApi,
  fetchSubTopicsApi,
  fetchTopicsApi,
} from "../../../services/QuestionDB/api";
import {
  p_a_addProgramError,
  p_a_addProgramRequest,
  p_a_addProgramSuccess,
  p_a_fetchLanguagesStart,
  p_a_fetchLanguagesSuccess,
  p_a_fetchModulesError,
  p_a_fetchModulesStart,
  p_a_fetchModulesSuccess,
  p_a_fetchSubTopicsError,
  p_a_fetchSubTopicsStart,
  p_a_fetchSubTopicsSuccess,
  p_a_fetchTopicsError,
  p_a_fetchTopicsStart,
  p_a_fetchTopicsSuccess,
} from "../../slices/programView/addModal";

export function* p_a_modulesSaga(action) {
  try {
    yield put(p_a_fetchModulesStart({}));

    const res = yield call(fetchModulesApi, action.payload);

    yield put(p_a_fetchModulesSuccess({ ...res }));
  } catch (error) {
    yield put(
      p_a_fetchModulesError({
        error: { error: error?.name },
        status: error?.response?.status,
      })
    );
  }
}

export function* p_a_topicsSaga(action) {
  try {
    yield put(p_a_fetchTopicsStart({}));

    const res = yield call(fetchTopicsApi, action.payload);

    yield put(p_a_fetchTopicsSuccess({ ...res }));
  } catch (error) {
    yield put(
      p_a_fetchTopicsError({
        error: { error: error?.name },
        status: error?.response?.status,
      })
    );
  }
}

export function* p_a_subTopicsSaga(action) {
  try {
    yield put(p_a_fetchSubTopicsStart({}));

    const res = yield call(fetchSubTopicsApi, action.payload);

    yield put(p_a_fetchSubTopicsSuccess({ ...res }));
  } catch (error) {
    yield put(
      p_a_fetchSubTopicsError({
        error: { error: error?.name },
        status: error?.response?.status,
      })
    );
  }
}

export function* p_a_fetchLanguages() {
  try {
    yield put(p_a_fetchLanguagesStart({}));

    const res = yield call(fetchLanguagesApi);

    yield put(p_a_fetchLanguagesSuccess({ ...res }));
  } catch (error) {
    yield put(
      p_a_fetchModulesError({
        error: { error: error?.name },
        status: error?.response?.status,
      })
    );
  }
}

export function* p_a_addProgramSage(action) {
  try {
    yield put(p_a_addProgramRequest({}));

    const res = yield call(addProgramApi, action.payload);
    yield put(p_a_addProgramSuccess({ ...res }));
  } catch (error) {
    yield put(
      p_a_addProgramError({
        error: { error: error?.name },
        status: error?.response?.status,
      })
    );
  }
}
