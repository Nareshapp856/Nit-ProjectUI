export function getEnrollmentSubmitDataFromExcludes({
  enrollId,
  selectedTechnology,
  selectedModule,
  testIdList,
  batchIdList,
  excludedStudents,
}) {
  let result = [];
  if (testIdList)
    testIdList.map((test) => {
      if (batchIdList[test] && batchIdList[test].length > 0) {
        const testId = test;
        batchIdList[test].forEach((batch) => {
          const batchId = batch;
          const hashedStudentId = testId + ":" + batchId + ":";
          let currentExcludes = [];

          excludedStudents.map((exclude) => {
            const studentId = exclude?.split(":")[2];
            const student = hashedStudentId + studentId;
            if (excludedStudents.includes(student))
              if (!currentExcludes.includes(studentId))
                currentExcludes.push(studentId);
          });

          currentExcludes = currentExcludes.join(",") || null;
          result.push({
            TestId: testId,
            BatchId: batchId,
            StudentId: currentExcludes,
          });
        });
      }
    });

  const resultObj = {
    TechnologyId: selectedTechnology,
    ModuleId: selectedModule,
    EnrollmentId: enrollId,
    data: result,
  };

  return resultObj;
}

export function getFormatedExcludes(excludedStudents, testList) {
  let obj = { ...excludedStudents };
  let data = [];

  const tests = Object.keys(obj);
  const values = Object.values(obj);

  values.forEach((batch, index) => {
    const keys = Object.keys(batch);
    const values = Object.values(batch);

    const testId = tests[index];
    const batchId = keys;

    values.map((list, index) =>
      data.push({
        TestId: testId,
        BatchId: batchId[index],
        StudentId: list.join(","),
      })
    );
  });

  const log = data.map((batch) => {
    const testId = batch.TestId;

    const obj = testList.find((test) => test.TestID == testId);

    batch.Type = obj.Type;

    return batch;
  });

  return log;
}

export function getEnrollmentSubmitData({
  enrollId,
  selectedTechnology,
  selectedModule,
  filteredIncludedStudents,
}) {
  return {
    data: filteredIncludedStudents,
    TechnologyId: selectedTechnology,
    ModuleId: selectedModule,
    EnrollmentId: enrollId,
  };
}

export function getFilteredEnrollStudentSlice(retrivedData) {
  if (!retrivedData || !Array.isArray(retrivedData)) return undefined;

  const result = {
    testIdList: [],
    batchIdList: {},
    studentIdList: {},
  };

  retrivedData.forEach((entry) => {
    const { TestID, BatchID, StudentName } = entry;

    // Populate testIdList
    if (!result.testIdList.includes(TestID)) {
      result.testIdList.push(TestID);
    }

    // Populate batchIdList
    if (!result.batchIdList[TestID]) {
      result.batchIdList[TestID] = [];
    }
    if (!result.batchIdList[TestID].includes(BatchID)) {
      result.batchIdList[TestID].push(BatchID);
    }

    // Populate studentIdList
    if (!result.studentIdList[TestID]) {
      result.studentIdList[TestID] = {};
    }
    if (!result.studentIdList[TestID][BatchID]) {
      result.studentIdList[TestID][BatchID] = [];
    }
    // Split StudentName and add individual student IDs to the list
    const studentIds = StudentName?.split(",");
    studentIds.forEach((studentId) => {
      if (!result.studentIdList[TestID][BatchID].includes(Number(studentId))) {
        result.studentIdList[TestID][BatchID].push(Number(studentId));
      }
    });
  });

  return result;
}
