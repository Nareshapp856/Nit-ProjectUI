import React, {
  useRef,
  useState,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, Stack, Typography } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router-dom";

import BatchSelection from "../../components/Faculty/BatchSelection";
import AssignForm from "../../components/Faculty/AssaignForm";
import {
  assignCurriculumToFaculty,
  fetchAssignedCurriculumAPI,
  updateAssignCurriculumToFacultyAPI,
} from "../../store/Faculty/api";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const fetchAssignedCurriculumData = async (payload, setter) => {
  const res = await fetchAssignedCurriculumAPI(payload);
  console.log("fetch assignend curriculum data:", res.data);
  setter(res.data);
};

const initialPageState = {
  isSubmitting: false,
  isError: false,
  error: null,
  response: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "submitting": {
      return { ...state, isSubmitting: true, isError: false };
    }
    case "submited": {
      return { ...state, isSubmitting: false, isError: false };
    }
    case "error": {
      return {
        ...state,
        isSubmitting: false,
        isError: true,
        error: action.payload,
      };
    }
    default:
      throw new Error("unKnown type");
  }

  return state;
};

function BatchFormComponent({ userId, setView, courseCurriculumList }) {
  // to show loading and other stuff for form
  const [pageState, dispatch] = useReducer(reducer, initialPageState);
  // null or selectedBatch Object {"name": "batch1","id": 1,"technologyName": "Java","startDate": "2024-09-06T00:00:00.000Z","time": "12:02"}
  const [selectedBatch, setSelectedBatch] = useState({});
  // curriculum input is not controlled just storing value so that i can passit to submit
  const [selectedCurriculum, setSelectedCurriculum] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [snackbarSeverity, setSnackbarSeverity] = useState(null);

  const location = useLocation();
  const Navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  // e stands for edit === "true" if editing
  const e = queryParams.get("e");
  // assignedCurriculum id
  const assignedCurriculumId = queryParams.get("id");

  const editDataAdaptor = useCallback(
    (data) => {
      console.log("edit adaptier api res:", data);
      setSelectedBatch({
        id: data.batchid,
        startDate: data.TestStartDate,
        endDate: data.TestEndDate,
        curriculam_Id: data.curriculam_Id,
        startTime: data.TestStartTime,
        endTime: data.TestEndTime,
        assessmentId: data.assessmentId,
      });

      setSelectedCurriculum(data.curriculam_Id);
    },
    [setSelectedBatch, setSelectedCurriculum]
  );

  useEffect(() => {
    if (e === "true" && assignedCurriculumId) {
      fetchAssignedCurriculumData(assignedCurriculumId, editDataAdaptor);
    }
  }, [e]);

  // used to get selected Batch return autocomplete onChange data
  const onSelect = (newValue) => {
    setSelectedBatch({ ...selectedBatch, id: newValue });
  };

  // user should be able to modify the data and time in batch Assign form
  const onDateTimeChange = (e) => {
    console.log(e.target.name, e.target.value);
    setSelectedBatch((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "startDate") {
      getDates(e.target.value);
    }
    
  };
  // to remove all state
  const onReset = ({ curriculum }) => {
    console.log("curriculum reset:");
    setSelectedBatch({
      id: "",
      startDate: "",
      endDate: "",
      assignedBatchesId: "",
      startTime: "",
      endTime: "",
    });
    if (e) {
      Navigate("/assaign-curriculum");
    }

    if (curriculum !== false) setSelectedCurriculum(null);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(!openSnackbar);
  };

  const onCurriculumChange = (newValue) => {
    setSelectedCurriculum(newValue || null);
  };

  const getDates = async (startDate) => {
    console.log("selected batch:", selectedCurriculum, startDate);
    if (
      selectedCurriculum !== "" &&
      selectedCurriculum !== null &&
      startDate === "" &&
      startDate !== null
    ) {
      console.log(selectedCurriculum !== null);
      const res = await axios.put(
        "http://49.207.10.13:4017/apinit/getDatesForStudentCalender",
        {
          curriculumId: selectedCurriculum,
          StartDate: startDate,
        }
      );

      setSelectedBatch({
        ...selectedBatch,
        startDate: res.data[0].TestStartDate,
        endDate: res.data[0].TestEndtDate,
      });
    }
  };

  const submitHandler = async () => {
    try {
      dispatch({ type: "submitting" });

      if (e) {
        const res = await assignCurriculumToFaculty({
          batchId: selectedBatch.id, // Use string keys
          curriculumId: selectedCurriculum, // Use string keys
          testStartTime: selectedBatch.startTime,
          testEndTime: selectedBatch.endTime,
          status: "draft",
        });
        searchParams.delete("e");
        searchParams.delete("id");

        setSearchParams(searchParams);
        setView("show");
      } else {
        if (
          selectedBatch.id === undefined ||
          selectedCurriculum === undefined ||
          selectedCurriculum === null ||
          selectedBatch.startTime === undefined ||
          selectedBatch.endTime === undefined
        ) {
          setOpenSnackbar(true);
          setSnackbarMessage("All fields must be required");
          setSnackbarSeverity("warning");
          return;
        }
        const res = await assignCurriculumToFaculty({
          batchId: selectedBatch.id, // Use string keys
          curriculumId: selectedCurriculum, // Use string keys
          testStartTime: selectedBatch.startTime,
          testEndTime: selectedBatch.endTime,
          status: "draft",
        });
        console.log("assaign curriculum to batch response", res);
      }

      // successfully submited
      // dispatch({ type: "submited" });
      // onReset({ curriculum: false });
      setOpenSnackbar(true);
      setSnackbarMessage(
        `Successfully ${e ? "updated" : "Assigned"} Curriculum`
      );
      setSnackbarSeverity("success");
    } catch (error) {
      // dispatch({ type: "error" });

      // if (error.response.status === 409) {
      //   return alert(error.response.data.message);
      // }

      console.log("something went wrong!", error);
    }
  };

  const ApproveHandler = async () => {
    try {
      if (e) {
        console.log("updating curriculum:", selectedBatch);
        if (
          selectedBatch.id === undefined ||
          selectedCurriculum === undefined ||
          selectedCurriculum === null ||
          selectedBatch.startTime === undefined ||
          selectedBatch.endTime === undefined
        ) {
          setOpenSnackbar(true);
          setSnackbarMessage("All fields must be required");
          setSnackbarSeverity("warning");
          return;
        }
        const res = await assignCurriculumToFaculty({
          batchId: selectedBatch.id, // Use string keys
          curriculumId: selectedCurriculum, // Use string keys
          testStartTime: selectedBatch.startTime,
          testEndTime: selectedBatch.endTime,
          status: "pending",
        });

        searchParams.delete("e");
        searchParams.delete("id");

        setSearchParams(searchParams);
        setView("show");
      }
      if (
        selectedBatch.id === undefined ||
        selectedCurriculum === undefined ||
        selectedCurriculum === null ||
        selectedBatch.startTime === undefined ||
        selectedBatch.endTime === undefined
      ) {
        setOpenSnackbar(true);
        setSnackbarMessage("All fields must be required");
        setSnackbarSeverity("warning");
        return;
      }
      const res = await assignCurriculumToFaculty({
        batchId: selectedBatch.id, // Use string keys
        curriculumId: selectedCurriculum, // Use string keys
        testStartTime: selectedBatch.startTime,
        testEndTime: selectedBatch.endTime,
        status: "pending",
      });
      console.log("assaign curriculum to batch response", res);
      setOpenSnackbar(true);
      setSnackbarMessage("Successfully sent to admin for Approval.");
      setSnackbarSeverity("success");
    } catch (error) {
      console.log(error);
      setOpenSnackbar(true);
      setSnackbarMessage("Error in submiting to Approval", error);
      setSnackbarSeverity("error");
    }
  };

  return (
    <div>
      <BatchSelection onSelect={onSelect} selectedBatch={selectedBatch} />

      <div className="max-w-[800px] mt-8">
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: "bold", marginBottom: 4 }}
        >
          Batch Assignment Form{" "}
          {!selectedBatch && (
            <small className="text-sm">(Must Select Batch)</small>
          )}
        </Typography>
        <AssignForm
          labels={selectedBatch}
          selectedCurriculum={selectedCurriculum}
          onDateTimeChange={onDateTimeChange}
          onCurriculumChange={onCurriculumChange}
          courseCurriculumList={courseCurriculumList}
        />

        {/* Action Buttons */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          marginTop={6}
          sx={{ width: "100%" }}
        >
          <Button
            variant="contained"
            color="primary"
            // disabled={pageState.isSubmitting}
            startIcon={<AssignmentIcon />}
            sx={{ width: 150 }}
            onClick={submitHandler}
          >
            {pageState.isError
              ? "retry?"
              : // : pageState.isSubmitting
              // ? "Loading..."
              e === "true"
              ? "Update"
              : "Assign"}
          </Button>
          <Button
            variant="contained"
            color="primary"
            // disabled={pageState.isSubmitting}
            startIcon={<AssignmentIcon />}
            sx={{ width: 150 }}
            onClick={ApproveHandler}
          >
            Send For Approval
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            startIcon={<RefreshIcon />}
            sx={{ width: 150 }}
            onClick={onReset}
          >
            Reset
          </Button>
        </Stack>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: "top", // Position at the top of the screen
          horizontal: "right", // Position to the right of the screen
        }}
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

const mapState = (state) => ({
  userId: JSON.parse(localStorage.getItem("auth")).userId,
});

const BatchForm = connect(mapState)(BatchFormComponent);

export default BatchForm;
