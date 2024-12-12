import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, TextField, Box } from "@mui/material";
import { Typography } from "@mui/material";
import axios from "axios";

const TestResults = () => {
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [testId, setTestId] = useState(null);
  const [testName, setTestName] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const testid = params.get("testId");
    const testname = params.get("testName");
    setTestId(testid);
    setTestName(testname);
  }, []);

  // Columns definition with editable fields
  const columns = [
    { field: "StudentName", headerName: "Student Name", width: 190 },
    {
      field: "technologyname",
      headerName: "Technology Name",
      width: 200,
    },
    {
      field: "modulename",
      headerName: "Module Name",
      width: 150,
    },
    {
      field: "TopicName",
      headerName: "Topic Name",
      width: 150,
    },
    {
      field: "TotalMarks",
      headerName: "Total Marks",
      width: 100,
    },
    {
      field: "ObtainMarks",
      headerName: "Obtain Marks",
      width: 100,
      editable: true,
    },
    {
      field: "Percentage",
      headerName: "Percentage",
      width: 100,
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleUpdate(params.row)} // Pass the entire row here
          sx={{ fontSize: "12px" }}
        >
          Edit
        </Button>
      ),
    },
  ];

  // Fetching data from API
  useEffect(() => {
    setLoading(true);
    if (testId) {
      getResultsData(testId)
    }
  }, [testId]);

  const getResultsData=async(testId)=>{
    axios
    .get(
      `http://49.207.10.13:4017/apinit/GetStudentObtainMarks?testId=${testId}?studentName=null`
    ) // Corrected API endpoint
    .then((res) => {
      // Add a default 'id' to each row (e.g., use the row index as the ID)
      const dataWithIds = res.data.data.map((row, index) => ({
        ...row,
        id: index + 1, // Generate a unique id based on the index
      }));
      setRows(dataWithIds); // Set rows with generated ids
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
  }

  // Handle cell edit commit (Update data in database)
  const handleProcessRowUpdate = async (newRow) => {
    console.log("newRow", newRow);
    // You can use your API to update the row here (if needed)
  };

  // Handle the search query
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter rows based on the search query
  const filteredRows = rows.filter((row) => {
    return (
      row.StudentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email?.toLowerCase().includes(searchQuery.toLowerCase()) // Ensure optional chaining for missing 'email'
    );
  });

  // Handle update button click (pass the full row object)
  const handleUpdate = async (row) => {
    console.log(row);
    // Implement your update logic here
    // Example: make API call to update row data
    const res = await axios.put(
      "http://49.207.10.13:4017/apinit/updateStudentMarks",
      {
        TestId: testId,
        studentName: row.StudentName,
        CorrectAnswers: Number(row.ObtainMarks),
        Technologyname: row.technologyname,
        ModuleName: row.modulename,
        Topicname: row.TopicName,
      }
    );
    alert(res.data.message);
    getResultsData(testId);
    console.log(res);
  };

  return (
    <Box sx={{ height: 500, width: "100%", paddingLeft: "10px" }}>
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        {testName ? testName : ""}{" "}
        <span style={{ fontSize: "17px", fontWeight: "normal" }}>
          Test Results
        </span>
      </Typography>
      <TextField
        label="Search with name and email"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ marginBottom: 2, width: "40%" }}
      />
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={10}
        loading={loading}
        onProcessRowUpdate={handleProcessRowUpdate}
        sortingOrder={["asc", "desc"]}
      />
    </Box>
  );
};

export default TestResults;
