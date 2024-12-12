import { getBasicGetSlice } from "../../util";

export const p_technologySlice = getBasicGetSlice({
  sliceName: "p_technology",
});
export const p_moduleSlice = getBasicGetSlice({ sliceName: "p_module" });
export const p_topicsSlice = getBasicGetSlice({ sliceName: "p_topics" });
export const p_subTopicsSlice = getBasicGetSlice({ sliceName: "p_subTopics" });

export const {
  fetchStart: fetchTechnologyStart,
  fetchSuccess: fetchTechnologySuccess,
  fetchError: fetchTechnologyError,
  resetState: resetTechnologySlice,
} = p_technologySlice.actions;

export const {
  fetchStart: fetchModulesStart,
  fetchSuccess: fetchModulesSuccess,
  fetchError: fetchModulesError,
  resetState: resetModulesSlice,
} = p_moduleSlice.actions;

export const {
  fetchStart: fetchTopicsStart,
  fetchSuccess: fetchTopicsSuccess,
  fetchError: fetchTopicsError,
  resetState: resetTopicsSlice,
} = p_topicsSlice.actions;

export const {
  fetchStart: fetchSubTopicsStart,
  fetchSuccess: fetchSubTopicsSuccess,
  fetchError: fetchSubTopicsError,
  resetState: resetSubTopicsSlice,
} = p_subTopicsSlice.actions;
