import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  excelImports: [],
  availableStudents: [],
  isLoading: true,
  error: false,
};

export const excelStudentSlice = createSlice({
  name: "studnets",
  initialState,
  reducers: {
    insertStdunet(state, action) {
      state.excelImports = [...state.excelImports, action.payload];
    },
    insertExcelStudents(state, action) {
      state.excelImports = [...state.excelImports, ...action.payload];
    },
    insertAvailableStudents(state, action) {
      state.availableStudents = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    resetData(state, _) {
      state.excelImports = initialState.excelImports;
      state.availableStudents = initialState.availableStudents;
      state.isLoading = initialState.isLoading;
      state.error = initialState.error;
    },
  },
});

export const {
  insertStdunet,
  insertExcelStudents,
  insertAvailableStudents,
  setIsLoading,
  setError,
  resetData: resetExcelImportData,
} = excelStudentSlice.actions;

export default excelStudentSlice.reducer;
