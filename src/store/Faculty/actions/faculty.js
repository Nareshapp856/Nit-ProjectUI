import { types } from "./types";

export const at_fetchStudentsDispatch = (payload) => ({
  type: types.AT_STUDENTS_LIST,
  payload,
});

export const at_fetchSlotsDispatch = (payload) => ({
  type: types.AT_SLOTS_LIST,
  payload,
});

export const at_submitActionsDispatch = (payload) => ({
  type: types.AT_SUBMITACTIONS,
  payload,
});

export const at_retrieveDetailsDispatch = (payload) => ({
  type: types.AT_RETRIEVEDETAILS,
  payload,
});

export const fc_facultyCurriculumListDispatch = (payload) => ({
  type: types.FC_FACULTYCURRICULUMLIST,
  payload,
});
