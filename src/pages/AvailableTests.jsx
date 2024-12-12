import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

function AvailableMockTest() {
  const [submittedData, setSubmittedDataTable] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
  const userData = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    axios
      .get(`http://49.207.10.13:4017/api/nit/fetchMocktestDetails`)
      .then((res) => {
        setSubmittedDataTable(res.data);
        filterData(res.data); // Filter data initially
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const isButtonEnabled = (startDate, startTime, endTime) => {
    const startHour = startTime.split(":")[0];
    const startMin = startTime.split(":")[1];
    const endHour = endTime.split(":")[0];
    const endMin = endTime.split(":")[1];

    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();

    const startTotalMinutes = Number(startHour) * 60 + Number(startMin);
    const endTotalMinutes = Number(endHour) * 60 + Number(endMin);
    const currentTotalMinutes = hours * 60 + minutes;

    const todaydate = getCurrentDate();
    const isdate = todaydate >= startDate.split("T")[0];

    return (
      currentTotalMinutes >= startTotalMinutes &&
      currentTotalMinutes <= endTotalMinutes &&
      isdate
    );
  };

  const filterData = (data) => {
    const filtered = data.filter((item) => {
      return (
        (item.TestType === "Descriptive-Test" &&
          (userData.type === "mentor" || userData.type === "superadmin")) ||
        (item.TestType === "Mock-Test" &&
          (userData.type === "interviewer" || userData.type === "superadmin"))
      );
    });
    setFilteredData(filtered);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} sx={{ margin: 1 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "140px" }}>Test Name</TableCell>
            <TableCell sx={{ width: "130px" }}>Start Date</TableCell>
            <TableCell sx={{ width: "120px" }}>Start Time</TableCell>
            <TableCell sx={{ width: "100px" }}>End Time</TableCell>
            <TableCell sx={{ width: "150px" }}>Modules</TableCell>
            <TableCell>Topics</TableCell>
            <TableCell sx={{ width: "120px" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(filteredData) && filteredData.length > 0 ? (
            filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Slice data for pagination
              .map((data, index) => {
                const isEnabled = isButtonEnabled(
                  data.TestStartDate,
                  data.TestStartTime,
                  data.TestEndTime
                );

                return (
                  <TableRow key={index}>
                    <TableCell>{data.TestName}</TableCell>
                    <TableCell>
                      {dayjs(data.TestStartDate).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell>{data.TestStartTime.split(".")[0]}</TableCell>
                    <TableCell>{data.TestEndTime.split(".")[0]}</TableCell>
                    <TableCell>{data.ModuleName}</TableCell>
                    <TableCell>{data.TopicNames}</TableCell>
                    <TableCell>
                      {data.IsResultSubmitted === null ||
                      data.IsResultSubmitted === false ? (
                        <Button
                          variant="contained"
                          disabled={!isEnabled}
                          sx={{ fontSize: "15px" }}
                        >
                          <Link
                            to={`/mentor-form/?testName=${data.TestName}&testId=${data.testid}`}
                            style={{ color: "white", textDecoration: "none" }}
                          >
                            Evaluate Test
                          </Link>
                        </Button>
                      ) : (
                        <Button variant="contained" color="secondary">
                          <Link
                            to={`/testResults/?testName=${data.TestName}&testId=${data.testid}`}
                            style={{ color: "white", textDecoration: "none" }}
                          >
                            View Results
                          </Link>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
          ) : (
            <TableRow>
              <TableCell>No Tests Found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

export default AvailableMockTest;
