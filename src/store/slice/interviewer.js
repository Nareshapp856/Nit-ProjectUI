import { getBasicGetSlice } from "../util/getRegister";

export const registerInterviewerSlice = getBasicGetSlice({
  sliceName: "registerinterviewer",
});

export const submitEvolutionSheetSlice = getBasicGetSlice({
  sliceName: "submitEvolutionSheet",
});

export const {
  resetSlice: resetInterviewerRegistrationSlice,
  fetchStart: requestRegisterInterviewer,
  fetchSuccess: registerInterviewerSuccess,
  fetchError: rejectRegisterInterviewer,
} = registerInterviewerSlice.actions;

export const {
  resetSlice: resetSubmitEvolutionSheetSlice,
  fetchStart: submitEvolutionSheetStart,
  fetchSuccess: submitEvolutionSheetSuccess,
  fetchError: submitEvolutionSheetError,
} = submitEvolutionSheetSlice.actions;
