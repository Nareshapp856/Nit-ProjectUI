// import createSagaMiddleware from "redux-saga";
// import storage from "redux-persist/lib/storage";
// import { configureStore } from "@reduxjs/toolkit";
// import persistReducer from "redux-persist/es/persistReducer";
// import reducers from "./root.reducer";
// import adminWatcher from "./root.saga";
// import adminWatcherDB from "./QuestionDB/root.saga";
// import { b_adminSaga } from "./sagas";
// import { all, fork } from "redux-saga/effects";

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

// const sagaMiddleware = createSagaMiddleware();

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleWare) =>
//     getDefaultMiddleWare().concat(sagaMiddleware),
// });

// function* rootSaga() {
//   yield all([adminWatcher()]);
//   yield all([fork(adminWatcherDB), fork(b_adminSaga)]);
// }

// sagaMiddleware.run(rootSaga);

// export default store;

import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import reducers from "./root.reducer"; // Combined reducers
import adminWatcher from "./root.saga"; // Admin related sagas
import adminWatcherDB from "./QuestionDB/root.saga"; // DB related sagas
import { b_adminSaga } from "./sagas"; // Additional sagas
import { all, fork } from "redux-saga/effects"; // Utility for managing multiple sagas
import { interviewerWatcherSaga } from "./sagas/interviewer"; // Interviewer watcher saga
import { facultyWatcherSaga } from "./Faculty/saga/FacultyCurriculumList";
import { adminWatchFacultySaga } from "./sagas/admin/facultyCurriculum";

// Persist configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

// Initialize saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create the store and apply redux-saga middleware along with redux-persist reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable checks for redux-persist
    }).concat(sagaMiddleware), // Add saga middleware to the store
});

// Root saga which forks all necessary sagas
function* rootSaga() {
  yield all([
    fork(adminWatcher), // Fork admin related saga
    fork(adminWatcherDB), // Fork database related saga
    fork(b_adminSaga), // Fork additional admin-related saga
    fork(interviewerWatcherSaga), // Fork the interviewer-related saga
    fork(facultyWatcherSaga),
    fork(adminWatchFacultySaga),
  ]);
}

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
