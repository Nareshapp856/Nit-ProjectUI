import { call, put, takeLatest } from "redux-saga/effects";
import { b_types } from "../../types";
import {
  fetchFacultyCurriculumListStart,
  fetchFacultyCurriculumListSuccess,
  fetchFacultyCurriculumListError,
  fetchFacultyCurriculumStart,
  fetchFacultyCurriculumSuccess,
  fetchFacultyCurriculumError,
} from "../../slices/admin/adminListSlice";
import { ac_curriculumByIDApi, ac_curriculumListApi } from "../../Faculty/api";

export function* fc_facultyCurriculumListSaga(action) {
  try {
    yield put(fetchFacultyCurriculumListStart());

    const res = yield call(ac_curriculumListApi, action.payload);

    const { data, status } = res;

    yield put(fetchFacultyCurriculumListSuccess({ data, status }));
  } catch (error) {
    yield put(
      fetchFacultyCurriculumListError({
        error: { error: error.name, code: 999, message: error.message },
      })
    );
  }
}

export function* fc_facultyCurriculumSaga(action) {
  try {
    yield put(fetchFacultyCurriculumStart());

    const res = yield call(ac_curriculumByIDApi, action.payload);

    const { data, status } = res;

    yield put(
      fetchFacultyCurriculumSuccess({ data: data?.data?.recordset, status })
    );
  } catch (error) {
    yield put(
      fetchFacultyCurriculumError({
        error: { error: error.name, code: 999, message: error.message },
      })
    );
  }
}

export function* adminWatchFacultySaga() {
  yield takeLatest(b_types.AC_CURRICULUMLIST, fc_facultyCurriculumListSaga);
  yield takeLatest(b_types.AC_CURRICULUMBYID, fc_facultyCurriculumSaga);
}
