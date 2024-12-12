// import React, { useEffect, useState } from "react";
// import "../usertablestyles.css"; // Import the CSS
// import axios from "axios";

// const CustomDataTable = ({ type, dataSubmit }) => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     if (type) {
//       fetchUsersData(type);
//     }
//   }, [type, dataSubmit]);

//   async function fetchUsersData(params) {
//     const res = await axios.get(
//       `http://49.207.10.13:4017/api/retriveRegisteredUser?type=${type}`
//     );
//     console.log(res.data);
//     if (res.data !== null) {
//       setData(res.data);
//     } else {
//       setData([]);
//     }
//   }
//   // Example custom data and columns
//   // const initialRows = [
//   //   { id: 1, name: "John Doe", age: 29, department: "Engineering" },
//   //   { id: 2, name: "Jane Smith", age: 34, department: "Marketing" },
//   //   { id: 3, name: "Michael Johnson", age: 42, department: "Finance" },
//   //   { id: 4, name: "Sarah Lee", age: 25, department: "Engineering" },
//   //   { id: 5, name: "David Wong", age: 39, department: "Marketing" },
//   //   { id: 6, name: "Chris Adams", age: 31, department: "Finance" },
//   //   { id: 7, name: "Linda McDonald", age: 28, department: "Engineering" },
//   //   { id: 8, name: "Mike Brown", age: 45, department: "Marketing" },
//   //   { id: 9, name: "Sophia Kim", age: 38, department: "Finance" },
//   //   { id: 10, name: "James White", age: 40, department: "Engineering" },
//   // ];

//   const columns = [
//     { field: "Name", headerName: "Name" },
//     { field: "TechnologyName", headerName: "TechnologyName" },
//     { field: "Email", headerName: "Email" },
//     { field: "phonenumber", headerName: "PhoneNumber" },
//     { field: "CurrentCompany", headerName: "Current Company" },
//     { field: "experience", headerName: "Experience" },
//   ];

//   // State to manage rows, filtering, pagination, and column visibility
//   // const [rows, setRows] = useState(initialRows);
//   // const [filter, setFilter] = useState({ column: "name", value: "" });
//   // const [page, setPage] = useState(0);
//   // const [pageSize] = useState(5);
//   const [visibleColumns, setVisibleColumns] = useState(
//     columns.map((col) => col.field)
//   );

//   // Handle column visibility toggle
//   //   const toggleColumnVisibility = (columnField) => {
//   //     setVisibleColumns((prevState) =>
//   //       prevState.includes(columnField)
//   //         ? prevState.filter((col) => col !== columnField)
//   //         : [...prevState, columnField]
//   //     );
//   //   };

//   return (
//     <div className="container">
//       {/* Table */}
//       <table>
//         <thead>
//           <tr>
//             {columns.map((col, index) => (
//               <th key={index}>{col.headerName}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.length > 0 ? (
//             data.map((row, index) => (
//               <tr key={index}>
//                 {columns.map((col, index) => (
//                   <td key={index}>{row[col.field]}</td>
//                 ))}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={visibleColumns.length}>No results found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CustomDataTable;

import React, { useEffect, useState } from "react";
import "../usertablestyles.css"; // Import the CSS
import axios from "axios";
import {
  FirstPage,
  NavigateBefore,
  NavigateNext,
  LastPage,
} from "@mui/icons-material"; // Import MUI icons

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";

