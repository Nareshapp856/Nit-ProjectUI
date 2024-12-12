import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isLoaded: false,
  request: {},
  response: {},
  error: {},
  reset: false,
  isSuccess: false,
  isError: false,
  flag: false,
};

export const getSlice = (name) =>
  createSlice({
    name,
    initialState,
    reducers: {
      request: (state, action) => {
        state.isLoading = true;
        state.isLoaded = false;
        state.request = action.payload;

        state.error = {};
        state.reset = false;
        state.isSuccess = false;
        state.isError = false;
        state.flag = false;
      },

      response: (state, action) => {
        state.isLoading = false;
        state.isLoaded = true;
        state.response = action.payload;

        state.error = {};
        state.reset = false;
        state.isSuccess = true;
        state.isError = false;
        state.flag = false;
      },
      error: (state, action) => {
        state.isLoading = false;
        state.isLoaded = true;
        state.response = {};
        state.error = action.payload;
        state.response = {};
        state.reset = false;
        state.isSuccess = false;
        state.isError = true;
        state.flag = false;
      },

      flag: (state) => {
        state.flag = true;
      },
      reset: (state) => {
        state.isLoading = false;
        state.isLoaded = false;
        state.request = {};
        state.response = {};
        state.error = {};
        state.reset = true;
        state.isSuccess = false;
        state.isError = false;
        state.flag = false;
      },
      put: (state, action) => {
        state.response = action.payload;
      },
    },
  });
