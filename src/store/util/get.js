import { createSlice } from "@reduxjs/toolkit";

const baseState = {
  isLoading: false,
  isError: false,
  error: null,
  data: null,
  state: "stale",
  status: null,
  isPending: false,
};

export const getBasicGetSlice = ({ sliceName, initialState }) => {
  return createSlice({
    name: sliceName,
    initialState: {
      ...baseState,
      ...initialState,
    },
    reducers: {
      fetchStart(state) {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.state = "request";
        state.isPending = true;
        state.data = null;
        state.status = null;
      },
      fetchSuccess(state, action) {
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.isPending = false;
        state.state = "reslove";
        state.data = action.payload.data;
        state.status = action.payload.status;
      },
      fetchError(state, action) {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload?.error;
        state.state = "reject";
        state.data = null;
        state.status = action.payload?.status;
      },
      resetState(state) {
        state.isLoading = baseState.isLoading;
        state.isError = baseState.isError;
        state.error = baseState.error;
        state.data = baseState.data;
        state.state = baseState.state;
        state.status = baseState.status;
        state.isPending = baseState.isPending;
      },
    },
  });
};
