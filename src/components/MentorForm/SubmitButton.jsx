import axios from "axios";
import { useNavigate } from "react-router";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import React, { useState } from "react";

const SubmitButton = ({
  selectedModule,
  selectedTopics,
  marks,
  maxMarks,
  uploadOption,
  validatedExcel,
  manualMarks,
  BatchId,
  assessmentDate,
  TestName,
  TestId,
  typeOfAssessment,
}) => {
  const userId = JSON.parse(localStorage.getItem("auth")).userId;
  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const validateFormData = () => {
    if (!BatchId) return "Batch ID is required.";
    //if (!assessmentDate) return "Assessment date is required.";
    if (!selectedModule) return "Please select a module.";
    if (!selectedTopics || selectedTopics.length === 0)
      return "Select at least one topic.";
    if (!TestName) return "Test name is required.";
    if (!TestId) return "Test ID is required.";
    if (!typeOfAssessment) return "Type of assessment is required.";

    // if (uploadOption === "upload" && !validatedExcel) {
    //   return "Please upload a valid Excel file.";
    // }

    if (uploadOption === "enter" && manualMarks.length === 0) {
      return "Please enter marks manually for students.";
    }

    // for (const student of manualMarks) {
    //   if (!student.rollNo) return "Each student must have a Roll Number.";
    //   for (const topic of selectedTopics) {
    //     if (!maxMarks[topic.id])
    //       return `Maximum marks for topic ${topic.id} is required.`;
    //     if (typeof student.marks[topic.id] !== "number") {
    //       return `Obtained marks for topic ${topic.id} must be a number.`;
    //     }
    //   }
    // }

    return null; // No validation errors
  };

  console.log(userId);

  const handleSubmit = async () => {
    const validationError = validateFormData();
    if (validationError) {
      setSnackbarMessage(validationError);
      setSnackbarOpen(true);
      return;
    }

    const formData = {
      AdminId: 9, // Static admin ID
      ManualReferenceId: "REF16fhthyhy6", // Static reference ID
      MentorId: userId, // Static mentor ID
      BatchId: BatchId, // Assuming this is the batch ID from batch selection
      DateOfAssessment: assessmentDate
        ? assessmentDate
        : new Date().toISOString().split("T")[0], // Replace this with actual date picker value if available
      TypeOfAssessment: typeOfAssessment, // Replace with actual assessment type (dynamic)
      ModuleId: selectedModule,
      TestName: TestName,
      TestId: TestId,
      students: [],
    };

    // Check if the user uploaded an Excel file or entered marks manually
    if (uploadOption === "upload") {
      manualMarks.forEach((student) => {
        console.log(student.marks);
        const studentData = {
          StudentId: student.rollNo,
          topics: selectedTopics.map((topic) => ({
            TopicId: topic.id,
            MaximumMarks: maxMarks[topic.id] || 100,
            ObtainMarks: student.marks[topic.id] || 0, // Fetch from Excel
          })),
        };
        formData.students.push(studentData);
      });
    } else if (uploadOption === "enter") {
      // Handle manual entry of marks
      manualMarks.forEach((student) => {
        const studentData = {
          StudentId: student.rollNo,
          topics: selectedTopics.map((topic) => ({
            TopicId: topic.id, // Ensure TopicID is available here
            MaximumMarks: maxMarks[topic.id], // Replace with actual max marks if available
            ObtainMarks: student.marks[topic.id] || 0, // Fetch obtained marks for manual entry
          })),
        };
        formData.students.push(studentData);
      });
    }

    // Perform the API call to submit data
    try {
      console.log("Form data being submitted:", formData); // Debugging
      const response = await axios.post(
        "http://49.207.10.13:4017/api/submitAssessmentDetails",
        formData
      );
      console.log("Form submitted successfully", response.data);

      const res = await axios.put(
        "http://49.207.10.13:4017/apinit/updateMock_TestStatus",
        {
          testId: TestId,
        }
      );
      setSnackbarMessage("Form submitted successfully!");
      setSnackbarOpen(true);
      navigate("/available-tests");

      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Form submission failed", error);
      setSnackbarMessage("Form submission failed. Please try again.");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };
  return (
    <>
      <button
        className="text-white p-2 rounded
        "
        style={{ background: "#37AFE1" }}
        onClick={handleSubmit}
      >
        Submit
      </button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SubmitButton;
