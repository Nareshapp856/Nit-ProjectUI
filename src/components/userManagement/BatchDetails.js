import { Button } from "@mui/material";
import StudentTable from "./BatchDetails/StudentTable";
import BatchSelector from "./BatchDetails/BatchSelector";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  retriveUserSelectionPageDetails,
  submitBatchCreationPage,
  types,
  userManagementEssentials,
} from "../../store/root.actions";
import userManagementSlice, {
  resetUserManagementData,
  setShowWarn,
  setUserManagementSliceData,
} from "../../store/slice/userManagement.slice";
import { useEffect, useRef } from "react";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router";
import {
  modulesListSlice,
  submitBatchCreationActionSlice,
  submitEnrollStudentPageSlice,
  userManagementPageSlice,
} from "../../store/root.slice";
import api from "../../services/api";
import { useParams } from "react-router";
import { resetExcelImportData } from "../../store/slice/excelStudents.slice";

function BatchDetailsComponent({
  userManagementPageState,
  dbStudents,
  excelStudnetReducer,
  facultyList,
  mentorList,
  isMentoreLoading,
  isFacultyLoading,
  isTechnologyLoading,
  isStudentLoading,
  isMentoreError,
  isFacultyError,
  isTechnologyError,
  isStudentError,
  fetchEssentials,
  retriveBatchData,
  retrivedBatchDetails,
  isBatchDetailsLoading,
  isBatchDetailsError,
  setUserManagementDispatch,
}) {
  const dispatch = useDispatch();
  const batchSelectionRef = useRef();
  const {
    includedStudents,
    batchAdmin,
    batchName,
    endDate,
    facultyId,
    mentorId,
    moduleId,
    startDate,
    technologyId,
  } = userManagementPageState;
  const isLoading =
    isMentoreLoading ||
    isFacultyLoading ||
    isTechnologyLoading ||
    isStudentLoading ||
    isBatchDetailsLoading;

  const navigate = useNavigate();
  const { batchId } = useParams();

  useEffect(() => {
    if (batchId && Number(batchId) && Number(batchId) !== NaN) {
      retriveBatchData(batchId);
    }
  }, [batchId]);

  const isError =
    isMentoreError ||
    isFacultyError ||
    isTechnologyError ||
    isStudentError ||
    isBatchDetailsError;

  useEffect(() => {
    fetchEssentials();
    dispatch(resetExcelImportData());
    dispatch(resetUserManagementData());
    dispatch(modulesListSlice.actions.resetState());
    dispatch(userManagementPageSlice.actions.resetState());
  }, [batchId]);

  useEffect(() => {
    if (
      retrivedBatchDetails &&
      batchId &&
      Number(batchId) &&
      Number(batchId) !== NaN
    ) {
      setUserManagementDispatch({
        technologyId: retrivedBatchDetails.technologyId || 0,
        moduleId: retrivedBatchDetails.moduleId || 0,
        batchName: retrivedBatchDetails.batchName || "",
        batchAdmin: retrivedBatchDetails.batchAdmin || "",
        mentorId:
          retrivedBatchDetails.mentorIds
            ?.split(",")
            .map((ele) => Number(ele)) || [],
        facultyId:
          retrivedBatchDetails.facultyIds
            ?.split(",")
            .map((ele) => Number(ele)) || [],
        includedStudents:
          retrivedBatchDetails.studentIds
            ?.split(",")
            .map((ele) => Number(ele)) || [],
        startDate: retrivedBatchDetails?.startDate
          ? new Date(Date.parse(retrivedBatchDetails.startDate))
              .toISOString()
              .substring(0, 10)
          : "",
        endDate: retrivedBatchDetails?.endDate
          ? new Date(Date.parse(retrivedBatchDetails.endDate))
              .toISOString()
              .substring(0, 10)
          : "",
      });
    }
  }, [retrivedBatchDetails]);

  const onSubmit = async () => {
    console.log("on submit function");
    try {
      const res = await api.post(
        "http://49.207.10.13:5004/apinit/Create_StudentBatch",
        {
          batchAdmin: batchAdmin || null,
          batchName: batchName || null,
          end_Date: endDate || null,
          // Facaulty: facultyNames.join(",") || null,
          // Mentor: mentorNames.join(",") || null,
          // ModuleId: moduleId || null,
          start_Date: startDate || null,
          technologyId: technologyId || null,
        }
      );

      if (res?.data.success) {
        window.alert("Batch created successfully");
        dispatch(userManagementPageSlice.actions.resetState());
        navigate("/user-management");
      }
    } catch (err) {}
  };

  return (
    <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
      {isLoading && (
        <div className="fixed h-[100vh] w-[100vw] grid place-content-center bg-white top-0 left-0 z-50">
          <BarLoader />
        </div>
      )}
      {isError && (
        <div className="fixed h-[100vh] w-[100vw] grid place-content-center bg-white top-0 left-0 z-50">
          <BarLoader />
        </div>
      )}
      <form>
        <div
          className="flex flex-wrap gap-4 justify-between w-auto"
          ref={batchSelectionRef}
        >
          <BatchSelector />
        </div>
        {/* <div>
          <StudentTable />
        </div> */}

        <div className="mt-5 w-full mx-auto">
          <Button variant="contained" onClick={onSubmit}>
            {batchId === "0" ? "Create Batch" : "Update Batch"}
          </Button>
        </div>
      </form>
    </div>
  );
}

const mapStateToComponent = (state) => ({
  dbStudents: state.studentListByTechModuleReducer.data,
  excelStudnetReducer: state.excelStudnetReducer.excelImports,
  facultyList: state.facultyListReducer.data,
  mentorList: state.mentorListReducer.data,
  userManagementPageState: state.userManagementPageReducer,
  isMentoreLoading: state.mentorListReducer.isLoading,
  isFacultyLoading: state.facultyListReducer.isLoading,
  isTechnologyLoading: state.technologiesListReducer.isLoading,
  isStudentLoading: state.studentListByTechModuleReducer.isLoading,
  isMentoreError: state.mentorListReducer.isError,
  isFacultyError: state.facultyListReducer.isError,
  isTechnologyError: state.technologiesListReducer.isError,
  isStudentError: state.studentListByTechModuleReducer.isError,
  retrivedBatchDetails: state.retriveBatchDetailsReducer.data,
  isBatchDetailsLoading: state.retriveBatchDetailsReducer.isLoading,
  isBatchDetailsError: state.retriveBatchDetailsReducer.isError,
});

const mapDispatch = {
  submit: (data) => submitBatchCreationPage(data),
  fetchEssentials: () => userManagementEssentials(),
  retriveBatchData: (batchId) => ({
    type: types.RETRIVEBATCH_PAGE,
    payload: batchId,
  }),
  setUserManagementDispatch: setUserManagementSliceData,
};

const BatchDetails = connect(
  mapStateToComponent,
  mapDispatch
)(BatchDetailsComponent);

export default BatchDetails;
