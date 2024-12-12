import { createSlice } from "@reduxjs/toolkit";
import { getBasicGetSlice } from "../../util";

const baseState = {
  data: null,
  isLoading: false,
  isError: false,
  error: null,
  state: "stale",
  status: null,
  features: {},
};

export const p_programsSlice = createSlice({
  name: "p_programs",
  initialState: baseState,
  reducers: {
    fetchStart(state) {
      state.data = null;
      state.isLoading = true;
      state.isError = null;
      state.error = null;
      state.state = "request";
      state.status = null;
    },
    fetchSuccess(state, action) {
      state.data = action.payload.data;
      state.isLoading = false;
      state.isError = false;
      state.error = null;
      state.state = "reslove";
      state.status = action.payload.status;
    },
    fetchError(state, action) {
      state.data = null;
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
      state.state = "reject";
      state.status = action.payload.status;
    },
  },
});

export const p_deleteProgramSlice = getBasicGetSlice({
  sliceName: "p_deleteProgram",
});

export const {
  fetchStart: requestDeleteProgramStart,
  fetchSuccess: requestDeleteProgramSuccess,
  fetchError: requestDeleteProgramError,
  resetState: resetDeleteProgramSlice,
} = p_deleteProgramSlice.actions;

export const {
  fetchStart: fetchProgramsStart,
  fetchSuccess: fetchProgramsSuccess,
  fetchError: fetchProgramsError,
  resetState: resetProgramsSlice,
} = p_programsSlice.actions;
