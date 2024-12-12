import { b_types } from "../types";

export const registerInterviewerDispatch = (payload) => ({
  type: b_types.REGISTER_INTERVIEWER,
  payload,
});

export const submitEvolutionSheetDispatch = (payload) => ({
  type: b_types.SUBMIT_EVOLUTIONSHEET,
  payload,
});
