import React, { useEffect, useState, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Checkbox, IconButton, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setIncludedStudentsArr } from "../../../store/slice/userManagement.slice";
import { Edit } from "@mui/icons-material";
import { filter } from "lodash";
import axios from "axios";

function StudentTableRender({
  studentsList,
  cellStyle,
  tableHeight,
  tableWidth,
  batchId,
  includedStudentsList,
}) {
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [firstNameFilter, setFirstNameFilter] = useState("");

  const screenHeight = window.innerHeight;

  const { includedStudents } = useSelector(
    (store) => store.userManagementPageReducer
  );

  const onSelect = (flag, data) => {
    const updatedArr = [...includedStudents];

    if (flag) {
      updatedArr.push(data.StudentID);
    } else {
      const index = updatedArr.indexOf(data.StudentID);
      updatedArr.splice(index, 1);
    }

    dispatch(setIncludedStudentsArr(updatedArr));
  };

  const handleEditClick = async (rowData) => {
    const res = await axios.put(
      "http://49.207.10.13:5004/apinit/updateStudentDetails",
      {
        studentId: rowData.StudentID,
        firstname: rowData.FirstName,
        lastName: rowData.LastName,
        email: rowData.Email,
        phoneNumber: rowData.PhoneNumber,
        batchId: rowData.BatchId,
      }
    );
    if (res.data.success) {
      alert(res.data.message);
    }
    console.log("response", res);
  };

  const handleRowEdit = useCallback(
    (newRowData) => {
      const updatedData = rowData.map((row) =>
        row.StudentID === newRowData.StudentID ? { ...row, ...newRowData } : row
      );
      setRowData(updatedData);
      return newRowData;
    },
    [rowData]
  );

  useEffect(() => {
    // Add an `id` property to each row to fix the MUI X DataGrid error
    const updatedStudents = (studentsList || []).map((student) => ({
      ...student,
      id: student.StudentID, // Add `id` based on StudentID (or any other unique field)
    }));
    setRowData(updatedStudents);
  }, [studentsList]);

  useEffect(() => {
    setColumns([
      {
        field: "StudentID",
        headerName: "Student ID",
        width: screenHeight < 700 ? 110 : 220,
        editable: false,
        renderCell: (params) => (
          <div className="flex">
            <Checkbox
              size="small"
              checked={includedStudents.includes(params.row.StudentID)}
              onChange={(e) => onSelect(e.target.checked, params.row)}
            />
            {params.row.StudentID}
          </div>
        ),
      },
      {
        field: "BatchName",
        headerName: "Batch Name",
        width: screenHeight < 700 ? 120 : 250,
        editable: true,
        filter: true,
      },
      {
        field: "FirstName",
        headerName: "First Name",
        width: screenHeight < 700 ? 150 : 270,
        height: 200,
        filterable: false,
        editable: true,
        renderHeader: () => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              //alignItems: "center",
            }}
          >
            <div>First Name</div>
            <TextField
              value={firstNameFilter}
              onChange={(e) => {
                setFirstNameFilter(e.target.value);
              }}
              variant="standard"
              // size="small"
              fullWidth
              // style={{ marginTop: "-5px", height: "20px" }}
              placeholder="Filter by Name"
              InputProps={{
                style: {
                  fontSize: "13px", // Set the font size of the input text
                },
              }}
            />
          </div>
        ),
        columnMenu: null,
        renderCell: (params) => params.row.FirstName,
      },
      {
        field: "LastName",
        headerName: "Last Name",
        width: screenHeight < 700 ? 180 : 260,
        editable: true,
      },
      {
        field: "Email",
        headerName: "Email",
        width: screenHeight < 700 ? 280 : 340,
        editable: true,
      },
      {
        field: "PhoneNumber",
        headerName: "Phone Number",
        width: screenHeight < 700 ? 140 : 280,
        editable: true,
      },
      {
        field: "edit",
        headerName: "Edit",
        width: 100,
        renderCell: (params) => (
          <IconButton
            color="primary"
            onClick={() => handleEditClick(params.row)}
          >
            <Edit /> {/* Edit icon here */}
          </IconButton>
        ),
      },
    ]);
  }, [includedStudents, firstNameFilter]);

  const filteredRows = rowData.filter(
    (row) => row.FirstName.toLowerCase().includes(firstNameFilter.toLowerCase()) // Apply filter logic
  );

  return (
    <div style={{ height: tableHeight, width: tableWidth }}>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSize={5}
        disableRowSelectionOnClick
        rowsPerPageOptions={screenHeight < 700 ? [8] : [13]}
        // checkboxSelection
        processRowUpdate={handleRowEdit} // Handle row edit
        components={{
          NoRowsOverlay: () => <div>No Students Found</div>, // Custom overlay when no rows
        }}
      />
    </div>
  );
}

