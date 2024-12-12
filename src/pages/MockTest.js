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
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

function MockTest() {
  const [submittedData, setSubmittedDataTable] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Set items per page
  const userData = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    axios
      .get(`http://49.207.10.13:4017/api/nit/fetchMocktestDetails`)
      .then((res) => {
        setSubmittedDataTable(res.data);
      });
  }, []);

  const totalPages = Math.ceil(submittedData.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Calculate the current items to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = submittedData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Box style={{ marginTop: "20px", marginLeft: "15px" }}>
        <Button
          variant="contained"
          style={{
            whiteSpace: "nowrap", // Prevent text wrapping
            minWidth: "auto", // Adjust width to fit text
          }}
        >
          <Link
            to="/createMockAndDescriptive"
            style={{
              color: "white",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Create Test
          </Link>
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ marginTop: 4, overflowX: "auto", width: "100%" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "#1976d2",
                  color: "white",
                  minWidth: "100px",
                  maxWidth: "200px",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  textAlign: "center",
                }}
              >
                Test Name
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#1976d2",
                  color: "white",
                  minWidth: "100px",
                  maxWidth: "200px",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  textAlign: "center",
                }}
              >
                Start Date
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#1976d2",
                  color: "white",
                  minWidth: "100px",
                  maxWidth: "200px",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  textAlign: "center",
                }}
              >
                Start Time
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#1976d2",
                  color: "white",
                  minWidth: "100px",
                  maxWidth: "200px",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  textAlign: "center",
                }}
              >
                End Time
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#1976d2",
                  color: "white",
                  minWidth: "100px",
                  maxWidth: "200px",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  textAlign: "center",
                }}
              >
                Modules
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#1976d2",
                  color: "white",
                  minWidth: "100px",
                  maxWidth: "200px",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  textAlign: "center",
                }}
              >
                Topics
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#1976d2",
                  color: "white",
                  minWidth: "100px",
                  maxWidth: "200px",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                  textAlign: "center",
                }}
              >
                Test Type
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(currentData) && currentData.length > 0 ? (
              currentData.map((data, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{data.TestName}</TableCell>
                    <TableCell>
                      {dayjs(data.TestStartDate).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell>{data.TestStartTime.substring(0, 5)}</TableCell>
                    <TableCell>{data.TestEndTime.substring(0, 5)}</TableCell>
                    <TableCell>{data.ModuleName}</TableCell>
                    <TableCell>{data.TopicNames}</TableCell>
                    <TableCell>{data.TestType}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No Tests Created yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <Box display="flex" justifyContent="flex-start" mt={2} ml={2}>
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          variant="contained"
          sx={{ mr: 1 }}
        >
          Previous
        </Button>
        <Box display="flex" alignItems="center" ml={2}>
          Page {currentPage} of {totalPages}
        </Box>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          variant="contained"
          sx={{ ml: 1 }}
        >
          Next
        </Button>
      </Box>
    </>
  );
}

export default MockTest;
