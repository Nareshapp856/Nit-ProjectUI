import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from "axios";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import TechnologySelector from "./TechnologySelector";
import { registerInterviewerDispatch } from "../../store/action/Interviewer";
import { fetchTechnologiesAPI } from "../../services/api";
import { resetInterviewerRegistrationSlice } from "../../store/slice/interviewer";

import UsersDataComponent from "./UsersTable";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CircularProgress from "@mui/material/CircularProgress";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

import { Select, MenuItem, InputLabel } from "@mui/material";

const mobileRegex = /^(\+?\d{1,3} ?)?\d{10}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const technologyAdaptor = (techList) => {
  return techList.map((tech) => ({
    id: tech.TechnologyID,
    name: tech.TechnologyName,
  }));
};

const fetchTechnologies = async (setter) => {
  try {
    const res = await fetchTechnologiesAPI();
    setter(technologyAdaptor(res?.data || []));
  } catch (error) {
    setter([]);
  }
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function InterviewerRegisterFormComponent({
  registerInterviewer,
  registerInterviewerState,
  resetRegistrationSlice,
  registerInterviewerError,
  registerInterviewerData,
}) {
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [technologyList, setTechnologyList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    currentCompany: "",
    experience: 0,
    mode: 0,
    type: "",
  });
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [showForm, setShowForm] = useState(false);
  const [selectedValue, setSelectedValue] = useState("admin");
  const [dataSubmit, setDataSubmit] = useState(false);

  const [emailStatus, setEmailStatus] = useState(null); // null, "valid", or "invalid"
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  useEffect(() => {
    fetchTechnologies(setTechnologyList);
    console.log("calling for technologies");
  }, []);

  useEffect(() => {
    if (registerInterviewerState === "reject") {
      setSnackbarMessage(
        registerInterviewerError?.message ||
          "Something went wrong, please retry."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      resetRegistrationSlice();
    }
    if (registerInterviewerState === "response") {
      setSnackbarMessage(
        registerInterviewerData || "Interviewer is registered successfully"
      );
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      resetRegistrationSlice();
      onReset();
    }
  }, [
    registerInterviewerState,
    registerInterviewerError,
    registerInterviewerData,
    resetRegistrationSlice,
  ]);

  const onReset = (options = {}) => {
    if (!options.notTech) setSelectedTechnologies([]);
    setFormData({
      name: "",
      mobile: "",
      email: "",
      currentCompany: "",
      experience: 0,
      mode: 0,
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.mobile.match(mobileRegex))
      newErrors.mobile = "Mobile number is invalid.";
    if (!formData.email) newErrors.email = "Email is required.";
    // if (!formData.currentCompany)
    //   newErrors.currentCompany = "Current company is required.";
    if (formData.experience < 0)
      newErrors.experience = "Experience cannot be negative.";
    if (selectedTechnologies.length === 0)
      newErrors.technologies = "At least one technology must be selected.";
    return newErrors;
  };

  // const handleSubmit = (e) => {
  //   console.log("formdata:", { ...formData, email: formData.email.trim() });
  //   e.preventDefault();
  //   // Ashish Chauhan 10-11-2024
  //   // setSelectedValue(e.target.value);
  //   // Ashish Chauhan 10-11-2024

  //   const validationErrors = validateForm();
  //   if (Object.keys(validationErrors).length) {
  //     setErrors(validationErrors);
  //     return;
  //   } else if (
  //     selectedValue === "" ||
  //     selectedValue === null ||
  //     selectedValue === undefined
  //   ) {
  //     setSnackbarMessage("User Type is not selected.\nPlease fill all fields");
  //     console.log("slected type:", selectedValue);
  //     setSnackbarSeverity("warning");
  //     setSnackbarOpen(true);
  //     return;
  //   }

  //   const completeFormData = {
  //     ...formData,
  //     email: formData.email.trim(),
  //     technologies: selectedTechnologies.map((tech) => tech.id),
  //     type: selectedValue,
  //   };

  //   console.log(completeFormData);

  //   registerInterviewer(completeFormData);
  //   setDataSubmit(true);
  //   setShowForm(!showForm);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Ensure the email is checked and valid before proceeding
    if (emailStatus === "invalid" || !emailRegex.test(formData.email)) {
      setSnackbarMessage("Please enter a valid and unique email address.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    if (emailStatus === null) {
      setSnackbarMessage("Please wait for email validation to complete.");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

    // All checks passed, proceed to submission
    const completeFormData = {
      ...formData,
      email: formData.email.trim(),
      technologies: selectedTechnologies.map((tech) => tech.id),
      type: selectedValue,
      role:"admin"
    };

    registerInterviewer(completeFormData); // Dispatch the action to register
    setDataSubmit(true);
    setShowForm(!showForm);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);

    // Reset the form data and errors when the user type changes
    onReset();
    setSnackbarMessage(""); // Clear any existing snackbar messages
    setEmailStatus(null); // Reset email status
    setIsCheckingEmail(false); // Reset email checking status

    console.log("Selected Value:", value); // Log the selected value on click
  };

  const validateEmailAvailability = async (type, email) => {
    try {
      const response = await axios.get(
        `http://49.207.10.13:4017/api/validateUserExist?type=${type}&email=${email}`
      );
      console.log(response.data.result[0].existuser);
      // Assuming the API returns a response like: { success: true, exists: true/false }
      return response.data.result[0].existuser; // true if email exists, false otherwise
    } catch (error) {
      console.error("Error validating email:", error);
      return null; // null means API error
    }
  };

  const handleEmailChange = async (e) => {
    const email = e.target.value.trim();
    setFormData({ ...formData, email });
    setErrors({ ...errors, email: "" }); // Reset email error
    setEmailStatus(null); // Reset status
    setIsCheckingEmail(false);

    if (!emailRegex.test(email)) {
      setErrors({ ...errors, email: "Invalid email format." });
      setEmailStatus("invalid");
      return;
    }

    setIsCheckingEmail(true); // Start checking email
    const isEmailRegistered = await validateEmailAvailability(
      selectedValue,
      email
    ); // Validate against API

    console.log(isEmailRegistered);
    if (isEmailRegistered == 1) {
      setIsCheckingEmail(false);
    } else if (isEmailRegistered == 0) {
      setIsCheckingEmail(true);
    }

    // Stop checking email

    if (isEmailRegistered === null) {
      // API Error
      setErrors({ ...errors, email: "Error checking email availability." });
      setEmailStatus("invalid");
    } else if (isEmailRegistered) {
      // Email exists
      setErrors({ ...errors, email: "This email is already registered." });
      setEmailStatus("invalid");
    } else {
      // Email does not exist
      setErrors({ ...errors, email: "" });
      setEmailStatus("valid");
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="w-[40rem]"
        noValidate
        sx={{ paddingX: "20px" }}
      >
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormControl error={!!errors.type} fullWidth sx={{ mb: 2 }}>
              <InputLabel id="dropdown-label">Select Role</InputLabel>
              <Select
                labelId="dropdown-label"
                value={selectedValue}
                onChange={handleRadioChange} // Use the same handler
                name="role-dropdown"
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="faculty">Faculty</MenuItem>
                <MenuItem value="interviewer">Interviewer</MenuItem>
                <MenuItem value="mentor">Mentor</MenuItem>
              </Select>
              {/* Show the error message */}
              {errors.type && (
                <Box sx={{ color: "error.main", fontSize: "0.8rem", mt: 1 }}>
                  {errors.type}
                </Box>
              )}
            </FormControl>
            <Button
              onClick={() => {
                setShowForm(!showForm);
              }}
              variant="contained"
            >
              {!showForm ? "Add New" : "show Users Data"}
            </Button>
          </Grid>
          {!showForm && (
            <Box>
              <UsersDataComponent
                type={selectedValue}
                dataSubmit={dataSubmit}
              />
            </Box>
          )}
          {showForm && (
            <>
              {/* Technology Selector */}
              <Grid item xs={12}>
                <TechnologySelector
                  error={errors.technologies}
                  setErrors={setErrors}
                  options={technologyList}
                  selectedTechnologies={selectedTechnologies}
                  setSelectedTechnologies={setSelectedTechnologies}
                />
              </Grid>

              {/* Name Input */}
              <Grid item xs={12}>
                <TextField
                  sx={{ width: "450px" }}
                  label="Name"
                  variant="outlined"
                  value={formData.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, name: value });

                    // Check if the input value length is less than or equal to 0 (empty)
                    if (value.length === 0) {
                      setErrors({ ...errors, name: "Name is required" });
                    } else {
                      setErrors({ ...errors, name: "" });
                    }
                  }}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>

              {/* Mobile Input */}
              <Grid item xs={12}>
                <TextField
                  sx={{ width: "450px" }}
                  label="Mobile"
                  variant="outlined"
                  value={formData.mobile}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, mobile: value });

                    if (value.length === 0) {
                      setErrors({ ...errors, mobile: "Mobile is required" });
                    } else {
                      setErrors({ ...errors, mobile: "" });
                    }
                  }}
                  error={!!errors.mobile}
                  helperText={errors.mobile}
                />
              </Grid>

              {/* Email Input */}
              {/* <Grid item xs={12}>
                <TextField
                  sx={{ width: "450px" }}
                  label="Email"
                  variant="outlined"
                  value={formData.email}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, email: value });
                    if (value.length === 0) {
                      setErrors({ ...errors, email: "Email is required" });
                    } else {
                      setErrors({ ...errors, email: "" });
                    }
                  }}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid> */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    sx={{ width: "450px" }}
                    label="Email"
                    variant="outlined"
                    value={formData.email}
                    onChange={handleEmailChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                  {/* {isCheckingEmail && (
                    <CircularProgress
                      size={20}
                      sx={{ position: "absolute", right: "-30px" }}
                    />
                  )} */}
                  {emailStatus === "valid" && (
                    <CheckCircleIcon
                      sx={{
                        color: "green",
                        position: "relative",
                        right: "-30px",
                        bottom: "2px",
                      }}
                    />
                  )}
                  {emailStatus === "invalid" && (
                    // <ErrorIcon
                    //   sx={{
                    //     color: "red",
                    //     position: "relative",
                    //     right: "-30px",
                    //     bottom: "2px",
                    //   }}
                    // />
                    <ClearRoundedIcon
                      sx={{
                        color: "red",
                        position: "relative",
                        right: "-30px",
                        bottom: "10px",
                      }}
                    />
                  )}
                </Box>
              </Grid>

              {/* Current Company Input */}
              {selectedValue === "mentor" && (
                <Grid item xs={12}>
                  <TextField
                    sx={{ width: "450px" }}
                    label="Current Company"
                    variant="outlined"
                    value={formData.currentCompany}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData({ ...formData, currentCompany: value });
                      if (value.length === 0) {
                        setErrors({
                          ...errors,
                          currentCompany: "company is required",
                        });
                      } else {
                        setErrors({ ...errors, currentCompany: "" });
                      }
                    }}
                    error={!!errors.currentCompany}
                    helperText={errors.currentCompany}
                  />
                </Grid>
              )}

              {/* Experience Input */}
              {selectedValue === "mentor" && (
                <Grid item xs={12}>
                  <TextField
                    sx={{ width: "450px" }}
                    label="Experience (years)"
                    type="number"
                    variant="outlined"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    error={!!errors.experience}
                    helperText={errors.experience}
                  />
                </Grid>
              )}

              {/* Submit Button */}
              <Grid item xs={12} className="flex justify-start">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="w-40"
                >
                  Submit
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Box>

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={snackbarOpen}
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
    </>
  );
}

const mapState = (state) => ({
  registerInterviewerState: state.registerInterviewerReducer.state,
  registerInterviewerData: state.registerInterviewerReducer.data,
  registerInterviewerError: state.registerInterviewerReducer.error,
});

const mapDispatch = {
  resetRegistrationSlice: resetInterviewerRegistrationSlice,
  registerInterviewer: registerInterviewerDispatch,
};

const InterviewerRegisterForm = connect(
  mapState,
  mapDispatch
)(InterviewerRegisterFormComponent);

export default InterviewerRegisterForm;
