import { getBasicGetSlice } from "../../../util";

export const t_a_add_testcasesSlice = getBasicGetSlice({
  sliceName: "t_a_add_testcases",
});

export const {
  fetchStart: t_a_addTestcasesRequest,
  fetchSuccess: t_a_addTestCasesSuccess,
  fetchError: t_a_addTestcasesError,
  resetState: t_a_resetTestCasesSlice,
} = t_a_add_testcasesSlice.actions;
