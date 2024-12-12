import { put, call, takeLatest, delay } from "redux-saga/effects";
import {
  assessmentListSlice,
  assessmentPageSlice,
  availableDBQuestionCountSlice,
  batchDetailsListSlice,
  batchListSlice,
  deleteEnrollItemSlice,
  enrollListSlice,
  facultyListSlice,
  listOfAssessmentPageSlice,
  mentorListSlice,
  modulesListSlice,
  questionListSlice,
  retriveBatchDetailsSlice,
  schedulePageSlice,
  studentListByTechModuleSlice,
  studentListSlice,
  subTopicsListSlice,
  submitBatchCreationActionSlice,
  submitEnrollStudentPageSlice,
  technologiesListSlice,
  technologyPageSlice,
  testListSlice,
  testSelectionPageSlice,
  testsByDateSlice,
  topicsListSlice,
} from "./root.slice";
import { types } from "./root.actions";
import api, { deleteEnrollItem, getBatchDetails } from "../services/api";

function* testsByDateListSaga(action) {
  try {
    yield put(testsByDateSlice.actions.fetchStart());
    const response = yield call(
      api.get,
      `/fetchtestsbydate?startdate=${action.payload.startDate}&enddate=${action.payload.endDate}`
    );
    yield put(
      testsByDateSlice.actions.fetchSuccess({
        data: response.data,
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      testsByDateSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* assessmentListSaga() {
  try {
    yield put(assessmentListSlice.actions.fetchStart());
    const response = yield call(api.get, "/getAllTests");
    yield put(
      assessmentListSlice.actions.fetchSuccess({
        data: response.data,
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      assessmentListSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* technologySaga() {
  try {
    yield put(technologiesListSlice.actions.fetchStart());
    const response = yield call(api.get, "/fetchTechnologies");
    yield put(
      technologiesListSlice.actions.fetchSuccess({
        data: response.data,
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      technologiesListSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* moduleSaga(action) {
  try {
    let apiEndPoint = `/getModulesByTechnologyIdForBatch?technologyId=${action.payload}`;

    yield put(modulesListSlice.actions.fetchStart());
    const response = yield call(api.get, apiEndPoint);
    console.log("module saga response:", response.data);
    yield put(
      modulesListSlice.actions.fetchSuccess({
        data: response.data,
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      modulesListSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* topicSaga(action) {
  try {
    yield put(topicsListSlice.actions.fetchStart());
    const response = yield call(api.get, `/fetchTopics/${action.payload}`);
    yield put(
      topicsListSlice.actions.fetchSuccess({
        data: response.data,
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      topicsListSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* subTopicSaga(action) {
  try {
    yield put(subTopicsListSlice.actions.fetchStart());
    const response = yield call(api.get, `/fetchSubTopics/${action.payload}`);
    yield put(
      subTopicsListSlice.actions.fetchSuccess({
        data: response.data,
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      subTopicsListSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* questionSaga(action) {
  try {
    yield put(questionListSlice.actions.fetchStart());
    const response = yield call(
      api.get,
      `/fetchFixedQuestions?DifficultyLevelID=${action.payload.DifficultyLevelID}&ModuleID=${action.payload.ModuleID}&TopicID=${action.payload.TopicID}&SubTopicID=${action.payload.SubTopicID}`
    );

    yield put(
      questionListSlice.actions.fetchSuccess({
        data: response.data,
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      questionListSlice.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* enrollListSage(action) {
  try {
    yield put(enrollListSlice.actions.fetchStart());
    const response = yield call(api.post, "/CreateNewEnrollId");

    yield put(
      enrollListSlice.actions.fetchSuccess({
        data: response.data.dbresult,
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      enrollListSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* deleteEnrollSaga(action) {
  try {
    yield put(deleteEnrollItemSlice.actions.fetchStart());

    const res = yield call(deleteEnrollItem, action.payload);
    yield put(deleteEnrollItemSlice.actions.fetchSuccess({ ...res }));
  } catch (error) {
    yield put(deleteEnrollItemSlice.actions.fetchFailure(error));
  }
}

function* testListSaga(action) {
  try {
    yield put(testListSlice.actions.fetchStart());
    const response = yield call(api.post, "/Listof_AvailableTests", {
      TechnologyId: action.payload.technologyId,
      ModuleId: action.payload.moduleId,
    });

    yield put(
      testListSlice.actions.fetchSuccess({
        data: response.data.dbresult,
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      testListSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* batchListSaga(_) {
  try {
    yield put(batchListSlice.actions.fetchStart());
    const response = yield call(api.post, "/Fetch_Batches", {});

    yield put(
      batchListSlice.actions.fetchSuccess({
        data: response.data.dbresult,
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      batchListSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* batchDetailsListSaga(action) {
  try {
    yield put(batchDetailsListSlice.actions.fetchStart());
    const response = yield call(api.post, "/Listof_BatchDetails", {
      TechnologyId: action.payload.technologyId,
      ModuleId: action.payload.moduleId,
    });

    yield delay(100);

    yield put(
      batchDetailsListSlice.actions.fetchSuccess({
        data: response.data.dbresult,
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      batchDetailsListSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

// using tanstack instad of saga
function* studentListSaga(action) {
  try {
    yield put(studentListSlice.actions.fetchStart());
    const response = yield call(api.post, "/GetStudentNameByBatchId", {
      TechnologyId: action.payload.technologyId,
      ModuleId: action.payload.moduleId,
    });

    yield put(
      studentListSlice.actions.fetchSuccess({
        data: response.data.dbresult,
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      studentListSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* facultyListSaga(_) {
  try {
    yield put(facultyListSlice.actions.fetchStart());
    const response = yield call(api.post, "/Get_Facaulty");

    yield put(
      facultyListSlice.actions.fetchSuccess({
        data: response.data.dbresult,
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      facultyListSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* mentoreListSaga(_) {
  try {
    yield put(mentorListSlice.actions.fetchStart());
    const response = yield call(api.post, "/Get_Mentors");

    yield put(
      mentorListSlice.actions.fetchSuccess({
        data: response.data.dbresult,
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      mentorListSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* studentListByTechModuleSaga(_) {
  try {
    yield put(studentListByTechModuleSlice.actions.fetchStart());
    const response = yield call(api.post, "/Fetch_Students");

    yield put(
      studentListByTechModuleSlice.actions.fetchSuccess({
        data: response.data.dbresult,
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      studentListByTechModuleSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

// LOADERS

function* listOfAssessmentPageSaga() {
  try {
    yield put(listOfAssessmentPageSlice.actions.fetchStart());
    const response = yield call(api.get, "/getAllTests");
    yield put(
      listOfAssessmentPageSlice.actions.fetchSuccess({
        data: response.data,
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      listOfAssessmentPageSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* technologiesPageSaga(action) {
  try {
    yield put(technologyPageSlice.actions.fetchStart());
    const response = yield call(api.post, "/getBasicTestInfo", {
      data: { TestID: action.payload },
    });
    yield put(
      technologyPageSlice.actions.fetchSuccess({
        data: response.data.data[0],
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      technologyPageSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* assessmentPageSaga(action) {
  try {
    yield put(assessmentPageSlice.actions.fetchStart());
    const response = yield call(api.post, "/getBasicTestDetailsInfo", {
      data: {
        TestID: action.payload,
      },
    });
    yield put(
      assessmentPageSlice.actions.fetchSuccess({
        data: response.data.data[0],
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      assessmentPageSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* schedulePageSaga(action) {
  try {
    yield put(schedulePageSlice.actions.fetchStart());
    const response = yield call(api.post, "/RetriveTestSchedule", {
      TestId: action.payload,
    });
    yield put(
      schedulePageSlice.actions.fetchSuccess({
        data: response.data.dbresult[0],
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      schedulePageSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* userManagementPageSaga(action) {
  try {
    yield put(schedulePageSlice.actions.fetchStart());
    const response = yield call(api.post, "/RetriveTestSchedule", {
      TestId: action.payload,
    });
    yield put(
      schedulePageSlice.actions.fetchSuccess({
        data: response.data.dbresult[0],
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      schedulePageSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* batchDetailsLoaderSaga(action) {
  try {
    yield put(retriveBatchDetailsSlice.actions.fetchStart());
    yield delay(600);
    const response = yield call(getBatchDetails, action.payload);
    yield put(
      retriveBatchDetailsSlice.actions.fetchSuccess({
        data: response.data,
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      retriveBatchDetailsSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* testSelectionPageSaga(action) {
  try {
    yield put(testSelectionPageSlice.actions.fetchStart());
    const response = yield call(api.post, "/Retrive_Enroll", {
      EnrollmentId: action.payload,
    });

    yield put(
      testSelectionPageSlice.actions.fetchSuccess({
        data: response.data.dbresult,
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      testSelectionPageSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* userManagementEssentials() {
  try {
    yield put(facultyListSlice.actions.fetchStart());
    yield put(mentorListSlice.actions.fetchStart());
    yield put(studentListByTechModuleSlice.actions.fetchStart());

    yield delay(300);
    let response = yield call(api.post, "/Get_Facaulty");
    yield put(
      facultyListSlice.actions.fetchSuccess({
        data: response.data.dbresult,
        statusCode: response.status,
      })
    );

    response = yield call(api.post, "/Get_Mentors");
    yield put(
      mentorListSlice.actions.fetchSuccess({
        data: response.data.dbresult,
        statusCode: response.status,
      })
    );
    
    response = yield call(api.post, "/Fetch_Students");
    yield put(
      studentListByTechModuleSlice.actions.fetchSuccess({
        data: response.data.dbresult,
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      facultyListSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
    yield put(
      mentorListSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
    yield put(
      studentListByTechModuleSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

// ACTIONS
function* submitEnrollStudentPageSaga(action) {
  try {
    yield put(submitEnrollStudentPageSlice.actions.fetchStart());
    const response = yield call(api.post, "/EnrollTest", action.payload);

    yield put(
      submitEnrollStudentPageSlice.actions.fetchSuccess({
        data: response.data,
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      submitEnrollStudentPageSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

function* submitBatchCreationActionSaga(action) {
  try {
    yield put(submitBatchCreationActionSlice.actions.fetchStart());
    const response = yield call(
      api.post,
      "/Create_StudentsBatchs",
      action.payload
    );

    yield put(
      submitBatchCreationActionSlice.actions.fetchSuccess({
        data: response.data,
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      submitBatchCreationActionSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

// UTIL

function* availableDBQuestionCount(action) {
  try {
    yield put(availableDBQuestionCountSlice.actions.fetchStart());
    const response = yield call(
      api.post,
      "/FetchAvailableQuestionsByCount",
      action.payload
    );
    yield put(
      availableDBQuestionCountSlice.actions.fetchSuccess({
        data: response.data.dbresult,
        statusCode: response.status,
      })
    );
  } catch (error) {
    yield put(
      availableDBQuestionCountSlice.actions.fetchFailure({
        errorMessage: error.message,
        statusCode: error.response.status,
        statusText: error.message,
      })
    );
  }
}

// ADMIN

function* adminWatcher() {
  // LISTS

  /* Dashboard */

  yield takeLatest(types.TESTSBYDATE, testsByDateListSaga);

  yield takeLatest(types.ASSESSMENT_LIST, assessmentListSaga);

  /* Assessment-View*/

  yield takeLatest(types.TECHNOLOGY_LIST, technologySaga);
  yield takeLatest(types.MODULE_LIST, moduleSaga);
  yield takeLatest(types.TOPIC_LIST, topicSaga);
  yield takeLatest(types.SUBTOPIC_LIST, subTopicSaga);
  yield takeLatest(types.QUESTION_LIST, questionSaga);

  /* Enroll-Student */

  yield takeLatest(types.ENROLL_LIST, enrollListSage);
  yield takeLatest(types.BATCHDETAILS_LIST, batchDetailsListSaga);
  yield takeLatest(types.TEST_LIST, testListSaga);
  yield takeLatest(types.STUDENT_LIST, studentListSaga);
  yield takeLatest(types.DELETE_ENROLL, deleteEnrollSaga);

  /* User-Management */

  yield takeLatest(types.BATCH_LIST, batchListSaga);
  yield takeLatest(types.FACULTY_LIST, facultyListSaga);
  yield takeLatest(types.MENTORE_LIST, mentoreListSaga);
  yield takeLatest(
    types.STUDENT_LIST_BY_TECH_MODULE,
    studentListByTechModuleSaga
  );

  // PAGES

  /* Assessment-View*/

  yield takeLatest(types.LISTOFASSESSMENT_PAGE, listOfAssessmentPageSaga);
  yield takeLatest(types.TECHNOLOGY_PAGE, technologiesPageSaga);
  yield takeLatest(types.ASSESSMENT_PAGE, assessmentPageSaga);
  yield takeLatest(types.SCHEDULE_PAGE, schedulePageSaga);

  /* Enroll-Student */

  yield takeLatest(types.TESTSELECTION_PAGE, testSelectionPageSaga);

  /* User-Management */

  yield takeLatest(types.RETRIVEUSERMANAGEMENT_PAGE, userManagementPageSaga);
  yield takeLatest(types.RETRIVEBATCH_PAGE, batchDetailsLoaderSaga);

  // ACTIONS

  /* Enroll-Student */

  yield takeLatest(types.ENROLLSTUDENTS_ACTION, submitEnrollStudentPageSaga);

  /* User-Management */

  yield takeLatest(
    types.USERMANAGEMENTESSENTIAL_LISTS,
    userManagementEssentials
  );
  yield takeLatest(types.BATCHCREATION_ACTION, submitBatchCreationActionSaga);

  // UTIL
  yield takeLatest(types.AVAILABLEDBQUESTIONCOUNT, availableDBQuestionCount);
}

export default adminWatcher;