// Modal styles
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CustomDataTable = ({ type, dataSubmit }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Track current page
  const rowsPerPage = 10; // Set rows per page

  const [open, setOpen] = useState(false); // Modal open state
  const [editData, setEditData] = useState(null); // Data for the selected row

  const [dataUpdated, setDataUpdated] = useState(false);
  const [technologyList, setTechnologyList] = useState([]);

  const handleOpen = (row) => {
    setEditData(row); // Set the selected row data
    setOpen(true); // Open the modal
    console.log("data you want to edit:", row);
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
    setEditData(null); // Clear the selected data
  };

  const handleSave = async () => {
    console.log(editData);

    const userId = editData.AdminId
      ? editData.AdminId
      : editData.Facaulty_Id
      ? editData.Facaulty_Id
      : editData.MemberID
      ? editData.MemberID
      : editData.MENTOR_Id
      ? editData.MENTOR_Id
      : ""; // Default to empty string if none of the conditions are met

    const dataToUpdate = {
      ...editData,
      userId: userId,
      type: type,
      action: "edit",
      mode: null,
    };

    try {
      const response = await axios.put(
        "http://49.207.10.13:4017/apinit/upadteAndDeleteUserRegistration",
        dataToUpdate
      );
      console.log("Data being sent:", dataToUpdate);

      if (response.data.success) {
        console.log("Data updated successfully:", response.data);
        alert("User updated successfully!");

        // Set dataUpdated to true to trigger re-fetch
        setDataUpdated(true);

        handleClose(); // Close the modal
      } else {
        console.error("Failed to update the user:", response.data.message);
        alert("Error: Unable to update the user.");
      }
    } catch (error) {
      console.error("Error while updating user:", error);
      alert("An error occurred while trying to update the user.");
    }
  };

  // Fetch data when `type` or `dataUpdated` changes
  useEffect(() => {
    if (type) {
      fetchUsersData(type);
    }

    // Reset the `dataUpdated` flag after fetching
    if (dataUpdated) {
      setDataUpdated(false);
    }
  }, [type, dataUpdated]);

  async function fetchUsersData(params) {
    try {
      const res = await axios.get(
        `http://49.207.10.13:4017/api/retriveRegisteredUser?type=${params}`
      );
      console.log(res.data);

      setData(res.data || []); // Update the table data
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Failed to fetch user data.");
    }
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value })); // Update the form state
  };

  useEffect(() => {
    if (type) {
      fetchUsersData(type);
    }
  }, [type, dataSubmit]);

  async function fetchUsersData(params) {
    const res = await axios.get(
      `http://49.207.10.13:4017/api/retriveRegisteredUser?type=${type}`
    );
    console.log(res.data);
    if (res.data !== null) {
      setData(res.data);
    } else {
      setData([]);
    }
  }

  const handleDelete = async (editData) => {
    console.log("editData:", editData);
    const userId = editData.AdminId
      ? editData.AdminId
      : editData?.Facaulty_Id
      ? editData.Facaulty_Id
      : editData?.MemberID
      ? editData.MemberID
      : editData?.MENTOR_Id
      ? editData.MENTOR_Id
      : ""; // Default to empty string if none of the conditions are met

    // Ensure userId is not empty
    // if (!userId) {
    //   console.error("No valid userId found in editData");
    //   alert("Error: No valid user ID to delete.");
    //   return;
    // }

    const deleteData = {
      ...editData,
      userId: userId,
      type: type,
      action: "delete",
      mode: null,
    };
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        // API call to delete the record
        const res = await axios.put(
          `http://49.207.10.13:4017/apinit/upadteAndDeleteUserRegistration`,
          deleteData
        );

        if (res.data.success) {
          // Remove the deleted row from the state
          setData((prevData) =>
            prevData.filter((item) => item.userId !== userId)
          );
          console.log("Deleted successfully!");
          fetchUsersData();
        } else {
          console.error("Failed to delete the record.");
          alert("Error: Unable to delete the record.");
        }
      } catch (error) {
        console.error("Error while deleting:", error);
        alert("An error occurred while trying to delete the record.");
      }
    }
  };

  useEffect(() => {
    if (type) {
      fetchUsersData(type);
    }
  }, [type, dataSubmit]);

  async function fetchUsersData(params) {
    const res = await axios.get(
      `http://49.207.10.13:4017/api/retriveRegisteredUser?type=${type}`
    );
    console.log(res.data);
    if (res.data !== null) {
      setData(res.data);
    } else {
      setData([]);
    }
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const columns = [
    { field: "Name", headerName: "Name" },
    { field: "TechnologyName", headerName: "TechnologyName" },
    { field: "Email", headerName: "Email" },
    { field: "phonenumber", headerName: "PhoneNumber" },
    { field: "CurrentCompany", headerName: "Current Company" },
    { field: "experience", headerName: "Experience" },
    { field: "action", headerName: "Action" },
  ];

  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((col) => col.field)
  );

  const currentRows = data.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <div className="container">
      {/* Table */}
      <table>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.headerName}</th>
            ))}
          </tr>
        </thead>
        {/* <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((row, index) => (
              <tr key={index}>
                {columns.map((col, index) => (
                  <td key={index}>{row[col.field]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length}>No results found</td>
            </tr>
          )}
        </tbody> */}
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <tr key={index}>
                {columns.map((col, index) => (
                  <td key={index}>
                    {/* Render the column value only once */}
                    {col.field === "action" ? (
                      <>
                        <EditIcon
                          onClick={() => handleOpen(row)}
                          style={{
                            cursor: "pointer",
                            marginRight: "10px",
                            color: "blue",
                          }}
                        />
                        <DeleteIcon
                          onClick={() => handleDelete(row)} // Call delete
                          style={{ cursor: "pointer", color: "red" }}
                        />
                      </>
                    ) : (
                      row[col.field] // Render data for other columns
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={visibleColumns.length}>No results found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Start */}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="edit-modal-title"
          aria-describedby="edit-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="edit-modal-title" variant="h6" component="h2">
              Edit User
            </Typography>
            <Box component="form" noValidate autoComplete="off" mt={2}>
              <TextField
                fullWidth
                margin="normal"
                id="Name"
                name="Name"
                label="Name"
                value={editData?.Name || ""}
                onChange={handleChange}
              />
              {/* <TextField
                fullWidth
                margin="normal"
                id="TechnologyName"
                name="TechnologyName"
                label="Technology"
                value={editData?.TechnologyName || ""}
                onChange={handleChange}
              /> */}
              {/* <TechnologySelector
                value={editData?.TechnologyName || ""}
                options={technologyList}
                selectedTechnologies={selectedTechnologies}
                setSelectedTechnologies={setSelectedTechnologies}
              /> */}
              <Autocomplete
                disablePortal
                value={editData?.TechnologyName || ""}
                options={technologyList}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Technology" />
                )}
              />
              <TextField
                fullWidth
                margin="normal"
                id="Email"
                name="Email"
                label="Email"
                value={editData?.Email || ""}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                margin="normal"
                id="phonenumber"
                name="phonenumber"
                label="Phone Number"
                value={editData?.phonenumber || ""}
                onChange={handleChange}
              />
              {type === "mentor" && ( // Show only if type is "mentor"
                <>
                  <TextField
                    fullWidth
                    margin="normal"
                    id="CurrentCompany"
                    name="CurrentCompany"
                    label="Current Company"
                    value={editData?.CurrentCompany || ""}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    id="experience"
                    name="experience"
                    label="Experience"
                    value={editData?.experience || ""}
                    onChange={handleChange}
                  />
                </>
              )}

              <Box mt={2} display="flex" justifyContent="space-between">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(0)}
          disabled={currentPage === 0}
          className="pagination-btn"
        >
          <FirstPage />
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="pagination-btn"
        >
          <NavigateBefore />
        </button>
        <span className="page-info">
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="pagination-btn"
        >
          <NavigateNext />
        </button>
        <button
          onClick={() => handlePageChange(totalPages - 1)}
          disabled={currentPage === totalPages - 1}
          className="pagination-btn"
        >
          <LastPage />
        </button>
      </div>
    </div>
  );
};

export default CustomDataTable;
