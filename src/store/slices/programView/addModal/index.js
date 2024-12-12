import { getBasicGetSlice } from "../../../util";

export const p_a_moduleSlice = getBasicGetSlice({ sliceName: "p_a_module" });
export const p_a_topicsSlice = getBasicGetSlice({ sliceName: "p_a_topics" });
export const p_a_subTopicsSlice = getBasicGetSlice({
  sliceName: "p_a_subTopics",
});
export const p_a_languageSlice = getBasicGetSlice({
  sliceName: "p_a_languages",
});
export const p_a_addProgramSlice = getBasicGetSlice({
  sliceName: "p_a_addProgram",
});

export const {
  fetchStart: p_a_addProgramRequest,
  fetchSuccess: p_a_addProgramSuccess,
  fetchError: p_a_addProgramError,
  resetState: p_a_resetAddProgramSlice,
} = p_a_addProgramSlice.actions;

export const {
  fetchStart: p_a_fetchLanguagesStart,
  fetchSuccess: p_a_fetchLanguagesSuccess,
  fetchError: p_a_fetchLanguagesError,
  resetState: p_a_resetLanguagesSlice,
} = p_a_languageSlice.actions;

export const {
  fetchStart: p_a_fetchModulesStart,
  fetchSuccess: p_a_fetchModulesSuccess,
  fetchError: p_a_fetchModulesError,
  resetState: p_a_resetModulesSlice,
} = p_a_moduleSlice.actions;

export const {
  fetchStart: p_a_fetchTopicsStart,
  fetchSuccess: p_a_fetchTopicsSuccess,
  fetchError: p_a_fetchTopicsError,
  resetState: p_a_resetTopicsSlice,
} = p_a_topicsSlice.actions;

export const {
  fetchStart: p_a_fetchSubTopicsStart,
  fetchSuccess: p_a_fetchSubTopicsSuccess,
  fetchError: p_a_fetchSubTopicsError,
  resetState: p_a_resetSubTopicsSlice,
} = p_a_subTopicsSlice.actions;
