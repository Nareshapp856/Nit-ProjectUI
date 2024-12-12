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
import { useEffect, useRef, useState } from "react";
import { BarLoader } from "react-spinners";
import { useNavigate } from "react-router";
import { Checkbox, Snackbar, Alert } from "@mui/material";
import {
  modulesListSlice,
  submitBatchCreationActionSlice,
  submitEnrollStudentPageSlice,
  userManagementPageSlice,
} from "../../store/root.slice";
import api from "../../services/api";
import { useParams } from "react-router";
import { resetExcelImportData } from "../../store/slice/excelStudents.slice";
import axios from "axios";

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
  console.log("dbstudents:", dbStudents);
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

  const [batcid, setBatchId] = useState();
  // Snackbar states
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

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

  // Handle Assign Students Button click
  const handleAssignStudents = async (rowData) => {
    if (batcid === "" || batcid === null || batcid === undefined) {
      setSnackbarMessage("select a batchId");
      setSnackbarSeverity("warning");
      setOpenSnackbar(true);
      return;
    }
    const Students = rowData.map((row) => {
      const updatedRow = { ...row };
      if (updatedRow.BatchId !== batcid) {
        updatedRow.BatchId = batcid;
      }
      delete updatedRow.StudentID;

      return updatedRow;
    });

    const data = { Students: Students };
    console.log(data);
    const res = await axios.post(
      "http://49.207.10.13:5004/apinit/addStudentsBatch",
      data
    );
    console.log(data);
    console.log(res.data);

    if (res.data.success) {
      setSnackbarMessage(res.data.message);
      setSnackbarSeverity("success");
      window.location.reload();
    } else {
      setSnackbarMessage("Failed to assign students.");
      setSnackbarSeverity("error");
    }

    setOpenSnackbar(true);
  };

  const onSubmit = async () => {
    try {
      const students = includedStudents.map((includedStudent) => {
        let result = excelStudnetReducer.find(
          (student) => student.StudentID === includedStudent
        );
        if (result) {
          // Create a shallow copy of the result object to avoid modifying the read-only property
          let obj = { ...result };
          if (isNaN(Number(obj.StudentID))) {
            obj.StudentID = null;
          }
          obj.LastName = obj.LastName ? obj.LastName : null;
          obj.PhoneNumber = obj.PhoneNumber ? String(obj.PhoneNumber) : null;
          obj.BatchId = null;
          result = obj;
        }
        if (!result)
          result = dbStudents.find(
            (student) => student.StudentID === includedStudent
          );

        return result;
      });
      handleAssignStudents(students);

      //   const facultyNames = facultyId.map((id) => {
      //     const result = facultyList.find(
      //       (faculty) => faculty.Facaulty_Id === id
      //     );
      //     if (result) return result.Facaulty_Name;
      //   });

      //   const mentorNames = mentorId.map((id) => {
      //     const result = mentorList.find((mentor) => mentor.MENTOR_Id === id);
      //     if (result) return result.Mentor_Name;
      //   });

      //   let valid =
      //     includedStudents.length > 0 && batchName && endDate
      //       ? endDate >= startDate
      //       : startDate && technologyId;

      //   if (!valid) {
      //     dispatch(setShowWarn(!valid));

      //     batchSelectionRef.current.scrollIntoView({
      //       behavior: "smooth",
      //       block: "start",
      //     });
      //   }

      //   if (valid) {
      // const res = await api.post("/Create_StudentsBatchs", {
      //   IncludeStudents: students || null,
      //   BatchAdmin: batchAdmin || null,
      //   BatchName: batchName || null,
      //   END_Date: endDate || null,
      //   Facaulty: facultyNames.join(",") || null,
      //   Mentor: mentorNames.join(",") || null,
      //   ModuleId: moduleId || null,
      //   Start_Date: startDate || null,
      //   TechnologyId: technologyId || null,
      // });

      // if (res?.data) {
      //   window.alert(res.data);
      //   dispatch(userManagementPageSlice.actions.resetState());
      //   navigate("/user-management");
      // }
      //   }
    } catch (err) {}
  };

  return (
    <div>
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
        {/* <div
          className="flex flex-wrap gap-4 justify-between"
          ref={batchSelectionRef}
        >
          <BatchSelector />
        </div> */}
        <div>
          <StudentTable setBatchId={setBatchId} batcid={batcid} />
        </div>

        <div className="mt-1 w-[auto] mx-3">
          <Button
            variant="contained"
            onClick={onSubmit}
            disabled={Object.keys(includedStudents).length === 0 ? true : false}
          >
            {Object.keys(includedStudents).length === 0
              ? "At least select one student"
              : "Assign Batch"}
          </Button>
        </div>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
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

const BatchStudentTable = connect(
  mapStateToComponent,
  mapDispatch
)(BatchDetailsComponent);

export default BatchStudentTable;
