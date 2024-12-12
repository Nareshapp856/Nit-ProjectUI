import { createSlice } from "@reduxjs/toolkit";

const baseState = {
  data: null,
  isLoading: false,
  isError: false,
  error: null,
  state: "stale",
  status: null,
  features: {},
};

export const t_programsSlice = createSlice({
  name: "t_programs",
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

export const {
  fetchStart: fetchProgramsStart,
  fetchSuccess: fetchProgramsSuccess,
  fetchError: fetchProgramsError,
  resetSlice: resetProgramsSlice,
} = t_programsSlice.actions;
