import { getBasicGetSlice } from "../../../util";

export const t_a_technologySlice = getBasicGetSlice({
  sliceName: "t_a_technology",
});
export const t_a_moduleSlice = getBasicGetSlice({ sliceName: "t_a_module" });
export const t_a_topicsSlice = getBasicGetSlice({ sliceName: "t_a_topics" });
export const t_a_subTopicsSlice = getBasicGetSlice({
  sliceName: "t_a_subTopics",
});

export const {
  fetchStart: t_a_fetchTechnologyStart,
  fetchSuccess: t_a_fetchTechnologySuccess,
  fetchError: t_a_fetchTechnologyError,
  resetState: t_a_resetTechnologySlice,
} = t_a_technologySlice.actions;

export const {
  fetchStart: t_a_fetchModulesStart,
  fetchSuccess: t_a_fetchModulesSuccess,
  fetchError: t_a_fetchModulesError,
  resetState: t_a_resetModulesSlice,
} = t_a_moduleSlice.actions;

export const {
  fetchStart: t_a_fetchTopicsStart,
  fetchSuccess: t_a_fetchTopicsSuccess,
  fetchError: t_a_fetchTopicsError,
  resetState: t_a_resetTopicsSlice,
} = t_a_topicsSlice.actions;

export const {
  fetchStart: t_a_fetchSubTopicsStart,
  fetchSuccess: t_a_fetchSubTopicsSuccess,
  fetchError: t_a_fetchSubTopicsError,
  resetState: t_a_resetSubTopicsSlice,
} = t_a_subTopicsSlice.actions;
