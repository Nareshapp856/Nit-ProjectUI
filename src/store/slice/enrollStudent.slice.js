import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Selected Technology Details
  technology: null,
  // Selected Module Details
  module: null,
  // Selected TestID List
  testIdList: [],
  // Selected BatchID List {testId: [...batchId]}
  batchIdList: {},
  // Stores Excluded students [testId:batchId:stdentdId]
  excludedStudents: [],

  /** IncludedStudents will be removed use as less as possible */
  // Included students from all Batches includedStudents: {batchId: [...(included students)]}
  includedStudents: {},
};

export const enrollStudentSlice = createSlice({
  name: "enrollStudentInclude", // Renamed from "enrollStudent" to "enrollStudentInclude"
  initialState,
  reducers: {
    setTechnology(state, action) {
      state.technology = action.payload;
    },
    setModule(state, action) {
      state.module = action.payload;
    },
    setTestIdList(state, action) {
      state.testIdList = action.payload;
    },
    setBatchIdList(state, action) {
      state.batchIdList = action.payload;
    },
    insertBatchId(state, action) {
      const { testId, batchId } = action.payload;
      if (!testId || !batchId) {
        throw new Error("Must pass valid data to insertBatchId");
      }

      if (!state.testIdList.includes(testId)) {
        state.testIdList.push(testId);
      }

      if (!Array.isArray(state.batchIdList[testId]))
        state.batchIdList[testId] = [];

      if (state.batchIdList[testId].includes(batchId)) {
      } else {
        state.batchIdList[testId].push(batchId);
      }
    },
    removeBatchId(state, action) {
      const { testId, batchId } = action.payload;

      if (!testId || !batchId) {
        throw new Error("Must pass valid data to insertBatchId");
      }

      if (!state.batchIdList[testId].includes(batchId)) {
      }

      if (!Array.isArray(state.batchIdList[testId])) {
      } else {
        const index = state.batchIdList[testId].indexOf(batchId);

        state.batchIdList[testId].splice(index, 1);

        if (state.batchIdList[testId].length === 0) {
          const flag = delete state.batchIdList[testId];

          if (!flag) {
          }
        }
      }
    },
    setExcludedArray(state, action) {
      state.excludedStudents = action.payload;
    },
    setIncludedStudents(state, action) {
      state.includedStudents = action.payload;
    },
    insertIncludedStudent(state, action) {
      const { testId, batchId, studentId } = action.payload;

      if (!testId || !batchId || !studentId) {
        throw new Error("Must pass valid data to insertExcludedStudent");
      }

      // also add testId and batchId to their lists
      if (!state.testIdList.includes(testId)) state.testIdList.push(testId);
      if (!state.batchIdList[testId]) state.batchIdList[testId] = [];
      if (!state.batchIdList[testId].includes(batchId))
        state.batchIdList[testId].push(batchId);

      if (!state.includedStudents[testId]) state.includedStudents[testId] = {};

      if (!Array.isArray(state.includedStudents[testId][batchId]))
        state.includedStudents[testId][batchId] = [];

      if (state.includedStudents[testId][batchId].includes(studentId)) {
      } else {
        state.includedStudents[testId][batchId].push(studentId);
      }
    },
    includeStudentListByBatchId(state, action) {
      const { testId, batchId, studentList } = action.payload;

      if (!testId || !batchId || !studentList) {
        throw new Error("Must pass valid data to insertExcludedStudent");
      }

      if (!Array.isArray(studentList)) throw new Error("Not a valid argument");

      // also add testId and batchId to their lists
      if (!state.testIdList.includes(testId)) state.testIdList.push(testId);
      if (!state.batchIdList[testId]) state.batchIdList[testId] = [];
      if (!state.batchIdList[testId].includes(batchId))
        state.batchIdList[testId].push(batchId);

      if (!state.includedStudents[testId]) state.includedStudents[testId] = {};

      state.includedStudents[testId][batchId] = studentList;
    },
    removeStudentFromIncludes(state, action) {
      try {
        const { testId, batchId, studentId } = action.payload;
        if (!testId || !batchId || !studentId) {
          throw new Error("Must pass valid data to removeStudentFromExcludes");
        }

        if (!state.includedStudents[testId])
          state.includedStudents[testId] = {};

        if (!state.includedStudents[testId][batchId]) {
        } else {
          if (!state.includedStudents[testId][batchId].includes(studentId))
            if (!Array.isArray(state.includedStudents[testId][batchId])) {
            } else {
              const index =
                state.includedStudents[testId][batchId].indexOf(studentId);

              state.includedStudents[testId][batchId].splice(index, 1);

              // if array is empty remove testId and batchId properties.
              if (state.includedStudents[testId][batchId].length === 0) {
                let flag = delete state.includedStudents[testId][batchId];
                if (
                  Object.values[state.includedStudents[testId]]?.length <= 0
                ) {
                  flag = flag && delete state.includedStudents[testId];
                }

                if (!flag) {
                }
              }
            }
        }
      } catch (error) {}
    },
    removeStudentListByBatchId(state, action) {
      const { testId, batchId } = action.payload;

      if (!testId || !batchId) {
        throw new Error("Must pass valid data to insertExcludedStudent");
      }

      let flag;
      if (state.includedStudents[testId])
        flag = delete state.includedStudents[testId][batchId];

      if (!flag) {
      }
    },
    resetEnrollStudentDetailsSlice(state) {
      state.technology = null;
      state.module = null;
      state.testIdList = [];
      state.batchIdList = {};
      state.includedStudents = {};
      state.excludedStudents = [];
    },
  },
});

export const {
  setTechnology,
  setModule,
  setTestIdList,
  setBatchIdList,
  setIncludedStudents,
  insertIncludedStudent,
  includeStudentListByBatchId,
  insertBatchId,
  removeBatchId,
  setExcludedArray,
  removeStudentFromIncludes,
  removeStudentListByBatchId,
  resetEnrollStudentDetailsSlice,
} = enrollStudentSlice.actions;
