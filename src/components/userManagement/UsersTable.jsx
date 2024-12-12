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
import { FirstPage, NavigateBefore, NavigateNext, LastPage } from '@mui/icons-material'; // Import MUI icons

const CustomDataTable = ({ type, dataSubmit }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Track current page
  const rowsPerPage = 10; // Set rows per page

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
  ];

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
        <tbody>
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
        </tbody>
      </table>

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
