import { call, put } from "redux-saga/effects";

import {
  fetchTechnologyError,
  fetchTechnologyStart,
  fetchTechnologySuccess,
} from "../../slices/programView";
import { fetchTechnologiesApi } from "../../../services/QuestionDB/api";

export function* technologySaga(action) {
  try {
    yield put(fetchTechnologyStart({}));

    const res = yield call(fetchTechnologiesApi, action.payload);

    yield put(fetchTechnologySuccess({ ...res }));
  } catch (error) {
    yield put(
      fetchTechnologyError({
        error: { error: error?.name },
        status: error?.response?.status,
      })
    );
  }
}
