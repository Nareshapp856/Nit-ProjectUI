import { call, put } from "redux-saga/effects";

import {
  fetchProgramsError,
  fetchProgramsStart,
  fetchProgramsSuccess,
} from "../../slices/testcaseView/testcasesSlice";
import { fetchProgramsByTechnbologyApi } from "../../../services/api";

export function* programsSaga(action) {
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
