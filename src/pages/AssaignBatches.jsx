import axios from "axios";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Snackbar,
  Alert,
  Box,
} from "@mui/material";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import React, { useCallback, useState, useEffect } from "react";
// import { useAssignBatchData } from "../../../hooks/admin/useAssignBatchData";
import {
  fetchAdminAssignedBatchesAPI,
  submitAssignBatches,
} from "../store/Faculty/api";
import { connect } from "react-redux";
import BatchTable from "../components/BatchTable";
// import { useFeatureFlags } from "../../../context/FeatureFlagContext";

const initialFormData = {
  technology: "0",
  batch: "0",
  faculty: "0",
};

function AssignBatchesComponent({ userId }) {
  const [adminsBatchTable, setAdminBatchTable] = useState(true);
  const [formData, setFormData] = useState(initialFormData);
  const [submitMsg, setSubmitMsg] = useState("assign");
  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [selectedRole, setSelectedRole] = useState("admin"); // For radio selection
  const [dropdownOptions, setDropdownOptions] = useState([]); // Dropdown data from API
  const [dropdownValue, setDropdownValue] = useState("");
  const [technology, setTechnology] = useState("");

  const [technologyData, setTechnologyData] = useState([]);
  const [batches, setBatches] = useState([]);
  const [batchId, setBatchId] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (selectedRole) {
      fetchAssignedBatches(setTableData);
    }
  }, [selectedRole]);

  const fetchAssignedBatches = async (setter) => {
    try {
      const res = await fetchAdminAssignedBatchesAPI(selectedRole);
      setter(res.data || []);
    } catch (error) {
      console.error(error);
    }
  };
  const resetFormData = useCallback((type) => {
    if (type === "reset")
      setFormData((prev) => ({
        ...initialFormData,
        technology: prev.technology,
      }));
  }, []);

  //   const [batchList, technologyList, facultyList] = useAssignBatchData({
  //     technologyId: formData.technology,
  //     resetFormData,
  //   });

  const onFormData = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.batch === "0") {
      newErrors.batch = "Please select a batch.";
    }
    if (formData.faculty === "0") {
      newErrors.faculty = "Please select a faculty.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    if (!validateForm()) {
      return; // Prevent submission if validation fails
    }

    // try {
    //   const res = await submitAssignBatches({
    //     userId,
    //     batchId: formData.batch,
    //     facultyId: formData.faculty,
    //   });

    //   if (res.status === 201) {
    //     setSnackbarMessage(
    //       "Successfully added this assignment to faculty list."
    //     );
    //     setSnackbarSeverity("success");
    //     setSnackbarOpen(true);
    //     setFormData((prev) => ({
    //       ...initialFormData,
    //       technology: prev.technology,
    //     }));
    //     if (submitMsg !== "assign") setSubmitMsg("assign");
    //   }

    //   fetchAssignedBatches(setTableData);
    // } catch (error) {
    //   let message = "Something went wrong, please retry.";
    //   if (error.response.status === 409) {
    //     message = error.response.data.message;
    //     setSnackbarSeverity("warning");
    //   } else if (error.response.status === 500) {
    //     setSnackbarSeverity("error");
    //   }

    //   setSnackbarMessage(message);
    //   setSnackbarOpen(true);
    // }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // State for selected radio button value
  // const [selectedValue, setSelectedValue] = useState("");
  // State for input box value
  // const [inputValue, setInputValue] = useState("");

  // Handle radio button change
  // const handleRadioChange = (event) => {
  //   const newValue = event.target.value;
  //   setSelectedValue(newValue);

  // Change the input box value dynamically
  //   setInputValue(`You selected: ${newValue}`);
  //   console.log(newValue);
  // };

  useEffect(() => {
    fetchData(selectedRole);
  }, [selectedRole]);

  // Fetch data from API based on selected role
  const fetchData = async (selectedRole) => {
    try {
      const response = await axios.get(
        `http://49.207.10.13:4017/api/fetFacultyInterviewerAdminMentor?type=${selectedRole}`
      );

      setDropdownOptions(response.data); // Update dropdown options with API data
    } catch (error) {
      console.error("Error fetching data:", error);
      setDropdownOptions([]); // Clear options if an error occurs
    }
  };

  // Handle radio button change
  const handleRadioChange = (event) => {
    const type = event.target.value;
    setSelectedRole(type);
    setDropdownValue(""); // Reset dropdown selection
    fetchData(type); // Fetch data for the selected role
  };

  // Handle dropdown selection
  const handleDropdownChange = (event) => {
    const userId = event.target.value;
    setDropdownValue(userId);
  };

  const fetchTechnology = async (userId, type) => {
    console.log(userId, type);
    try {
      const res = await axios.get(
        `http://49.207.10.13:4017/api/fetchTechnologiesFacultyMentorInterviewer?userId=${userId}&type=${type}`
      );
      console.log("Technology Data:", res.data);
      setTechnologyData(res.data.data); // Update technology data
      // If a technology is selected, fetch batches based on the technology
    } catch (error) {
      console.error("Error fetching technology:", error);
      setTechnologyData([]); // Clear technology data if an error occurs
    }
  };

  useEffect(() => {
    if (technology) {
      fetchBatches(technology);
    }
  }, [technology]);

  useEffect(() => {
    if (dropdownValue) {
      // Fetch technology based on userId and selected role
      fetchTechnology(dropdownValue, selectedRole);
    }
  }, [dropdownValue]);

  const fetchBatches = async (TechnologyId) => {
    try {
      console.log("technologyId");
      console.log(TechnologyId);
      const res = await axios.get(
        `http://49.207.10.13:4017/api/fetchBatchesByTechnologyid?technologyId=${TechnologyId}`
      );
      console.log("Batches Data:", res.data);
      setBatches(res.data); // Update batches state with the fetched data
    } catch (error) {
      console.error("Error fetching batches:", error);
      setBatches([]); // Clear batches if an error occurs
    }
  };

  // Handle batch dropdown selection
  const handleBatchDropdownChange = (event) => {
    const selectedBatch = event.target.value;
    console.log("Selected Batch:", selectedBatch);
    setBatchId(selectedBatch);
    // Handle the selected batch as needed
  };

  const postData = async (data) => {
    if (data.BatchId === "" || data.UserId === "" || data.technologyId === "") {
      setSnackbarMessage("All Fields must be selected");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);

      return;
    }
    try {
      const response = await axios.post(
        "http://49.207.10.13:4017/api/inserUpdateFacultyMentorBatchMapping",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSnackbarMessage(response.data.message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      console.log("Data posted successfully:", response.data);
      fetchAssignedBatches(setTableData);
      setShowForm(!showForm);
      return response.data;
    } catch (error) {
      setSnackbarMessage("Failed to Assaign Batch");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Error posting data:", error);
    }
  };

  // Usage
  const dataToPost = {
    UserId: dropdownValue,
    technologyId: technology,
    BatchId: batchId,
    type: selectedRole,
  };

  function submitData() {
    postData(dataToPost);
  }

  const handleSelectedRole = () => {
    if (selectedRole === "") {
      setErrors({ ...errors, selectedRole: true });
    } else {
      setErrors({ ...errors, selectedRole: false });
    }
  };
  return (
    <div className="space-y-6" style={{ padding: "10px" }}>
      <div>
        <div className="">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-semibold text-gray-700">
              Assign Batches
            </h1>
          </div>
          <hr className="mb-6 border-gray-300" />
        </div>

        <div className="mb-5">
          <FormControl
            error={!!errors.selectedRole}
            fullWidth
            sx={{ width: "50%" }}
          >
            <InputLabel id="dropdown-label">Select Role</InputLabel>
            <Select
              labelId="dropdown-label"
              value={selectedRole || "admin"}
              onChange={handleRadioChange}
              name="role-dropdown"
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="faculty">Faculty</MenuItem>
              <MenuItem value="interviewer">Interviewer</MenuItem>
              <MenuItem value="mentor">Mentor</MenuItem>
            </Select>
            {errors.selectedRole && (
              <Box sx={{ color: "error.main", fontSize: "0.8rem", mt: 1 }}>
                Select User Role
              </Box>
            )}
          </FormControl>
        </div>
        <div>
          <Button
            onClick={() => {
              setShowForm(!showForm);
            }}
            variant="contained"
            sx={{ mb: 2 }}
          >
            {!showForm ? "Add New" : "show Batches Data"}
          </Button>
        </div>

        {showForm && (
          <>
            <div
              style={{
                width: "100%",
                display: "flex", // Equivalent to 'flex'
                flexWrap: "wrap", // Equivalent to 'flex-wrap'
                justifyContent: "space-between", // Equivalent to 'justify-between'
                gap: "2rem",
              }}
            >
              <div className="w-[24rem]" style={{ width: "24rem" }}>
                <FormControl fullWidth error={!!errors.faculty}>
                  <InputLabel id="select-faculty">
                    <span className="text-red-600">* </span> Select user Name
                  </InputLabel>
                  <Select
                    name="faculty"
                    labelId="select-faculty"
                    onOpen={handleSelectedRole}
                    value={dropdownValue}
                    onChange={handleDropdownChange} // Handles setting faculty selection and fetching technology options
                  >
                    {Array.isArray(dropdownOptions) &&
                    dropdownOptions.length > 0 ? (
                      dropdownOptions.map((option, index) => (
                        <MenuItem
                          key={index}
                          value={
                            option.Facaulty_Id ||
                            option.AdminId ||
                            option.Mentor_Id ||
                            option.MemberID
                          }
                        >
                          {option.Admin_Name ||
                            option.Mentor_Name ||
                            option.Name ||
                            option.Facaulty_Name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No user Found</MenuItem>
                    )}
                  </Select>

                  {/* {!!errors.faculty && (
      <FormHelperText>{errors.faculty}</FormHelperText>
    )} */}
                </FormControl>
              </div>

              <div className="w-[24rem]" style={{ width: "24rem" }}>
                <FormControl fullWidth>
                  <InputLabel id="select-technology">
                    Select A Technology
                  </InputLabel>
                  <Select
                    labelId="select-technology"
                    name="technology"
                    value={technology}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setTechnology(e.target.value);
                    }} // Capture selected technology value
                  >
                    {Array.isArray(technologyData) &&
                    technologyData.length > 0 ? (
                      technologyData?.map((option) => (
                        <MenuItem
                          key={option.TechnologyId}
                          value={option.TechnologyId}
                        >
                          {option.TechnologyName}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No Technology Found</MenuItem>
                    )}
                  </Select>
                  {/* {!!errors.technology && (
      <FormHelperText>{errors.technology}</FormHelperText>
    )} */}
                </FormControl>
              </div>

              <div className="w-[24rem]" style={{ width: "24rem" }}>
                <FormControl fullWidth error={!!errors.batch}>
                  <InputLabel>
                    Select A Batch<span className="text-red-600">*</span>
                  </InputLabel>
                  <Select
                    name="batch"
                    onChange={handleBatchDropdownChange}
                    labelId="select-batch"
                    // value={formData.batch}
                    value={batchId}
                    label="Select A Batch"
                  >
                    {Array.isArray(batches) && batches.length > 0 ? (
                      batches?.map((batch) => (
                        <MenuItem key={batch.BatchId} value={batch.BatchId}>
                          {batch.BatchName}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No Batch Found</MenuItem>
                    )}
                  </Select>
                  {/* {!!errors.batch && (
                <FormHelperText>{errors.batch}</FormHelperText>
              )} */}
                </FormControl>
              </div>
            </div>
            <div style={{ marginTop: "10px" }}>
              {/* <Button
            onClick={onSubmit}
            variant="contained"
            sx={{
              width: "10rem",
            }}
          >
            {submitMsg}
          </Button> */}
              {/* <button onClick={submitData}>Submit</button> */}
              <Button variant="contained" onClick={submitData}>
                ASSIGN
              </Button>
            </div>
          </>
        )}
      </div>

      {!showForm && (
        <BatchTable
          tableData={tableData}
          fetchAssignedBatches={fetchAssignedBatches}
          setTableData={setTableData}
        />
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position at top right
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

const AssignBatches = connect(mapState)(AssignBatchesComponent);

export default AssignBatches;
