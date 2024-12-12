import React, { useState, useEffect } from "react";
// import ModuleSelection3 from "./ModuleSelection3";
// import TopicSelection3 from "./TopicSelection3";
import ModuleSelection3 from "./ModuleSelection3";
import TopicSelection3 from "./TopicSelection3";
// import SubmitButton from "../components/MentorForm/SubmitButton";

import axios from "axios";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import dayjs from "dayjs"; // Make sure to import dayjs

import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { constant } from "lodash";

function CreateMockAndDescriptive() {
  const userData = JSON.parse(localStorage.getItem("auth"));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [batches, setBatches] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [marks, setMarks] = useState({});

  const [startDate, setStartDate] = useState(dayjs());
  const [manualMarks, setManualMarks] = useState([]);
  const [studentSelectionType, setStudentSelectionType] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [validatedExcel, setValidatedExcel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [upload, setUpload] = useState([]);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0"); // Ensure 2 digits
    const minutes = String(now.getMinutes()).padStart(2, "0"); // Ensure 2 digits
    return `${hours}:${minutes}`;
  };

  const [startTime, setStartTime] = useState(getCurrentTime());

  const [endTime, setEndTime] = useState(null);
  const [testName, setTestName] = useState("");

  const [selectedValue, setSelectedValue] = useState("");

  const rowsPerPage = 10;

  const [submittedData, setSubmittedData] = useState([]);

  const [disabledModule, setDisabledModule] = useState(false);

  const [formVisible, setFormVisible] = useState(true); // State to control form visibility

  const handleDateChange = (newDate) => {
    setStartDate(newDate);

    // Check if the selected date is in the future
    const today = dayjs();
    if (dayjs(newDate).isAfter(today, "day")) {
      // Reset time to default (e.g., 00:00)
      setStartTime("00:00");
    }
  };

  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setTestName(event.target.value);
  };

  useEffect(() => {
    const fetchBatchesAndModules = async () => {
      try {
        // const batchResponse = await axios.get(
        //   "http://49.207.10.13:4017/apinit/fetchbatchesByTechnologyId?TechnologyId=2"
        // );
        // setBatches(batchResponse.data);

        const moduleResponse = await axios.get(
          `http://49.207.10.13:6011/api/facultycurriculam/getmodulesbyfacultyid/${userData.userId}`
        );
        setModules(moduleResponse.data.data);
        console.log("moduleResponse");
        console.log(moduleResponse);
      } catch (error) {
        console.error("Error fetching batches or modules:", error);
      }
    };

    fetchBatchesAndModules();
  }, []);

  const handleModuleChange = async (moduleId) => {
    if (selectedModule && selectedModule !== moduleId) {
      setSnackbarMessage("Module has already been selected.");
      setSnackbarSeverity("error");
      setDisabledModule(true);
      setSnackbarOpen(true);

      // Exit without changing the selection
      return;
    }

    setSelectedModule(moduleId);

    console.log("moduleId");
    console.log(moduleId);
    try {
      const topicsResponse = await axios.get(
        `http://49.207.10.13:4017/apinit/fetchTopicsByModuleId?ModuleId=${moduleId}`
      );
      setTopics(topicsResponse.data);
      console.log("topicsResponse");
      console.log(topicsResponse);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  const handleTopicChange = (selectedTopic) => {
    // const isAlreadySelected = selectedTopics.find(
    //   (topic) => topic.TopicID === selectedTopic.TopicID
    // );

    // if (isAlreadySelected) {
    //   setSelectedTopics(
    //     selectedTopics.filter(
    //       (topic) => topic.TopicID !== selectedTopic.TopicID
    //     )
    //   );
    // } else {
    //   setSelectedTopics([...selectedTopics, selectedTopic.TopicID]);
    // }
    setSelectedTopics((prevSelectedTopics) => {
      if (prevSelectedTopics.includes(selectedTopic)) {
        // If already selected, remove it
        return prevSelectedTopics.filter((id) => id !== selectedTopic);
      } else {
        // Otherwise, add it
        return [...prevSelectedTopics, selectedTopic];
      }
    });
    console.log("selected topics", selectedTopics);
  };

  const handleBatchChange = (batchId) => {
    setSelectedBatchId(batchId);
  };

  const fetchStudentsByBatch = async (batchId) => {
    try {
      const studentsResponse = await axios.get(
        `http://49.207.10.13:4017/api/fetchstudentsByBatchId?batchId=${batchId}`
      );
      setStudents(studentsResponse.data);
      setSelectedStudents(studentsResponse.data);

      const preFilledManualMarks = studentsResponse.data.map((student) => ({
        rollNo: student.StudentID,
        name: student.FirstName,
        marks: {},
      }));
      setManualMarks(preFilledManualMarks);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const postData = async (data) => {
    try {
      const response = await axios.post(
        "http://49.207.10.13:4017/apinit/insertUpdateMocktest",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Data posted successfully:", response.data);
      setSnackbarMessage(`${selectedValue}  is created Successfully.`);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setSubmittedData((prevData) => [...prevData, data]); // Add only after success
    } catch (error) {
      console.error("Error posting data:", error);
      setSnackbarMessage("Failed to post data.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const dataToPost = {
    TestName: testName,
    TestStartDate: startDate
      ? startDate
      : new Date().toISOString().split("T")[0],
    TestStartTime: startTime,
    TestEndTime: endTime,
    ModuleId: selectedModule,
    TopicId: selectedTopics.join(","), // Convert array to comma-separated string
    type: selectedValue,
    userId: userData.userId,
  };

  const submitData = async () => {
    if (!testName || !startDate || !startTime || !endTime || !selectedModule) {
      setSnackbarMessage("Please fill all required fields.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    try {
      await postData(dataToPost); // Assuming postData is an async function
      setSnackbarMessage("Data submitted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Redirect after showing the success message
      setTimeout(() => {
        navigate("/mock-test-creation");
      }, 3000); // Add a delay to allow the Snackbar to display
    } catch (error) {
      setSnackbarMessage("Error submitting data. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      navigate("/createMockAndDescriptive");
    }

    postData(dataToPost);
    // setFormVisible(false); // Hide form and show table
  };

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);

    console.log("Selected Value:", value); // Log the selected value on click
  };

  // const renderTable = () => {
  //   return (
  //     <TableContainer component={Paper} sx={{ marginTop: 4 }}>
  //       <Table>
  //         <TableHead>
  //           <TableRow>
  //             <TableCell>Test Name</TableCell>
  //             <TableCell>Start Date</TableCell>
  //             <TableCell>Start Time</TableCell>
  //             <TableCell>End Time</TableCell>
  //             <TableCell>Test Type</TableCell>

  //             {/* <TableCell>Module ID</TableCell>
  //             <TableCell>Topics</TableCell> */}
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           {submittedData.map((data, index) => (
  //             <TableRow key={index}>
  //               <TableCell>{data.TestName}</TableCell>
  //               <TableCell>
  //                 {dayjs(data.TestStartDate).format("YYYY-MM-DD")}
  //               </TableCell>
  //               <TableCell>
  //                 {dayjs(data.TestStartTime).format("HH:mm")}
  //                 {/* {dayjs(data.TestStartTime).isValid()
  //                   ? dayjs(data.TestStartTime).format("HH:mm:ss")
  //                   : "Invalid Time"} */}
  //               </TableCell>
  //               <TableCell>
  //                 {dayjs(data.TestEndTime).format("HH:mm")}
  //                 {/* {dayjs(data.TestEndTime).isValid()
  //                   ? dayjs(data.TestEndTime).format("HH:mm:ss")
  //                   : "Invalid Time"} */}
  //               </TableCell>
  //               {/* <TableCell>{data.ModuleId}</TableCell>
  //               <TableCell>{data.TopicId}</TableCell> */}
  //               <TableCell>{data.type}</TableCell>
  //             </TableRow>
  //           ))}
  //         </TableBody>
  //       </Table>
  //     </TableContainer>
  //   );
  // };

  return (
    <Box sx={{ display: "flex" }} className="form-container">
      <Box sx={{ flexGrow: 1 }}>
        <Container
          maxWidth="md"
          sx={{ p: 4 }}
          style={{ background: "#fafafa" }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Mock/Descriptive Test
          </Typography>
          <Grid container spacing={4}>
            {/* Form Inputs */}
            {/* Test Name, Start Date, Start Time, End Time, Module, Topics */}

            <Grid item xs={12}>
              <CardContent>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Select <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={selectedValue}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="mockTest"
                      control={<Radio />}
                      label="Mock Test"
                    />
                    <FormControlLabel
                      value="descriptiveTest"
                      control={<Radio />}
                      label="Descriptive Test"
                    />
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Grid>

            <Grid item xs={6}>
              <CardContent>
                <TextField
                  label={
                    <span>
                      Test Name <span style={{ color: "red" }}>*</span>
                    </span>
                  }
                  variant="outlined"
                  value={testName}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                />
              </CardContent>
            </Grid>
            <Grid item xs={6}>
              <CardContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <DatePicker
                    style={{ width: "100%" }}
                    label={
                      <span>
                        Start Date <span style={{ color: "red" }}>*</span>
                      </span>
                    }
                    value={startDate}
                    onChange={(newValue) => {
                      console.log("new time", newValue);
                      setStartDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    minDate={dayjs()}
                  /> */}
                  <DatePicker
                    style={{ width: "100%" }}
                    label={
                      <span>
                        Start Date <span style={{ color: "red" }}>*</span>
                      </span>
                    }
                    value={startDate}
                    onChange={(newDate) => {
                      console.log("New Date Selected:", newDate);
                      handleDateChange(newDate);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    minDate={dayjs()} // Prevent selection of past dates
                  />
                </LocalizationProvider>
              </CardContent>
            </Grid>
            <Grid item xs={6}>
              <CardContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  {/* <TimePicker
                    label={
                      <span>
                        Start Time <span style={{ color: "red" }}>*</span>
                      </span>
                    }
                    value={startTime}
                    onChange={(newValue) => {
                      console.log("new time", newValue);
                      setStartTime(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  /> */}

                  {/* <TimePicker
                    label={
                      <span>
                        Start Time <span style={{ color: "red" }}>*</span>
                      </span>
                    }
                    value={startTime}
                    onChange={(newValue) => {
                      console.log("New Time Selected:", newValue);
                      setStartTime(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                */}

                  <div class="time-input-container">
                    <label for="start-time">
                      Start Time <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      value={startTime}
                      type="time"
                      id="start-time"
                      name="start-time"
                      required
                      onChange={(newValue) => {
                        console.log(
                          "New Time Selected:",
                          newValue.target.value
                        );
                        setStartTime(newValue.target.value);
                      }}
                    />
                  </div>

                  {/* <TimePicker
                      label="Start Time"
                      value={startTime ? dayjs(startTime) : null} // Ensure startTime is a valid dayjs object
                      onChange={(newValue) => {
                        // Only format the value when sending it to the backend
                        setStartTime(
                          newValue ? newValue.format("HH:mm:ss") : null
                        );
                      }}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                      views={["hours", "minutes"]} // Only show hours and minutes
                      ampm={false} // 24-hour format (optional)
                    /> */}
                </LocalizationProvider>
              </CardContent>
            </Grid>
            <Grid item xs={6}>
              <CardContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div class="time-input-container">
                    <label for="start-time">
                      End Time <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      value={endTime}
                      type="time"
                      id="end-time"
                      name="end-time"
                      required
                      onChange={(newValue) => {
                        console.log(
                          "New Time Selected:",
                          newValue.target.value
                        );
                        setEndTime(newValue.target.value);
                      }}
                    />
                  </div>
                  {/* {
                    <TimePicker
                      label={
                        <span>
                          End Time <span style={{ color: "red" }}>*</span>
                        </span>
                      }
                      value={endTime}
                      onChange={(newValue) => setEndTime(newValue)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  } */}
                  {/* <TimePicker
                      label="End Time"
                      value={endTime ? dayjs(endTime) : null} // Ensure startTime is a valid dayjs object
                      onChange={(newValue) => {
                        // Only format the value when sending it to the backend
                        setEndTime(
                          newValue ? newValue.format("HH:mm:ss") : null
                        );
                      }}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                      views={["hours", "minutes"]} // Only show hours and minutes
                      ampm={false} // 24-hour format (optional)
                    /> */}
                </LocalizationProvider>
              </CardContent>
            </Grid>

            <Grid item xs={12}>
              <ModuleSelection3
                modules={modules}
                onModuleChange={handleModuleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TopicSelection3
                topics={topics}
                selectedTopics={selectedTopics}
                onTopicChange={handleTopicChange}
              />
            </Grid>

            <Grid item xs={12}>
              <button
                onClick={submitData}
                style={{
                  backgroundColor: "#1976D2",
                  color: "#fff",
                  padding: " 10px",
                  boxShadow: "rgba(0,0,0,0.5) 0px 0px 10px",
                  borderColor: "#1976D2",
                }}
              >
                Submit
              </button>
              <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <Alert
                  onClose={() => setSnackbarOpen(false)}
                  severity={snackbarSeverity}
                  sx={{ width: "100%" }}
                >
                  {snackbarMessage}
                </Alert>
              </Snackbar>
            </Grid>
          </Grid>

          {/* <Grid item xs={12}>
            {submittedData.length > 0 ? (
              renderTable()
            ) : (
              <Typography>No data submitted yet.</Typography>
            )}
          </Grid> */}
        </Container>
      </Box>
    </Box>
  );
}

export default CreateMockAndDescriptive;
