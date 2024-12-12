import React, { useEffect, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TableSortLabel,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { connect } from "react-redux";
import { useSearchParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  deleteAssignedCurriculumAPI,
  fetchAssignedCurriculumListAPI,
} from "../../store/Faculty/api";

const columnHelper = createColumnHelper();

const fetchTableData = async (payload, setter) => {
  const res = await fetchAssignedCurriculumListAPI(payload);
  setter(res.data || []);
};

const BatchTableComponent = ({ userId, handleViewChange, fetchData }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableData, setTableData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showDeletionSuccessMessage, setShowDeletionSuccessMessage] =
    useState(false);

  useEffect(() => {
    fetchTableData({ facultyId: userId }, setTableData);
  }, []);

  function formatTimeToAMPM(timeString) {
    console.log(timeString);
    const timeParts = timeString.split(':'); // Splitting hours, minutes, seconds
    let hours = parseInt(timeParts[0], 10); // Get the hours
    const minutes = timeParts[1]; // Get the minutes
    const period = hours >= 12 ? 'PM' : 'AM'; // Determine AM/PM
    
    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
  
    return `${hours}:${minutes} ${period}`; // Return formatted time
  }
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleDelete = async (data) => {
    try {
      const res = await deleteAssignedCurriculumAPI(data.id);

      if (res.status === 200) {
        fetchTableData({ userId }, setTableData);

        setShowDeletionSuccessMessage(true);
        setTimeout(() => setShowDeletionSuccessMessage(false), 3000);
      } else {
        setSnackbarMessage(
          `Unable to delete the curriculum '${data.curriculumName}' for batch '${data.batchName}'. Please try again later.`
        );
        setSnackbarOpen(true);
      }
    } catch (error) {
      setSnackbarMessage(
        `Unable to delete the curriculum '${data.curriculumName}' for batch '${data.batchName}'. Please try again later.`
      );
      setSnackbarOpen(true);
    }
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("curriculam_Id", {
        header: () => (
          <TableSortLabel
            active={sorting.find((sort) => sort.id === "curriculam_Id")}
            direction={
              sorting.find((sort) => sort.id === "curriculam_Id")?.desc
                ? "desc"
                : "asc"
            }
            onClick={() => handleSortChange("curriculam_Id")}
          >
            ID
          </TableSortLabel>
        ),
        cell: (info) => (
          <button
            className="text-blue-800 underline underline-offset-4 font-semibold"
            onClick={() => {
              console.log("batch table specific value selection:", info.row);
              searchParams.set("e", true);
              searchParams.set("id", info.row.original.curriculam_Id);
              setSearchParams(searchParams);
              handleViewChange("assign");
              fetchData(info.row.original.curriculam_Id);
            }}
          >
            {info.row.index + 1}
          </button>
        ),
      }),
      columnHelper.accessor("courseCurriculam_Name", {
        header: () => (
          <TableSortLabel
            active={sorting.find((sort) => sort.id === "courseCurriculam_Name")}
            direction={
              sorting.find((sort) => sort.id === "courseCurriculam_Name")?.desc
                ? "desc"
                : "asc"
            }
            onClick={() => handleSortChange("courseCurriculam_Name")}
          >
            Curriculum Name
          </TableSortLabel>
        ),
      }),
      columnHelper.accessor("BatchName", {
        header: () => (
          <TableSortLabel
            active={sorting.find((sort) => sort.id === "BatchName")}
            direction={
              sorting.find((sort) => sort.id === "BatchName")?.desc
                ? "desc"
                : "asc"
            }
            onClick={() => handleSortChange("BatchName")}
          >
            Batch Name
          </TableSortLabel>
        ),
      }),
      columnHelper.accessor("TestStartDate", {
        header: () => (
          <TableSortLabel
            active={sorting.find((sort) => sort.id === "TestStartDate")}
            direction={
              sorting.find((sort) => sort.id === "TestStartDate")?.desc
                ? "desc"
                : "asc"
            }
            onClick={() => handleSortChange("TestStartDate")}
          >
            Start Date
          </TableSortLabel>
        ),
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      }),
      columnHelper.accessor("teststarttime", {
        header: () => (
          <TableSortLabel
            active={sorting.find((sort) => sort.id === "teststarttime")}
            direction={
              sorting.find((sort) => sort.id === "teststarttime")?.desc
                ? "desc"
                : "asc"
            }
            onClick={() => handleSortChange("teststarttime")}
          >
            Time slot
          </TableSortLabel>
        ),
        cell: (info) => {
          const startTime=info.row.original.teststarttime;
          const endTime=info.row.original.testEndtime;
          
          return `${formatTimeToAMPM(startTime)}-${formatTimeToAMPM(endTime)}`
        },
      }),
      columnHelper.accessor("status", {
        header: () => (
          <TableSortLabel
            active={sorting.find((sort) => sort.id === "status")}
            direction={
              sorting.find((sort) => sort.id === "status")?.desc
                ? "desc"
                : "asc"
            }
          >
            Status
          </TableSortLabel>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <div>
            <IconButton
              color="error"
              onClick={() => handleDelete(info.row.original)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ),
      }),
    ],
    [sorting]
  );

  // Handle sorting
  const handleSortChange = (id) => {
    setSorting((prevSorting) => {
      const existingSort = prevSorting.find((sort) => sort.id === id);
      if (existingSort) {
        return [{ id, desc: !existingSort.desc }];
      } else {
        return [{ id, desc: false }];
      }
    });
  };

  const table = useReactTable({
    columns,
    data: tableData,
    state: { globalFilter, sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      {showDeletionSuccessMessage && (
        <Alert
          severity="success"
          sx={{
            position: "fixed",
            top: 10,
            right: 10,
            width: "300px",
            zIndex: 999,
          }}
        >
          Record deleted successfully!
        </Alert>
      )}

      {/* Global Filter */}
      <div className="flex justify-end">
        <TextField
          label="Search"
          variant="outlined"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          sx={{ marginBottom: 2, marginTop: 1 }}
        />
      </div>

      <Table component={Paper}>
        <TableHead>
          <TableRow>
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => (
                <TableCell
                  key={header.id}
                  style={{ width: header.column.columnDef.width }}
                  sx={{
                    fontWeight: "bold",
                    backgroundColor: "#1E40AF",
                    color: "#ffffff",
                    border: "1px solid rgba(0, 0, 0, 0.12)",
                    outline: ".2px solid rgba(30, 64, 175, 0.2)",
                  }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableCell>
              ))
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Snackbar Notification for Delete Failure */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: 'top',  // Position at the top
          horizontal: 'right',  // Position on the right
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      
    </div>
  );
};

const mapState = (state) => ({
  userId: JSON.parse(localStorage.getItem("auth")).userId,
});

const BatchTable = connect(mapState, null)(BatchTableComponent);

export default BatchTable;
