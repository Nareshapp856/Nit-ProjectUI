import { call, put } from "redux-saga/effects";
import {
  FetchTestcasesByProgramIDApi,
  deleteTestCasesApi,
} from "../../../services/QuestionDB/api";
import {
  fetchTestCasesError,
  fetchTestCasesStart,
  fetchTestCasesSuccess,
  requestDeleteTestcasesError,
  requestDeleteTestcasesStart,
  requestDeleteTestcasesSuccess,
} from "../../slices/testcaseVite/testcasesSlice";

export function* t_testCasesSaga(action) {
  try {
    yield put(fetchTestCasesStart({}));

    const res = yield call(FetchTestcasesByProgramIDApi, action.payload);

    yield put(fetchTestCasesSuccess({ ...res }));
  } catch (error) {
    yield put(
      fetchTestCasesError({
        error: { error: error?.name },
        status: error?.response?.status,
      })
    );
  }
}

export function* t_deleteTestCasesSaga(action) {
  try {
    yield put(requestDeleteTestcasesStart({}));

    const res = yield call(deleteTestCasesApi, action.payload);

    yield put(requestDeleteTestcasesSuccess({ ...res }));
  } catch (error) {
    yield put(
      requestDeleteTestcasesError({
        error: { error: error?.name },
        status: error?.response?.status,
      })
    );
  }
}
