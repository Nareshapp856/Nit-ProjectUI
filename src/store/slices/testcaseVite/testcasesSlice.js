import { getBasicGetSlice } from "../../util";

export const t_testcasesSlice = getBasicGetSlice({ sliceName: "t_testcases" });

export const t_deleteTestcasesSlice = getBasicGetSlice({
  sliceName: "t_deleteTestcases",
});

export const {
  fetchStart: fetchTestCasesStart,
  fetchSuccess: fetchTestCasesSuccess,
  fetchError: fetchTestCasesError,
  resetState: resetTestCasesSlice,
} = t_testcasesSlice.actions;

export const {
  fetchStart: requestDeleteTestcasesStart,
  fetchSuccess: requestDeleteTestcasesSuccess,
  fetchError: requestDeleteTestcasesError,
  resetState: resetDeleteTestcasesSlice,
} = t_deleteTestcasesSlice.actions;
