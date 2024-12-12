import { createSlice } from "@reduxjs/toolkit";

const baseState = {
  isLoading: false,
  isError: false,
  error: null,
  data: null,
  errMsg: null,
  state: "stale",
  status: null,
  isPending: false,
};

export const getBasicGetSlice = ({
  sliceName,
  otherState,
  reducers: moreReducers = {},
}) => {
  return createSlice({
    name: sliceName,
    initialState: {
      ...baseState,
      ...otherState,
    },
    reducers: {
      ...moreReducers,
      fetchStart(state) {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
        state.state = "request";
        state.isPending = true;
        state.data = null;
        state.status = null;
        state.errMsg = null;
      },
      fetchSuccess(state, action) {
        state.isLoading = false;
        state.isError = false;
        state.error = null;
        state.isPending = false;
        state.errMsg = null;
        state.state = "response";
        state.data = action.payload?.data;
        state.status = action.payload?.status;
      },
      fetchError(state, action) {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload.error;
        state.state = "reject";
        state.data = null;
        state.errMsg = action.payload.errMsg;
        state.status = action.payload.status;
      },
      resetSlice(state) {
        state.isLoading = baseState.isLoading;
        state.isError = baseState.isError;
        state.error = baseState.error;
        state.data = baseState.data;
        state.state = baseState.state;
        state.status = baseState.status;
        state.errMsg = baseState.errMsg;
        state.isPending = baseState.isPending;
      },
    },
  });
};