export default StudentTableRender;

// import { AgGridReact } from "ag-grid-react";
// import React, { useEffect, useMemo, useState } from "react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
// import { Checkbox, Snackbar, Alert, Button } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { setIncludedStudentsArr } from "../../../store/slice/userManagement.slice";
// import axios from "axios";

// function StudentTableRender({
//   studentsList,
//   cellStyle,
//   tableHeight,
//   tableWidth,
//   batchId,
// }) {
//   const dispatch = useDispatch();
//   const [rowData, setRowData] = useState([]);
//   const [columnDefs, setColumnDefs] = useState([]);

//   // Snackbar states
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // 'success' or 'error'

//   const { includedStudents, showWarn } = useSelector(
//     (store) => store.userManagementPageReducer
//   );

//   const onSelect = (flag, data) => {
//     const updatedArr = [...includedStudents];

//     if (flag) {
//       updatedArr.push(data.StudentID);
//     } else {
//       const index = updatedArr.indexOf(data.StudentID);
//       updatedArr.splice(index, 1);
//     }

//     dispatch(setIncludedStudentsArr(updatedArr));
//   };

//   const onGridReady = useMemo(() => {
//     let defaultColumnDefs = [
//       {
//         field: "batchId",
//         headerName: "Student ID",
//         width: 180,
//         filter: true,
//         floatingFilter: true,
//         cellRenderer: (param) => (
//           <div className="flex">
//             <p>
//               <Checkbox
//                 size="small"
//                 checked={includedStudents.includes(param.data.StudentN)}
//                 onClick={(e) => onSelect(e.target.checked, param.data)}
//               />
//             </p>
//             <p className="ms-2">
//               {isNaN(Number(param.data.StudentID)) ? "" : param.data.StudentID}
//             </p>
//           </div>
//         ),
//       },
//       {
//         field: "FirstName",
//         headerName: "First Name",
//         width: 235,
//         filter: true,
//         floatingFilter: true,
//       },
//       {
//         field: "LastName",
//         headerName: "Last Name",
//         width: 200,
//       },
//       {
//         field: "Email",
//         headerName: "Email",
//         width: 280,
//       },
//       {
//         field: "PhoneNumber",
//         headerName: "PhoneNumber",
//         width: 140,
//       },
//     ];

//     defaultColumnDefs = defaultColumnDefs.map((def) => ({
//       ...def,
//       cellStyle: {
//         ...def.cellStyle,
//         ...cellStyle,
//       },
//     }));

//     setColumnDefs(defaultColumnDefs);
//   }, [includedStudents]);

//   useEffect(() => {
//     setRowData(studentsList || []);
//   }, [studentsList]);

//   // Handle snackbar close
//   const handleSnackbarClose = () => {
//     setOpenSnackbar(false);
//   };

//   // Handle Assign Students Button click
//   const handleAssignStudents = async () => {
//     if(batchId === '' || batchId === null){
//       setSnackbarMessage("select a batchId");
//       setSnackbarSeverity("warning");
//       setOpenSnackbar(true);
//       return;
//     }
//     const Students = rowData.map((row) => {
//       const updatedRow = { ...row };
//       if (updatedRow.BatchId !== batchId) {
//         updatedRow.BatchId = batchId;
//       }
//       return updatedRow;
//     });

//     const data = { Students: Students };
//     const res = await axios.post(
//       "http://49.207.10.13:5004/apinit/addStudentsBatch",
//       data
//     );
//     console.log(res.data);

//     if (res.data.success) {
//       setSnackbarMessage(res.data.message);
//       setSnackbarSeverity("success");
//     } else {
//       setSnackbarMessage("Failed to assign students.");
//       setSnackbarSeverity("error");
//     }

//     setOpenSnackbar(true);
//   };
//   return (
//     <>
//       <div
//         style={{ height: tableHeight, width: tableWidth }}
//         className="ag-theme-alpine"
//       >
//         <AgGridReact
//           columnDefs={columnDefs}
//           rowData={rowData}
//           onGridReady={onGridReady}
//           rowSelection="multiple"
//           overlayNoRowsTemplate="No Students Found"
//         />
//       </div>

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleAssignStudents}
//         sx={{
//           padding: "5px 15px",
//           fontSize: "16px",
//           margin: "10px",
//         }}
//       >
//         Assign Students
//       </Button>

//       {/* Snackbar for success/error messages */}
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbarSeverity}
//           sx={{ width: "100%" }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }

// export default StudentTableRender;
