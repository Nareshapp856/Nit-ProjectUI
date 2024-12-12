import { b_types } from "../types";

export const ac_curriculumList = (payload) => ({
  type: b_types.AC_CURRICULUMLIST,
  payload,
});

export const ac_curriculumById = (payload) => ({
  type: b_types.AC_CURRICULUMBYID,
  payload,
});
