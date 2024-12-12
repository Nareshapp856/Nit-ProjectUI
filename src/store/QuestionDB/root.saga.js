import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  technologiesListSliceDB,
  selectedtechnologySlice,
  createTechnologySlice,
  excelTechnologySlice,
  deleteTechnologySlice,
  editTechnologySlice,
  modulesListSlice,
  excelModuleSlice,
  deleteModuleSlice,
  createModuleSlice,
  editModuleSlice,
  moduleTechIdSlice,
  excelTopicSlice,
  createTopicSlice,
  deleteTopicSlice,
  editTopicSlice,
  topicsListSlice,
  subTopicListSlice,
  createSubTopicSlice,
  deleteSubTopicSlice,
  editSubTopicSlice,
  excelSubTopicSlice,
  questionListSlice,
  questionImagelistslice,
  createQuestionlice,
  deleteQuestionSlice,
  editQuestionSlice,
  excelQuestionSlice,
  groupparagraphListSlice,
  programcodeListSlice,
  createQuestionFormDataSlice,
  editQuestionFormDataSlice,
  p_programsListSlice,
  p_testCasesListSlice,
} from "./root.slice";
import { json } from "react-router-dom";
import { take, takeLatest } from "redux-saga/effects";
import {
  FetchTestcasesByProgramIDApi,
  fetchProgramsByTechnbologyApi,
} from "../../services/QuestionDB/api";
import { types } from "./root.actions";
import { b_types } from "../types";

const endpointuploadexcel =
  process.env.REACT_APP_API_QDB + "api/admin/fileUploadTechnology";
const endpointTechCrud =
  process.env.REACT_APP_API_QDB + "api/admin/Technology_Crud";
const endpointmoduleByTechid =
  process.env.REACT_APP_API_QDB + "api/admin/getModulesByTechnologyID/";
const endpointuploadexcelModule =
  process.env.REACT_APP_API_QDB + "api/admin/fileUploadModule";
const endpointModuleCrud =
  process.env.REACT_APP_API_QDB + "api/admin/module_Crud";
const endpointTopicsCrud =
  process.env.REACT_APP_API_QDB + "api/admin/topic_Crud";
const endpointuploadexcelTopic =
  process.env.REACT_APP_API_QDB + "api/admin/fileUploadTopic";
const endpointSubTopicsCrud =
  process.env.REACT_APP_API_QDB + "api/admin/subTopic_Crud";
const endpointuploadexcelSubTopic =
  process.env.REACT_APP_API_QDB + "api/admin/fileUploadSubTopic";
const endpointQuestionFormData =
  process.env.REACT_APP_API_QDB + "api/admin/mcqQuestionsALL_formData";
const endpointQuestionCrud =
  process.env.REACT_APP_API_QDB + "api/admin/mcqQuestionsALL_Crud";
const endpointuploadexcelQuestion =
  process.env.REACT_APP_API_QDB + "api/admin/fileUploadMCQQuestions";
const endpointGroupParagraphCrud =
  process.env.REACT_APP_API_QDB + "api/admin/ParaGroupQuestionCrud";
const endpointGetProgramCodes =
  process.env.REACT_APP_API_QDB + "api/admin/getProgramCodes";

export function* p_fetchProgramsByTechnbologySaga(action) {
  try {
    yield put(p_programsListSlice.actions.request({}));

    const res = yield call(fetchProgramsByTechnbologyApi, action.payload);
    yield put(p_programsListSlice.actions.response(res.data));
  } catch (error) {
    yield put(p_programsListSlice.actions.error("no data"));
  }
}

export function* p_fetchTestcasesByProgramIDSaga(action) {
  try {
    yield put(p_testCasesListSlice.actions.request({}));

    const res = yield call(FetchTestcasesByProgramIDApi, action.payload);
    yield put(p_testCasesListSlice.actions.response(res.data));
  } catch (error) {
    yield put(p_testCasesListSlice.actions.error("no data"));
  }
}

