import { call, put } from "redux-saga/effects";

import {
  fetchModulesError,
  fetchModulesStart,
  fetchModulesSuccess,
  fetchSubTopicsError,
  fetchSubTopicsStart,
  fetchSubTopicsSuccess,
  fetchTopicsError,
  fetchTopicsStart,
  fetchTopicsSuccess,
} from "../../slices/programView";
import {
  fetchModulesApi,
  fetchSubTopicsApi,
  fetchTopicsApi,
} from "../../../services/QuestionDB/api";

export function* modulesSaga(action) {
  try {
    yield put(fetchModulesStart({}));

    const res = yield call(fetchModulesApi, action.payload);

    yield put(fetchModulesSuccess({ ...res }));
  } catch (error) {
    yield put(
      fetchModulesError({
        error: { error: error?.name },
        status: error?.response?.status,
      })
    );
  }
}

export function* topicsSaga(action) {
  try {
    yield put(fetchTopicsStart({}));

    const res = yield call(fetchTopicsApi, action.payload);

    yield put(fetchTopicsSuccess({ ...res }));
  } catch (error) {
    yield put(
      fetchTopicsError({
        error: { error: error?.name },
        status: error?.response?.status,
      })
    );
  }
}

export function* subTopicsSaga(action) {
  try {
    yield put(fetchSubTopicsStart({}));

    const res = yield call(fetchSubTopicsApi, action.payload);

    yield put(fetchSubTopicsSuccess({ ...res }));
  } catch (error) {
    yield put(
      fetchSubTopicsError({
        error: { error: error?.name },
        status: error?.response?.status,
      })
    );
  }
}
