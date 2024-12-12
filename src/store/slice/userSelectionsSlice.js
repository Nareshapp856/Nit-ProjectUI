import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // String Represemting TestID
  testId: undefined,
  // String Represemting testDetailsId
  testDetailsId: undefined,
  // Object holds selected Technology
  technology: undefined,
  // Object holds selected Module
  module: undefined,
  // Object holds selected Module
  topic: undefined,
  // Object holds selected Module
  subTopic: undefined,
  // String holds natureofassessment radio value
  natureOfAssessment: undefined,
  // String holds random radio value
  random: undefined,
  // Object holds assessments object with keys being assessments like MCQ and value {total, easy, medium, hard}
  assessments: {},
};

export const userSelectionSlice = createSlice({
  name: "userSelection",
  initialState,
  reducers: {
    setTestId(state, action) {
      state.testId = action.payload;
    },
    setTechnology(state, action) {
      state.technology = action.payload;
    },
    setModule(state, action) {
      state.module = action.payload;
    },
    setTopic(state, action) {
      state.topic = action.payload;
    },
    setSubTopic(state, action) {
      state.subTopic = action.payload;
    },
    setNatureOfAssessment(state, action) {
      state.natureOfAssessment = action.payload;
    },
    setRandom(state, action) {
      state.random = action.payload;
    },
    setAssessment(state, action) {
      state.assessments = action.payload;
    },
    setTestDetailsId(state, action) {
      state.testDetailsId = action.payload;
    },
  },
});
