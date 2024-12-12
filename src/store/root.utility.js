import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //
  isLoading: false,
  // if refetching current data is stale
  stale: false,
  // true if if data is loading and if rejucted
  isPending: false,
  // holds data returned by response
  data: undefined,
  // response status
  statusCode: null,
  // response status text
  statusText: "",
  // data resolved successfully
  isSuccess: false,
  //
  isError: false,
  // holds error object
  error: false,
  // state is stale | resolved | rejucted
  state: "stale",
};

function getSlice(name) {
  return createSlice({
    name,
    initialState,
    reducers: {
      // loading started
      fetchStart(state) {
        state.isLoading = true;
        state.stale = true;
        state.statusText = "";
        state.isPending = true;
        state.isError = false;
        state.statusCode = 0;
        state.state = "pending";
      },
      // fetch resolved
      fetchSuccess(state, action) {

        state.data = action.payload.data;
        state.statusCode = action.payload.statusCode || 0;
        state.statusText = action.payload.statusText || "";
        state.isPending = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.stale = false;
        state.state = "resolved";
      },
      //
      fetchFailure(state, action) {
        state.isError = true;
        state.error = action.payload.errorMessage; // Include only the error message
        state.statusCode = action.payload.statusCode || 0;
        state.statusText = action.payload.statusText || "";
        state.isSuccess = false;
        state.isLoading = false;
        state.state = "rejected";
      },
      resetState(state) {
        state.isLoading = initialState.isLoading;
        state.stale = initialState.stale;
        state.isPending = initialState.isPending;
        state.data = initialState.data;
        state.statusCode = initialState.statusCode;
        state.statusText = initialState.statusText;
        state.isSuccess = initialState.isSuccess;
        state.isError = initialState.isError;
        state.error = initialState.error;
        state.state = initialState.state;
      },
      updateState(state, action) {
        state.state = action.payload;
      },
    },
  });
}

export default getSlice;
