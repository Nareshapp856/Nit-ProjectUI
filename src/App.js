import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import AdminHomePage from "./pages/AdminHomePage";
import Categories from "./pages/Categories";
import ListOfAssessment, {
  loader as AssessmentLoader,
} from "./pages/ListOfAssessment";
import { TechnologyV2, TechnologyActionV2 } from "./pages/Technology";
import {
  AssessmentActionV2,
  AssessmentLoaderV2,
  AssessmentsV2,
} from "./pages/Assessments";
import { QuestionViewV2 } from "./pages/QuestionView";
import ScheduleTime, {
  action as ScheduleTimeAction,
} from "./pages/ScheduleTime";

import { queryClient } from "./util/http";
import UploadTopic from "./pages/UploadTopic";
import Questiondb from "./pages/Questiondb";
import { QuestionViewProvider } from "./context/questionView";
import QuestionViewFixed from "./pages/QuestionViewFixed";
import QuestionViewFixedEasy from "./pages/QuestionViewFixedEasy";
import { TableTotalCtxProvider } from "./context/tableTotalCtx";
import Login from "./pages/Login";
import UserLogin from "./components/login/UserLogin";
import AdminLogin from "./components/login/AdminLogin";
import Dashboard from "./pages/Dashboard";
import EnrollStudent from "./pages/enrollStudent/EnrollStudent";
import UserManagement from "./pages/userManagement/UserManagement";
import BatchTablePage from "./pages/enrollStudent/BatchTablePage";
import StudentSelectionPage from "./pages/enrollStudent/StudentSelectionPage";
import ListOfTests from "./pages/enrollStudent/ListOfTests";
import ListOfBatches from "./components/userManagement/ListOfBatches";
import BatchDetails from "./components/userManagement/BatchDetails";
import ErrorBoundary from "./shared/ErrorBoundary";
import EnrollStudentPage from "./pages/EnrollStudentPage";
import BatchCurriculum from "./pages/BatchCurriculum.jsx";

import { CourseCurriculumFlagProvider } from "./context/Faculty/courseCurriculumFlagContext";
import { TopicsListProvider } from "./context/Faculty/topicsListContext.js";

import BatchStudentTable from "./components/userManagement/BatchStudentTable.js";

import RegisterInterviewer from "./pages/userManagement/RegisterInterviewer";
import ViewCurriculum from "./pages/ViewCurriculum.jsx";
import StudentTable from "./components/userManagement/BatchDetails/StudentTable.js";

// QuestionDB
import Technologies from "./pages/QuestionDB/technology/Technologies";
import Modules from "./pages/QuestionDB/module/Modules";
import Subtopics from "./pages/QuestionDB/subtopic/Subtopics";
import Topics from "./pages/QuestionDB/topic/Topics";
import QuestionView from "./pages/QuestionDB/questionView/QuestionView";
import ProgramView from "./pages/QuestionDB/programView/ProgramView";
import TestCaseView from "./pages/QuestionDB/testcaseView/TestCaseView";
import AvailableMockTest from "./pages/AvailableTests.jsx";
import TestResults from "./components/Faculty/TestResults.jsx";

//Mentor Form
import MentorForm from "./pages/MentorForm.jsx";
import AssignBatches from "./pages/AssaignBatches.jsx";

//private route component
import PrivateRoute from "./components/PrivateRoute.jsx";
import NotFound from "./shared/NotFound";
import Unauthorized from "./shared/Unauthorized";

// Faculty
import ViewCourseCurriculum from "./pages/Faculty/ViewCurriculum";
import CreateCourseCurriculum from "./pages/Faculty/CreateCurriculum";
import AssaignBatch from "./pages/Faculty/AssaignBatch.jsx";
import MockTest from "./pages/MockTest.js";
import CreateMockAndDescriptive from "./pages/CreateMockAndDescriptive.jsx";

// Password Change
import DefaultPasswordChange from './ui/DefaultPasswordChange.jsx';
/**
 *
 * Main App component that sets up routing and provides QueryClient for React Query.
 */
