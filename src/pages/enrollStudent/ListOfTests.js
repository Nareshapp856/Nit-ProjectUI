// Remove Technical Difficulty

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import {
  fetchBatchDetailsList,
  fetchTestList,
  retriveTestSelectionPageDetails,
  submitEnrollStudentPage,
  types,
} from "../../store/root.actions";
import {
  resetEnrollStudentDetailsSlice,
  setBatchIdList,
  setExcludedArray,
  setIncludedStudents,
  setModule,
  setTechnology,
  setTestIdList,
} from "../../store/slice/enrollStudent.slice";
import EnrollStudentNavigation from "../../ui/EnrollStudent/EnrollStudentNavigation";
import TechnologySelector from "../../components/enrollStudent/TechnologySelector/TechnologySelector";
import TestTable from "../../components/enrollStudent/TestTable/TestTable";
import {
  getEnrollmentSubmitData,
  getEnrollmentSubmitDataFromExcludes,
  getFilteredEnrollStudentSlice,
  getFormatedExcludes,
} from "../../util/helper";
import { useLocation, useNavigate } from "react-router";
import {
  batchDetailsListSlice,
  modulesListSlice,
  testListSlice,
} from "../../store/root.slice";
import SubmitModal from "../../ui/EnrollStudent/modal/SubmitModal";
import Modal from "../../ui/Modal";
import axios from "axios";
import { getBatchWarn } from "../../util/http";
import Warnings from "../../components/enrollStudent/warnings/Warnings";
import { BarLoader } from "react-spinners";

