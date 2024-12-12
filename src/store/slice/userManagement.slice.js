import { createSlice } from "@reduxjs/toolkit";

const today = new Date();
const todayISOString = today.toISOString().substring(0, 10);

const initialState = {
  // Input Field
  batchName: "",
  //
  technologyId: 0,
  //
  moduleId: 0,
  // input field optional
  batchAdmin: "",
  // Batch start date
  startDate: todayISOString,
  // Batch end date
  endDate: "",
  // Faculty id comma separated
  facultyId: [],
  // mentor id's comma separated
  mentorId: [],
  // included students from table [{ "FirstName": "abc","LastName": "xyz","Email": "abc@gmail.com","PhoneNumber": "991252","BatchName":"batch1"}]
  includedStudents: [],
  // ...
  showWarn: false,
};

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    setBatchName(state, action) {
      state.batchName = action.payload;
    },
    setBatchAdmin(state, action) {
      state.batchAdmin = action.payload;
    },
    setTechnologyId(state, action) {
      state.technologyId = action.payload;
    },
    setModuleId(state, action) {
      state.moduleId = action.payload;
    },
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
    },
    setFaculityId(state, action) {
      state.facultyId = action.payload;
    },
    setMentorId(state, action) {
      state.mentorId = action.payload;
    },
    setIncludedStudentsArr(state, action) {
      state.includedStudents = action.payload;
    },
    setShowWarn(state, action) {
      state.showWarn = action.payload;
    },
    setData(state, action) {
      state.batchName = action.payload.batchName;
      state.batchAdmin = action.payload.batchAdmin;
      state.technologyId = action.payload.technologyId;
      state.moduleId = action.payload.moduleId;
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      state.facultyId = action.payload.facultyId;
      state.mentorId = action.payload.mentorId;
      state.includedStudents = action.payload.includedStudents;
      state.showWarn = action.payload.showWarn;
    },
    resetData(state, _) {
      state.batchName = initialState.batchName;
      state.batchAdmin = initialState.batchAdmin;
      state.technologyId = initialState.technologyId;
      state.moduleId = initialState.moduleId;
      state.startDate = initialState.startDate;
      state.endDate = initialState.endDate;
      state.facultyId = initialState.facultyId;
      state.mentorId = initialState.mentorId;
      state.includedStudents = initialState.includedStudents;
      state.showWarn = initialState.showWarn;
    },
  },
});

export const {
  setBatchName,
  setBatchAdmin,
  setTechnologyId,
  setModuleId,
  setStartDate,
  setEndDate,
  setFaculityId,
  setMentorId,
  setIncludedStudentsArr,
  setShowWarn,
  setData: setUserManagementSliceData,
  resetData: resetUserManagementData,
} = userManagementSlice.actions;

export default userManagementSlice;
