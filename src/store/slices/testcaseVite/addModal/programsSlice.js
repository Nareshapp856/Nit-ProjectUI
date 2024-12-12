import { getBasicGetSlice } from "../../../util";

export const t_a_programsSlice = getBasicGetSlice({
  sliceName: "t_a_programs",
});

export const {
  fetchStart: fetchProgramsStart,
  fetchSuccess: fetchProgramsSuccess,
  fetchError: fetchProgramsError,
  resetState: resetProgramsSlice,
} = t_a_programsSlice.actions;
