import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Tooltip,
  IconButton,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import RecordTooltip from "./RecordTooltip";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { connect } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteAssignedBatchByBatchAssignmentAPI as deleteBatchAssignement } from "../store/Faculty/api";

const columns = (modalHandler, handleDelete) => [
  {
    header: "Name",
    accessorKey: "Name",
  },
  {
    header: "TechnologyName",
    accessorKey: "TechnologyName",
  },
  {
    header: "BatchName",
    accessorKey: "BatchName",
  },
  {
    header: "Role",
    accessorKey: "Role",
    // cell(info) {
    //   const value = info.getValue();
    //   return value === "approved" ? (
    //     <p>{value}</p>
    //   ) : (
    //     <Tooltip
    //       title={<RecordTooltip record={info.row.original} />}
    //       arrow
    //       placement="top"
    //     >
    //       <button onClick={() => modalHandler(info.row.original)}>
    //         {value}
    //       </button>
    //     </Tooltip>
    //   );
    // },
  },
  //   {
  //     header: "Start Date",
  //     accessorKey: "startDate",
  //     cell(info) {
  //       const date = info.getValue();
  //       return (
  //         <p className="space-x-2">
  //           <span>{date && date.split("T")[0]}</span>
  //           <span>{info.row.original.time}</span>
  //         </p>
  //       );
  //     },
  //     width: 160,
  //   },
  {
    header: "Actions",
    cell(info) {
      return (
        <div>
          <IconButton
            color="error"
            onClick={() => handleDelete(info.row.original)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      );
    },
  },
];

function BatchTableComponent({
  userId,
  tableData = [],
  fetchAssignedBatches,
  setTableData,
}) {
  const [filteredTableData, setFilteredTableData] = useState(tableData);
  const [filterType, setFilterType] = useState("all");
  const [globalFilter, setGlobalFilter] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Dialog state
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  useEffect(() => {
    let filteredData = tableData;

    // Filter by 'all' or 'created by me'
    if (filterType === "byme") {
      filteredData = tableData.filter((item) => item.createdBy === userId);
    } else if (filterType === "rejected") {
      filteredData = tableData.filter((item) => item.status === "rejected");
    } else if (filterType === "approved") {
      filteredData = tableData.filter((item) => item.status === "approved");
    } else if (filterType === "pending") {
      filteredData = tableData.filter((item) => item.status === "pending");
    }

    // Apply global filter (search)
    if (globalFilter) {
      filteredData = filteredData.filter((item) =>
        Object.values(item).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(globalFilter.toLowerCase())
        )
      );
    }

    setFilteredTableData(filteredData);
  }, [tableData, filterType, globalFilter, userId]);

  const modalHandler = (record) => {
    setShowModal(record);
  };

  const handleDelete = (record) => {
    setRecordToDelete(record);
    setConfirmDialogOpen(true); // Open the confirmation dialog
  };

  const confirmDelete = async () => {
    try {
      const res = await deleteBatchAssignement({
        recordToDelete: recordToDelete.id,
        userId,
      });
      if (res.status === 200) {
        setSnackbarMessage("Record deleted successfully.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }
      fetchAssignedBatches(setTableData);
    } catch (error) {
      setSnackbarMessage(
        error?.response?.data?.message || "Failed to delete the record."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setConfirmDialogOpen(false);
      setRecordToDelete(null); // Clear the record
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Create a React Table instance with the filtered data
  const table = useReactTable({
    columns: columns(modalHandler, handleDelete),
    data: filteredTableData,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="flex justify-end mb-4 gap-x-4">
        {/* Global filter input */}
        {/* <TextField
          label="Search"
          variant="outlined"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          sx={{ minWidth: 300 }}
        /> */}

        {/* Dropdown to select filter option */}
        {/* <FormControl sx={{ minWidth: 144 }}>
          <InputLabel id="filter-select-label">Filter</InputLabel>
          <Select
            labelId="filter-select-label"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            label="Filter"
          >
            <MenuItem value="all">Show All</MenuItem>
            <MenuItem value="byme">Created by Me</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl> */}
      </div>

      {/* Table component */}
      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table
          component={Paper}
          sx={{
            overflowX: "auto",
            maxHeight: 500,
            minWidth: 900,
          }}
        >
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    style={{ width: header.column.columnDef.width }}
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "rgba(30, 64, 175, 0.8)",
                      color: "#ffffff",
                      border: "1px solid rgba(0, 0, 0, 0.12)",
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody sx={{ maxHeight: 400 }}>
            {table.getRowModel().rows.length>0 ? (table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))):
              <TableRow sx={{width:`${table.getHeaderGroups().length}`,textAlign:'center'}}>
                No Data Found
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{ top: 0 }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmDialogOpen(false)}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapState = (state) => ({
  userId: JSON.parse(localStorage.getItem("auth")).userId,
});

const BatchTable = connect(mapState)(BatchTableComponent);

export default BatchTable;