export function* selectedTechnologiesSaga(action) {
  console.log("selected technology saga:", action);
  try {
    yield put(selectedtechnologySlice.actions.response(action.payload, 1));
    console.log("selected technology saga response");
  } catch (error) {
    yield put(selectedtechnologySlice.actions.error("no data"));
  }
}
export function* excelTechnologiesSaga(action) {
  try {
    var stringexcel = JSON.stringify(action.payload);
    const res = yield call(axios.post, endpointuploadexcel, action.payload);

    if (res.status === 200) {
      yield put(excelTechnologySlice.actions.response(res.data));
    } else {
      yield put(excelTechnologySlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(excelTechnologySlice.actions.error(error?.message));
  }
}
export function* excelModuleSaga(action) {
  try {
    const res = yield call(
      axios.post,
      endpointuploadexcelModule,
      action.payload
    );

    if (res.status === 200) {
      yield put(excelModuleSlice.actions.response(res.data));
    } else {
      yield put(excelModuleSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(excelModuleSlice.actions.error(error?.message));
  }
}
export function* DeleteTechnologiesSaga(action) {
  try {
    var techPayload = {
      technologyID: action.payload.TechnologyID,
      technologyName: action.payload.TechnologyName,
      description: action.payload.Description,
      programCode: action.payload.Description,
      query: 3,
    };

    const res = yield call(axios.post, endpointTechCrud, techPayload);

    if (res.status === 200) {
      yield put(deleteTechnologySlice.actions.response(res.data));
    } else {
      yield put(deleteTechnologySlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(deleteTechnologySlice.actions.error(error?.message));
  }
}
export function* CreateNewTechnologiesSaga(action) {
  try {
    var techPayload = {
      technologyID: 0,
      technologyName: action.payload.TechnologyName,
      description: action.payload.Description,
      programCode: action.payload.programCode,
      query: 1,
    };

    const res = yield call(axios.post, endpointTechCrud, techPayload);

    if (res.status === 200) {
      yield put(createTechnologySlice.actions.response(res.data));
    } else {
      yield put(createTechnologySlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(createTechnologySlice.actions.error(error?.message));
  }
}

export function* EditNewTechnologiesSaga(action) {
  try {
    var techPayload = {
      technologyID: action.payload.TechnologyID,
      technologyName: action.payload.TechnologyName,
      description: action.payload.Description,
      programCode: action.payload.programCode,
      query: 2,
    };

    const res = yield call(axios.post, endpointTechCrud, techPayload);

    if (res.status === 200) {
      yield put(editTechnologySlice.actions.response(res.data));
    } else {
      yield put(editTechnologySlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(editTechnologySlice.actions.error(error?.message));
  }
}
// export function* DeleteTechnologiesSaga(action) {
//   try {
//     const res = yield call(axios.get, endpointTechnoloies, createSelectoraction.payload);

//     if (res.status === 200) {

//       yield put(technologiesListSlice.actions.response(res.data));
//     } else {
//       yield put(technologiesListSlice.actions.error(res?.message));
//     }
//   } catch (error) {
//     yield put(technologiesListSlice.actions.error(error?.message));
//   }
// }
export function* technologieslistRequestSaga(action) {
  try {
    var techPayload = {
      technologyID: null,
      technologyName: null,
      description: null,
      programCode: null,
      query: 4,
    };
    const res = yield call(axios.post, endpointTechCrud, techPayload);
    if (res.status === 200) {
      console.log("technology list saga res status;", res.status);
      console.log("technology list saga res:", res.data);
      yield put(technologiesListSliceDB.actions.response(res.data));
    } else {
      yield put(technologiesListSliceDB.actions.error(res?.message));
    }
  } catch (error) {
    yield put(technologiesListSliceDB.actions.error(error?.message));
  }
}
export function* moduleslistRequestSaga(action) {
  try {
    var module = {
      technologyID: null,
      moduleID: null,
      moduleName: null,
      description: null,
      query: 4,
    };
    const res = yield call(axios.post, endpointModuleCrud, module);

    if (res.status === 200) {
      yield put(modulesListSlice.actions.response(res.data));
    } else {
      yield put(modulesListSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(modulesListSlice.actions.error(error?.message));
  }
}

export function* moduleslistByTechidRequestSaga(action) {
  try {
    const res = yield call(axios.get, endpointmoduleByTechid + action.payload);

    if (res.status === 200) {
      yield put(moduleTechIdSlice.actions.response(res.data));
    } else {
      yield put(moduleTechIdSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(moduleTechIdSlice.actions.error(error?.message));
  }
}

export function* DeleteModuleSaga(action) {
  try {
    var module = {
      technologyID: action.payload.TechnologyId,
      moduleID: action.payload.ModuleID,
      moduleName: null,
      description: null,
      query: 3,
    };
    const res = yield call(axios.post, endpointModuleCrud, module);

    if (res.status === 200) {
      yield put(deleteModuleSlice.actions.response(res.data));
    } else {
      yield put(deleteModuleSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(deleteModuleSlice.actions.error(error?.message));
  }
}
export function* CreateNewModuleSaga(action) {
  try {
    var module = {
      technologyID: action.payload.TechnologyID,
      moduleID: null,
      moduleName: action.payload.ModuleName,
      description: action.payload.Description,
      query: 1,
    };

    const res = yield call(axios.post, endpointModuleCrud, module);

    if (res.status === 200) {
      yield put(createModuleSlice.actions.response(res.data));
    } else {
      yield put(createModuleSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(createModuleSlice.actions.error(error?.message));
  }
}
export function* EditmoduleSaga(action) {
  try {
    var module = {
      technologyID: action.payload.TechnologyID,
      moduleID: action.payload.ModuleID,
      moduleName: action.payload.ModuleName,
      description: action.payload.Description,
      query: 2,
    };

    const res = yield call(axios.post, endpointModuleCrud, module);

    if (res.status === 200) {
      yield put(editModuleSlice.actions.response(res.data));
    } else {
      yield put(editModuleSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(editModuleSlice.actions.error(error?.message));
  }
}
// export function* moduleslistRequestSaga(action) {
//   try {
//     const res = yield call(axios.get, endpointModules+"/"+action.payload, action.payload);

//     if (res.status === 200) {

//       yield put(modulesListSlice.actions.response(res.data));
//     } else {
//       yield put(modulesListSlice.actions.error(res?.message));
//     }
//   } catch (error) {
//     yield put(modulesListSlice.actions.error(error?.message));
//   }
// }
export function* topiclistRequestSaga(action) {
  try {
    var topic = {
      moduleID: null,
      topicID: null,
      topicName: null,
      description: null,
      query: 4,
    };
    const res = yield call(axios.post, endpointTopicsCrud, topic);

    if (res.status === 200) {
      yield put(topicsListSlice.actions.response(res.data));
    } else {
      yield put(topicsListSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(topicsListSlice.actions.error(error?.message));
  }
}
export function* excelTopicSaga(action) {
  try {
    const res = yield call(
      axios.post,
      endpointuploadexcelTopic,
      action.payload
    );

    if (res.status === 200) {
      yield put(excelTopicSlice.actions.response(res.data));
    } else {
      yield put(excelTopicSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(excelTopicSlice.actions.error(error?.message));
  }
}

export function* CreateNewTopicSaga(action) {
  try {
    var topic = {
      moduleID: action.payload.moduleID,
      topicID: null,
      topicName: action.payload.Topic,
      description: action.payload.Description,
      query: 1,
    };

    const res = yield call(axios.post, endpointTopicsCrud, topic);

    if (res.status === 200) {
      yield put(createTopicSlice.actions.response(res.data));
    } else {
      yield put(createTopicSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(createTopicSlice.actions.error(error?.message));
  }
}

export function* EditTopicSaga(action) {
  try {
    var topic = {
      moduleID: action.payload.moduleID,
      topicID: action.payload.TopicID,
      topicName: action.payload.Topic,
      description: action.payload.Description,
      query: 2,
    };
    const res = yield call(axios.post, endpointTopicsCrud, topic);

    if (res.status === 200) {
      yield put(editTopicSlice.actions.response(res.data));
    } else {
      yield put(editTopicSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(editTopicSlice.actions.error(error?.message));
  }
}

export function* DeleteTopicSaga(action) {
  try {
    var topic = {
      moduleID: action.payload.TechnologyID,
      topicID: action.payload.TopicID,
      topicName: action.payload.TopicName,
      description: action.payload.Description,
      query: 3,
    };
    const res = yield call(axios.post, endpointTopicsCrud, topic);

    if (res.status === 200) {
      yield put(deleteTopicSlice.actions.response(res.data));
    } else {
      yield put(deleteTopicSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(deleteTopicSlice.actions.error(error?.message));
  }
}

export function* subTopiclistRequestSaga(action) {
  try {
    var subTopic = {
      technologyID: null,
      moduleID: null,
      topicID: null,
      subTopicID: null,
      subTopicName: null,
      query: 4,
    };
    const res = yield call(axios.post, endpointSubTopicsCrud, subTopic);

    if (res.status === 200) {
      yield put(subTopicListSlice.actions.response(res.data));
    } else {
      yield put(subTopicListSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(subTopicListSlice.actions.error(error?.message));
  }
}

export function* excelSubTopicSaga(action) {
  try {
    const res = yield call(
      axios.post,
      endpointuploadexcelSubTopic,
      action.payload
    );

    if (res.status === 200) {
      yield put(excelSubTopicSlice.actions.response(res.data));
    } else {
      yield put(excelSubTopicSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(excelSubTopicSlice.actions.error(error?.message));
  }
}

export function* CreateNewSubTopicSaga(action) {
  try {
    var subTopic = {
      topicID: action.payload.topicID,
      subTopicID: action.payload.subTopicID,
      subTopicName: action.payload.subTopicName,
      query: 1,
    };

    const res = yield call(axios.post, endpointSubTopicsCrud, subTopic);

    if (res.status === 200) {
      yield put(createSubTopicSlice.actions.response(res.data));
    } else {
      yield put(createSubTopicSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(createSubTopicSlice.actions.error(error?.message));
  }
}

export function* EditSubTopicSaga(action) {
  try {
    var subTopic = {
      topicID: action.payload.topicID,
      subTopicID: action.payload.subTopicID,
      subTopicName: action.payload.subTopicName,
      query: 2,
    };

    const res = yield call(axios.post, endpointSubTopicsCrud, subTopic);

    if (res.status === 200) {
      yield put(editSubTopicSlice.actions.response(res.data));
    } else {
      yield put(editSubTopicSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(editSubTopicSlice.actions.error(error?.message));
  }
}

export function* DeleteSubTopicSaga(action) {
  try {
    var subTopic = {
      topicID: null,
      subTopicID: action.payload.subTopicID,
      subTopicName: null,
      query: 3,
    };

    const res = yield call(axios.post, endpointSubTopicsCrud, subTopic);

    if (res.status === 200) {
      yield put(deleteSubTopicSlice.actions.response(res.data));
    } else {
      yield put(deleteSubTopicSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(deleteSubTopicSlice.actions.error(error?.message));
  }
}

export function* questionImagelistRequestSaga(action) {
  try {
    var question = {
      questionID: action.payload,
      query: 5,
    };
    const res = yield call(axios.post, endpointQuestionCrud, question);

    if (res.status === 200) {
      yield put(questionImagelistslice.actions.response(res.data));
    } else {
      yield put(questionImagelistslice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(questionImagelistslice.actions.error(error?.message));
  }
}
export function* questionlistRequestSaga(action) {
  try {
    var question = {
      query: 4,
    };
    const res = yield call(axios.post, endpointQuestionCrud, question);

    if (res.status === 200) {
      yield put(questionListSlice.actions.response(res.data));
    } else {
      yield put(questionListSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(questionListSlice.actions.error(error?.message));
  }
}

export function* programCodelistRequestSaga(action) {
  try {
    const res = yield call(axios.get, endpointGetProgramCodes);

    if (res.status === 200) {
      console.log("program code list status", res.status);
      yield put(programcodeListSlice.actions.response(res.data));
    } else {
      yield put(programcodeListSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(programcodeListSlice.actions.error(error?.message));
  }
}

export function* groupparagraphlistRequestSaga(action) {
  try {
    var question = {
      query: 4,
    };
    const res = yield call(axios.post, endpointGroupParagraphCrud, question);

    if (res.status === 200) {
      yield put(groupparagraphListSlice.actions.response(res.data));
    } else {
      yield put(groupparagraphListSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(groupparagraphListSlice.actions.error(error?.message));
  }
}
export function* CreateNewGroupParagraphSaga(action) {
  try {
    const res = yield call(
      axios.post,
      endpointGroupParagraphCrud,
      action.payload
    );

    if (res.status === 200) {
      yield put(createQuestionlice.actions.response(res.data));
    } else {
      yield put(createQuestionlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(createQuestionlice.actions.error(error?.message));
  }
}
export function* EditGroupParagraphSaga(action) {
  try {
    const res = yield call(
      axios.post,
      endpointGroupParagraphCrud,
      action.payload
    );
    if (res.status === 200) {
      yield put(editQuestionSlice.actions.response(res.data));
    } else {
      yield put(editQuestionSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(editQuestionSlice.actions.error(error?.message));
  }
}
export function* DeleteGroupParagraphSaga(action) {
  try {
    const res = yield call(
      axios.post,
      endpointGroupParagraphCrud,
      action.payload
    );
    if (res.status === 200) {
      yield put(deleteQuestionSlice.actions.response(res.data));
    } else {
      yield put(deleteQuestionSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(deleteQuestionSlice.actions.error(error?.message));
  }
}

export function* excelQuestionnaireSaga(action) {
  try {
    const res = yield call(
      axios.post,
      endpointuploadexcelQuestion,
      action.payload
    );

    if (res.status === 200) {
      yield put(excelQuestionSlice.actions.response(res.data));
    } else {
      yield put(excelQuestionSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(excelQuestionSlice.actions.error(error?.message));
  }
}

export function* CreateNewQuestionnaireSaga(action) {
  try {
    //   var question={
    //     technology:null,
    //     module   :null,
    //     topic :null,
    //     subTopic :null,
    //     optionA :null,
    //     optionB :null,
    //     optionC :null,
    //     optionD :null,
    //     correctAnswer :null,
    //     difficultyLevel :null,
    //      query:1
    //  }

    //const res = yield call(axios.post, endpointQuestionCrud,action.payload);

    const res = yield call(axios.post, endpointQuestionCrud, action.payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status === 200) {
      yield put(createQuestionlice.actions.response(res.data));
    } else {
      yield put(createQuestionlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(createQuestionlice.actions.error(error?.message));
  }
}

export function* addQuestionnFormDataSaga(action) {
  try {
    const res = yield call(
      axios.post,
      endpointQuestionFormData,
      action.payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(action.payload.get("OptionE"));

    if (res.status === 200) {
      yield put(createQuestionFormDataSlice.actions.response(res.data));
    } else {
      yield put(createQuestionFormDataSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(createQuestionFormDataSlice.actions.error(error?.message));
  }
}

export function* editQuestionnFormDataSaga(action) {
  try {
    const res = yield call(
      axios.post,
      endpointQuestionFormData,
      action.payload
    );

    if (res.status === 200) {
      yield put(editQuestionFormDataSlice.actions.response(res.data));
    } else {
      yield put(editQuestionFormDataSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(editQuestionFormDataSlice.actions.error(error?.message));
  }
}

export function* EditQuestionnaireSaga(action) {
  try {
    const res = yield call(axios.post, endpointQuestionCrud, action.payload);

    if (res.status === 200) {
      yield put(editQuestionSlice.actions.response(res.data));
    } else {
      yield put(editQuestionSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(editQuestionSlice.actions.error(error?.message));
  }
}

export function* DeleteQuestionnaireSaga(action) {
  try {
    //   var question={
    //     technology:null,
    //     module   :null,
    //     topic :null,
    //     subTopic :null,
    //     optionA :null,
    //     optionB :null,
    //     optionC :null,
    //     optionD :null,
    //     correctAnswer :null,
    //     difficultyLevel :null,
    //      query:2
    //  }

    const res = yield call(axios.post, endpointQuestionCrud, action.payload);

    if (res.status === 200) {
      yield put(deleteQuestionSlice.actions.response(res.data));
    } else {
      yield put(deleteQuestionSlice.actions.error(res?.message));
    }
  } catch (error) {
    yield put(deleteQuestionSlice.actions.error(error?.message));
  }
}

export default function* adminWatcherDB() {
  yield takeEvery(types.P_PROGRAM_LIST, p_fetchProgramsByTechnbologySaga);
  yield takeEvery(types.P_TESTCASES_LIST, p_fetchTestcasesByProgramIDSaga);

  yield takeEvery(
    technologiesListSliceDB.actions.request.type,
    technologieslistRequestSaga
  );
  yield takeEvery(
    createTechnologySlice.actions.request.type,
    CreateNewTechnologiesSaga
  );

  yield takeEvery(
    modulesListSlice.actions.request.type,
    moduleslistRequestSaga
  );
  yield takeEvery(topicsListSlice.actions.request.type, topiclistRequestSaga);
  yield takeEvery(
    selectedtechnologySlice.actions.request.type,
    selectedTechnologiesSaga
  );
  yield takeEvery(
    excelTechnologySlice.actions.request.type,
    excelTechnologiesSaga
  );
  yield takeEvery(
    deleteTechnologySlice.actions.request.type,
    DeleteTechnologiesSaga
  );
  yield takeEvery(
    editTechnologySlice.actions.request.type,
    EditNewTechnologiesSaga
  );

  yield takeEvery(excelModuleSlice.actions.request.type, excelModuleSaga);
  yield takeEvery(deleteModuleSlice.actions.request.type, DeleteModuleSaga);
  yield takeEvery(editModuleSlice.actions.request.type, EditmoduleSaga);
  yield takeEvery(createModuleSlice.actions.request.type, CreateNewModuleSaga);

  yield takeEvery(
    moduleTechIdSlice.actions.request.type,
    moduleslistByTechidRequestSaga
  );

  yield takeEvery(excelTopicSlice.actions.request.type, excelTopicSaga);

  yield takeEvery(topicsListSlice.actions.request.type, topiclistRequestSaga);

  yield takeEvery(createTopicSlice.actions.request.type, CreateNewTopicSaga);

  yield takeEvery(editTopicSlice.actions.request.type, EditTopicSaga);

  yield takeEvery(deleteTopicSlice.actions.request.type, DeleteTopicSaga);

  yield takeEvery(
    subTopicListSlice.actions.request.type,
    subTopiclistRequestSaga
  );
  yield takeEvery(
    createSubTopicSlice.actions.request.type,
    CreateNewSubTopicSaga
  );
  yield takeEvery(editSubTopicSlice.actions.request.type, EditSubTopicSaga);
  yield takeEvery(deleteSubTopicSlice.actions.request.type, DeleteSubTopicSaga);
  yield takeEvery(excelSubTopicSlice.actions.request.type, excelSubTopicSaga);

  yield takeEvery(
    questionListSlice.actions.request.type,
    questionlistRequestSaga
  );
  yield takeEvery(
    createQuestionlice.actions.request.type,
    CreateNewQuestionnaireSaga
  );
  yield takeEvery(
    editQuestionSlice.actions.request.type,
    EditQuestionnaireSaga
  );
  yield takeEvery(
    deleteQuestionSlice.actions.request.type,
    DeleteQuestionnaireSaga
  );
  yield takeEvery(
    excelQuestionSlice.actions.request.type,
    excelQuestionnaireSaga
  );
  yield takeEvery(
    programcodeListSlice.actions.request.type,
    programCodelistRequestSaga
  );

  yield takeEvery(
    createQuestionFormDataSlice.actions.request.type,
    addQuestionnFormDataSaga
  );
  yield takeEvery(
    editQuestionFormDataSlice.actions.request.type,
    editQuestionnFormDataSaga
  );
  yield takeEvery(
    questionImagelistslice.actions.request.type,
    questionImagelistRequestSaga
  );
}

// export default function* rootSaga() {
//   yield all([fork(adminWatcher), fork(b_adminSaga)]);
// }
