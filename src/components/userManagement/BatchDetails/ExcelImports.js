// import React, { useRef, useState } from "react";
// import { Button, ButtonGroup, Menu, MenuItem } from "@mui/material";
// import * as XLSX from "xlsx";
// import { useDispatch, useSelector } from "react-redux";
// import { insertExcelStudents } from "../../../store/slice/excelStudents.slice";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import GetAppIcon from "@mui/icons-material/GetApp";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import AddCircleIcon from "@mui/icons-material/AddCircle";

// import { setIncludedStudentsArr } from "../../../store/slice/userManagement.slice";

// function generateShortId() {
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let shortId = "";
//   for (let i = 0; i < 3; i++) {
//     shortId += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return shortId;
// }

// function ExcelImports({ setShowAddStudent, batchId }) {
//   const dispatch = useDispatch();
//   const anchorRef = useRef();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const { includedStudents } = useSelector(
//     (store) => store.userManagementPageReducer
//   );

//   //const excelStudents = useSelector((store) => store.excelStudnetReducer);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const bstr = e.target.result;
//       const wb = XLSX.read(bstr, { type: "binary" });

//       const wsname = wb.SheetNames[0];
//       const ws = wb.Sheets[wsname];

//       const data = XLSX.utils.sheet_to_json(ws, { header: 1 });


//       const keys = ["StudentID", "FirstName", "LastName", "Email", "PhoneNumber"];

//       const transformedData = data.slice(1).map((row) => {
  
//         const obj = {};
//         keys.forEach((key, index) => {
//           obj[key] = row[index];
//         });
//         console.log("obje:",obj);
//         if (!obj["BatchId"]) {
//           obj["BatchId"] = Number(batchId);
//         }
//         if (obj["PhoneNumber"]) {
//           obj["PhoneNumber"] = String(obj["PhoneNumber"]);
//         }

//         return obj;
//       });

//       dispatch(insertExcelStudents(transformedData));
//       dispatch(
//         setIncludedStudentsArr(
//           Array.from(
//             new Set([
//               ...includedStudents,
//               ...transformedData.map((student) => student.StudentID),
//             ])
//           )
//         )
//       );
//     };
//     if (file) reader.readAsBinaryString(file);
//   };

//   const handleMenuItemClick = (index) => {
//     if (index === 0) {
//       document.getElementById("file-upload").click();
//     } else if (index === 1) {
//       const link = document.createElement("a");
//       link.href = `${window.location.origin}/UM-Students-Scaffold.xlsx`;
//       link.download = "UM-Students-Scaffold.xlsx";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     } else if (index === 2) {
//       setShowAddStudent((prev) => !prev);
//     }
//     setAnchorEl(null);
//   };

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <ButtonGroup
//         variant="contained"
//         ref={anchorRef}
//         aria-label="split button"
//       >
//         <Button onClick={handleClick} endIcon={<ArrowDropDownIcon />}>
//           Actions
//         </Button>
//       </ButtonGroup>
//       <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
//         <MenuItem onClick={() => handleMenuItemClick(0)}>
//           <CloudUploadIcon />
//           &nbsp;Upload File
//         </MenuItem>
//         <MenuItem onClick={() => handleMenuItemClick(1)}>
//           <GetAppIcon />
//           &nbsp;Download Template
//         </MenuItem>
//         <MenuItem onClick={() => handleMenuItemClick(2)}>
//           <AddCircleIcon />
//           &nbsp;Add Student
//         </MenuItem>
//       </Menu>
//       <input
//         id="file-upload"
//         type="file"
//         accept=".xlsx,.xls,.numbers"
//         style={{ display: "none" }}
//         onChange={handleFileUpload}
//       />
//     </>
//   );
// }

// export default ExcelImports;

import React, { useRef, useState } from "react";
import { Button, ButtonGroup, Menu, MenuItem } from "@mui/material";
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from "react-redux";
import { insertExcelStudents } from "../../../store/slice/excelStudents.slice";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import GetAppIcon from "@mui/icons-material/GetApp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { setIncludedStudentsArr } from "../../../store/slice/userManagement.slice";

function generateShortId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortId = "";
  for (let i = 0; i < 3; i++) {
    shortId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return shortId;
}

function ExcelImports({ setShowAddStudent }) {
  const dispatch = useDispatch();
  const anchorRef = useRef();
  const [anchorEl, setAnchorEl] = useState(null);
  const { includedStudents } = useSelector(
    (store) => store.userManagementPageReducer
  );

  //const excelStudents = useSelector((store) => store.excelStudnetReducer);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });

      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

      const keys = [
        "StudentID",
        "FirstName",
        "LastName",
        "Email",
        "PhoneNumber",
      ];

      const transformedData = data.slice(1).map((row) => {
        const obj = {};
        keys.forEach((key, index) => {
          obj[key] = row[index];
        });

        if (!obj["StudentID"]) {
          obj["StudentID"] = generateShortId();
        }
        if (obj["PhoneNumber"]) {
          obj["PhoneNumber"] = Number(obj["PhoneNumber"]);
        }

        return obj;
      });

      dispatch(insertExcelStudents(transformedData));
      dispatch(
        setIncludedStudentsArr(
          Array.from(
            new Set([
              ...includedStudents,
              ...transformedData.map((student) => student.StudentID),
            ])
          )
        )
      );
    };
    if (file) reader.readAsBinaryString(file);
  };

  const handleMenuItemClick = (index) => {
    if (index === 0) {
      document.getElementById("file-upload").click();
    } else if (index === 1) {
      const link = document.createElement("a");
      link.href = `${window.location.origin}/UM-Students-Scaffold.xlsx`;
      link.download = "UM-Students-Scaffold.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (index === 2) {
      setShowAddStudent((prev) => !prev);
    }
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button onClick={handleClick} endIcon={<ArrowDropDownIcon />}>
          Actions
        </Button>
      </ButtonGroup>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleMenuItemClick(0)}>
          <CloudUploadIcon />
          &nbsp;Upload File
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(1)}>
          <GetAppIcon />
          &nbsp;Download Template
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(2)}>
          <AddCircleIcon />
          &nbsp;Add Student
        </MenuItem>
      </Menu>
      <input
        id="file-upload"
        type="file"
        accept=".xlsx,.xls,.numbers"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
    </>
  );
}

export default ExcelImports;