function App() {
  // Define the routing configuration
  const appRoutes = [
    {
      path: "/login",
      element: <Login />,
      children: [
        { index: true, element: <UserLogin /> },
        { path: "admin", element: <AdminLogin /> },
      ],
    },
    { path: "/unauthorized", element: <Unauthorized /> },
    { path: "*", element: <NotFound /> },
    {
      path: "/password-change", element: <DefaultPasswordChange/>
    },
    {
      path: "/",
      element: 
      // <AdminHomePage />
      (<PrivateRoute
        element={AdminHomePage}
        allowedRoles={["faculty", "admin","mentor","interviewer","superadmin"]}
      />),
      children: [
        { path: "technologies", element: <Technologies /> },
        { path: "modules/:TechnologyID", element: <Modules /> },
        { path: "subtopics/:TopicID", element: <Subtopics /> },
        { path: "topics/:ModuleID", element: <Topics /> },
        { path: "question-view/:SubTopicID", element: <QuestionView /> },
        { path: "program-view", element: <ProgramView /> },
        { path: "testcase-view", element: <TestCaseView /> },
        { path: "testcase-view/:programId", element: <TestCaseView /> },
        { path: "view-curriculum-course", element: <ViewCurriculum /> },
        { path: "batch-curriculums", element: <BatchCurriculum /> },
        {
          path: "user-management",
          element: <UserManagement />,
          children: [
            { index: true, element: <ListOfBatches /> },
            { path: "batch-details/:batchId", element: <BatchDetails /> },
          ],
        },
        { path: "available-tests", element: <AvailableMockTest /> },
        {
          path: "mock-test-creation",
          element: <MockTest />,
        },
        {
          path:"testResults",
          element: <TestResults/>,
        },
        {
          path: "createMockAndDescriptive",
          element: <CreateMockAndDescriptive />,
        },
        { path: "user-registration", element: <RegisterInterviewer /> },
        { path: "manage-student", element: <BatchStudentTable /> },
        {
          path: "enroll-student",
          element: <EnrollStudentPage />,
          children: [
            {
              index: true,
              element: <EnrollStudent />,
            },
            {
              path: "tests",
              element: <ListOfTests />,
            },
            {
              path: "batch-selection",
              element: <BatchTablePage />,
            },
            {
              path: "student-selection/:batchId",
              element: <StudentSelectionPage />,
            },
          ],
        },
        {
          path: "assaign-batches-form",
          element: <AssignBatches />,
        },
        {
          path: "view-curriculum",
          element: <ViewCourseCurriculum />,
        },
        {
          path: "mentor-form",
          element: <MentorForm />,
        },
        {
          path: "create-course-curriculum",
          element: (
            <TopicsListProvider>
              <CreateCourseCurriculum />
            </TopicsListProvider>
          ),
        },
        {
          path: "assaign-curriculum",
          element: <AssaignBatch />,
        },
        {
          path: "categories",
          element: <Categories />,
          children: [
            {
              path: "assessmentlist",
              element: <ListOfAssessment />,
            },
            {
              path: "technology",
              element: <TechnologyV2 />,
              id: "tech",
              action: TechnologyActionV2,
            },
            {
              path: "assessments",
              element: <AssessmentsV2 />,
              action: AssessmentActionV2,
              loader: AssessmentLoaderV2,
            },
            {
              path: "questionview",
              element: (
                <QuestionViewProvider>
                  <TableTotalCtxProvider>
                    <QuestionViewV2 />
                  </TableTotalCtxProvider>
                </QuestionViewProvider>
              ),
            },
            {
              path: "questionviewfixed",
              element: <QuestionViewFixed />,
              children: [{ index: true, element: <QuestionViewFixedEasy /> }],
            },
            {
              path: "scheduletime",
              element: <ScheduleTime />,
              action: ScheduleTimeAction,
            },
          ],
        },
      ],
    },

    // <PrivateRoute
    //       allowedRoles={["student", "faculty", "admin"]}
    //       element={McqExamPage}
    //     />


    // {
    //   path: "questiondb",
    //   element: <Questiondb />,
    //   children: [
    //     { path: "uploadtopic", element: <UploadTopic /> },
    //     { path: "technologies", element: <Technologies /> },
    //     { path: "modules/:TechnologyID", element: <Modules /> },
    //     { path: "subtopics/:TopicID", element: <Subtopics /> },
    //     { path: "topics/:ModuleID", element: <Topics /> },
    //     { path: "question-view/:SubTopicID", element: <QuestionView /> },
    //     { path: "program-view", element: <ProgramView /> },
    //     { path: "testcase-view", element: <TestCaseView /> },
    //     { path: "testcase-view/:programId", element: <TestCaseView /> },
    //   ],
    // },

    // {
    //   path: "user-management",
    //   element: <UserManagement />,
    //   children: [
    //     { index: true, element: <ListOfBatches /> },
    //     { path: "batch-details/:batchId", element: <BatchDetails /> },
    //   ],
    // },
    {
      path: "/enroll-student",
      element: <EnrollStudentPage />,
      children: [
        {
          index: true,
          element: <EnrollStudent />,
        },
        {
          path: "tests",
          element: <ListOfTests />,
        },
        {
          path: "batch-selection",
          element: <BatchTablePage />,
        },
        {
          path: "student-selection/:batchId",
          element: <StudentSelectionPage />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(appRoutes);

  return (
    <QueryClientProvider client={queryClient}>
      <CourseCurriculumFlagProvider>
        <RouterProvider router={router} />
      </CourseCurriculumFlagProvider>
    </QueryClientProvider>
  );
}

export default App;
// add lazy loader to all the routs