function ListOfTests() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const edit = queryParams.get("edit") === "true" ? true : false;
  const enrollId = queryParams.get("enrollId") || 0;
  const [onSubmitButtonClick, setOnSubmitButtonClick] = useState(false);
  const [testData, setTestData] = useState([]);
  const [warnings, setWarnings] = useState({});
  const [isNotSelected, setIsNotSelected] = useState({
    technology: false,
    module: false,
  });
  const [retrivedDataString, setRetrivedDataString] = useState();
  const { data: testList, isLoading } = useSelector(
    (store) => store.testListReducer
  );
  const { technology: selectedTechnology, module: selectedModule } =
    useSelector((store) => store.enrollStudentReducer);
  const { includedStudents, excludedStudents, testIdList, batchIdList } =
    useSelector((store) => store.enrollStudentReducer);

  const { TechnologyId: retrivedTechnologyId, ModuleId: retrivedModuleId } =
    useSelector((store) => store.testSelectionPageReducer).data?.[0] || {};

  const {
    data: retrivedData,
    isError: isErrorRetrivingData,
    isLoading: isLoadingRetriveData,
  } = useSelector((store) => store.testSelectionPageReducer);
  const {
    data: submitResponse,
    isLoading: isSubmitting,
    isError: isErrorSubmitting,
    state: submittionState,
    isSuccess: isSubmittionSuccess,
  } = useSelector((store) => store.submitEnrollStudentPageReducer);

  useEffect(() => {
    dispatch({
      type: types.TEST_LIST,
      payload: { technologyId: null, moduleId: null },
    });

    setTimeout(() => {
      dispatch({
        type: types.BATCHDETAILS_LIST,
        payload: { technologyId: null, moduleId: null },
      });
    }, 300);
  }, []);

  useEffect(() => {
    dispatch(testListSlice.actions.resetState());
    dispatch(batchDetailsListSlice.actions.resetState());
  }, []);

  // Reset Data if id is 0
  useEffect(() => {
    if (enrollId === "0") {
      dispatch(resetEnrollStudentDetailsSlice());
      dispatch(modulesListSlice.actions.resetState());
      dispatch(testListSlice.actions.resetState());
    }
  }, [enrollId]);

  useEffect(() => {
    if (edit === true) {
      if (
        (!retrivedTechnologyId || !retrivedModuleId) &&
        retrivedTechnologyId === undefined &&
        retrivedModuleId === undefined
      ) {
      } else {
        dispatch(setTechnology(retrivedTechnologyId));
        dispatch(setModule(retrivedModuleId));
        dispatch(
          fetchTestList({
            technologyId: retrivedTechnologyId,
            moduleId: retrivedModuleId,
          })
        );
        dispatch(
          fetchBatchDetailsList({
            technologyId: retrivedTechnologyId,
            moduleId: retrivedModuleId,
          })
        );
      }
    }
  }, [retrivedTechnologyId, retrivedModuleId]);

  useEffect(() => {
    if (retrivedData) {
      const { testIdList, batchIdList, studentIdList } =
        getFilteredEnrollStudentSlice(retrivedData);

      if (enrollId !== "0") {
        setRetrivedDataString(
          JSON.stringify(testIdList) +
            JSON.stringify(batchIdList) +
            JSON.stringify(studentIdList)
        );
        dispatch(setIncludedStudents(studentIdList));
        dispatch(setTestIdList(testIdList));
        dispatch(setBatchIdList(batchIdList));
      }
    }
  }, [retrivedData]);

  useEffect(() => {
    if (enrollId && edit === true)
      dispatch(retriveTestSelectionPageDetails(enrollId));
  }, []);

  useEffect(() => {
    setTestData(testList || []);
  }, [testList]);

  useEffect(() => {
    if (isNotSelected.technology || isNotSelected.module) {
      setIsNotSelected((prev) => ({
        ...prev,
        technology: false,
        module: false,
      }));
    }
  }, [selectedTechnology, selectedModule, isLoading]);

  const onTestSelect = (e, selectedTest_Id) => {
    if (!e.target.checked) {
      dispatch(
        setTestIdList(testIdList.filter((id) => id !== selectedTest_Id))
      );
    } else {
      dispatch(setTestIdList([...testIdList, selectedTest_Id]));
    }
  };

  const fetchTestTableHandler = () => {
    if (selectedTechnology) {
      dispatch(
        fetchTestList({
          technologyId: selectedTechnology,
          moduleId: selectedModule,
        })
      );

      dispatch(
        fetchBatchDetailsList({
          technologyId: selectedTechnology,
          moduleId: selectedModule,
        })
      );
    } else {
      setIsNotSelected((prev) => ({
        ...prev,
        technology: !selectedTechnology,
        module: !selectedModule,
      }));
    }
  };

  useEffect(() => {
    if (
      submitResponse &&
      submittionState === "resolved" &&
      !isSubmitting &&
      onSubmitButtonClick
    ) {
      window.alert(
        `Enrollment ${enrollId === "0" ? "scheduled" : "updated"} successfully`
      );
      navigate("/enroll-student");
    }
  }, [
    submitResponse,
    isSubmitting,
    isErrorSubmitting,
    submittionState,
    isSubmittionSuccess,
    onSubmitButtonClick,
    navigate,
  ]);

  const submitHandler = async () => {
    try {
      let filteredIncludedStudents = getFormatedExcludes(
        includedStudents,
        testList
      );
      let result = getEnrollmentSubmitData({
        enrollId,
        selectedTechnology,
        selectedModule,
        filteredIncludedStudents,
      });

      const warn = getBatchWarn(
        setWarnings,
        testIdList,
        batchIdList,
        includedStudents
      );

      if (!warn) {
        dispatch(submitEnrollStudentPage(result));
        setOnSubmitButtonClick(true);
      }
    } catch (err) {}
  };

  if (isErrorRetrivingData)
    return (
      <div className="fixed h-[100vh] w-[100vw] grid place-content-center bg-white top-0 left-0 z-50">
        <BarLoader />
      </div>
    );
  if (isLoadingRetriveData)
    return (
      <div className="fixed h-[100vh] w-[100vw] grid place-content-center bg-white top-0 left-0 z-50">
        <BarLoader />
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen">
      {/* <header className="bg-gray-100">
        <EnrollStudentNavigation />
      </header> */}

      <main className="flex-grow mt-8 mb-8">
        <section>
          <TechnologySelector
            fetchHandler={fetchTestTableHandler}
            isNotSelected={isNotSelected}
          />
        </section>

        {Object.keys(warnings).length > 0 && (
          <article className="w-4/6 mx-auto mt-5">
            <Warnings warnings={warnings} />
          </article>
        )}

        <section className="mt-10 flex-grow">
          <TestTable testData={testData} onTestSelect={onTestSelect} />
          <div className="w-4/6 mx-auto mt-5">
            <Button
              variant="contained"
              disabled={
                Object.keys(batchIdList).length <= 0 ||
                retrivedDataString ===
                  JSON.stringify(testIdList) +
                    JSON.stringify(batchIdList) +
                    JSON.stringify(includedStudents)
              }
              onClick={submitHandler}
            >
              {isErrorSubmitting
                ? "Error Submitting retry?"
                : isSubmitting
                ? "Loading..."
                : "Submit"}
            </Button>
          </div>
        </section>
      </main>

      {/* <footer className="bg-gray-100 p-6">
        <div className="max-w-full grid place-content-center overflow-hidden">
          <span className="">
            © 2023 Naresh i Technologies | Software Training - Online | All
            Rights Reserved.
          </span>
        </div>
      </footer> */}
    </div>
  );
}

export default ListOfTests;
