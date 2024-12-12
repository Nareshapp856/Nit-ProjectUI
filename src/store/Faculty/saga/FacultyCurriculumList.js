import { call, put, takeLatest } from "redux-saga/effects";
import { types } from "../../Faculty/actions/types";
import {
  fetchFacultyCurriculumListError,
  fetchFacultyCurriculumListStart,
  fetchFacultyCurriculumListSuccess,
} from "../../Faculty/slices/facultycurriculum";
import { fc_facultyCurriculumListApi } from "../../Faculty/api";

export function* fc_facultyCurriculumListSaga(action) {
  try {
    yield put(fetchFacultyCurriculumListStart());

    const res = yield call(fc_facultyCurriculumListApi, action.payload);
    console.log(res);
    yield put(fetchFacultyCurriculumListSuccess(res));
  } catch (error) {
    yield put(
      fetchFacultyCurriculumListError({
        error: { error: error.name, code: 999, message: error.message },
      })
    );
  }
}

export function* facultyWatcherSaga() {
  yield takeLatest(
    types.FC_FACULTYCURRICULUMLIST,
    fc_facultyCurriculumListSaga
  );
}
