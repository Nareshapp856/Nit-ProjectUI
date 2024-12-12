import { call, put } from "redux-saga/effects";

import {
  fetchTechnologyStart,
  fetchTechnologySuccess,
  fetchTechnologyError,
} from "../../slices/testcaseVite/";
import { fetchTechnologiesApi } from "../../../services/QuestionDB/api";

export function* t_technologySaga(action) {
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
