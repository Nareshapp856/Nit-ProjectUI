import { getBasicGetSlice } from "../../Faculty/util/get";

export const ac_facultyCurriculumListSlice = getBasicGetSlice({
  sliceName: "ac_facultyCurriculumList",
});

export const ac_facultyCurriculumSlice = getBasicGetSlice({
  sliceName: "ac_facultyCurriculum",
});

export const {
  fetchStart: fetchFacultyCurriculumListStart,
  fetchSuccess: fetchFacultyCurriculumListSuccess,
  fetchError: fetchFacultyCurriculumListError,
  resetSlice: resetFacultyCurriculumList,
} = ac_facultyCurriculumListSlice.actions;

export const {
  fetchStart: fetchFacultyCurriculumStart,
  fetchSuccess: fetchFacultyCurriculumSuccess,
  fetchError: fetchFacultyCurriculumError,
  resetSlice: resetFacultyCurriculumSlice,
} = ac_facultyCurriculumSlice.actions;

export default ac_facultyCurriculumListSlice.reducer;
