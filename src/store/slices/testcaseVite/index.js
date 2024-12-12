import { getBasicGetSlice } from "../../util";

export const t_technologySlice = getBasicGetSlice({
  sliceName: "t_technology",
});
export const t_moduleSlice = getBasicGetSlice({ sliceName: "t_module" });
export const t_topicsSlice = getBasicGetSlice({ sliceName: "t_topics" });
export const t_subTopicsSlice = getBasicGetSlice({ sliceName: "t_subTopics" });

export const {
  fetchStart: fetchTechnologyStart,
  fetchSuccess: fetchTechnologySuccess,
  fetchError: fetchTechnologyError,
  resetState: resetTechnologySlice,
} = t_technologySlice.actions;

export const {
  fetchStart: fetchModulesStart,
  fetchSuccess: fetchModulesSuccess,
  fetchError: fetchModulesError,
  resetState: resetModulesSlice,
} = t_moduleSlice.actions;

export const {
  fetchStart: fetchTopicsStart,
  fetchSuccess: fetchTopicsSuccess,
  fetchError: fetchTopicsError,
  resetState: resetTopicsSlice,
} = t_topicsSlice.actions;

export const {
  fetchStart: fetchSubTopicsStart,
  fetchSuccess: fetchSubTopicsSuccess,
  fetchError: fetchSubTopicsError,
  resetState: resetSubTopicsSlice,
} = t_subTopicsSlice.actions;
