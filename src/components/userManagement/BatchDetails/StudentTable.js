// import React, { useEffect, useMemo, useState } from "react";
// import { connect } from "react-redux";
// import { fetchStudentListbyTechModule } from "../../../store/root.actions";
// import StudentTableRender from "./StudentTableRender";
// import ExcelImports from "./ExcelImports";
// import ToggleSelector from "./ToggleSelector";
// import Addstudent from "./Addstudent";
// import { Button } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { setIncludedStudentsArr } from "../../../store/slice/userManagement.slice";
// import {
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   FormHelperText,
// } from "@mui/material";
// import axios from "axios";

// // styles
// const cellStyle = {
//   fontFamily: "Roboto",
//   fontSize: "1rem",
//   color: "#636363",
//   fontStyle: "normal",
// };
// const tableHeight = "500px";
// const tableWidth = "auto";

// function StudentTableComponent({
//   studentsList,
//   isLoading,
//   isError,
//   technologyId,
//   moduleId,
//   fetchStudentsList,
//   excelImports,
//   userId,
// }) {
//   console.log("excel imports:",excelImports);
//   const dispatch = useDispatch();
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [showAddStudent, setShowAddStudent] = useState(false);
//   const [batchValue, setBatchValue] = useState(""); // State to hold the selected value
//   const [error, setError] = useState(false);
//   const [mentorData, setMentorData] = useState([]);

//   console.log("studentsList",studentsList);
//   console.log("excel imports:",excelImports);
//   const { includedStudents } = useSelector(
//     (store) => store.userManagementPageReducer
//   );

//   const iterableStudentList = useMemo(
//     () => (studentsList ? [...studentsList] : []),
//     [studentsList]
//   );

//   useEffect(() => {
//     if (userId) {
//       fetchMentorData(userId);
//     }
//   }, [userId]);



//   async function fetchMentorData(userId) {
//     try {
//       const res = await axios.get(
//         `http://49.207.10.13:5004/apinit/fetchBatchesByMentorId?mentorId=${userId}`
//       );
//       setMentorData(res.data.data);
//       console.log(res.data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const [currentStudentList, setCurrentStudentList] = useState(
//     selectedIndex === 1
//       ? studentsList
//       : selectedIndex === 2
//       ? excelImports
//       : [...excelImports, ...iterableStudentList]
//   );
//   console.log(studentsList);
//   useEffect(() => {
//     setCurrentStudentList(
//       selectedIndex === 1
//         ? studentsList
//         : selectedIndex === 2
//         ? excelImports
//         : [...excelImports, ...iterableStudentList]
//     );
//   }, [selectedIndex, studentsList, excelImports, iterableStudentList]);

//   const handleChange = (event) => {
//     setBatchValue(event.target.value);
//     console.log(event.target.value);
//     setError(false); // Clear the error if the user selects a value
//   };

//   const handleExcludeAll = () => {
//     dispatch(
//       setIncludedStudentsArr(
//         includedStudents.filter(
//           (student) =>
//             !currentStudentList.some(
//               (currentStudent) => currentStudent.StudentID === student
//             )
//         )
//       )
//     );
//   };

//   const handleIncludeAll = () => {
//     dispatch(
//       setIncludedStudentsArr(
//         Array.from(
//           new Set([
//             ...includedStudents,
//             ...currentStudentList.map((student) => student.StudentID),
//           ])
//         )
//       )
//     );
//   };

//   return (
//     <div
//       className="flex justify-center mt-10"
//       style={{ paddingLeft: "8px", paddingRight: "8px" }}
//     >
//       <div>
//         <div className="w-auto flex justify-end">
//           <FormControl sx={{ width: "140px", padding: 0 }} error={error}>
//             <InputLabel
//               id="demo-simple-select-label"
//               sx={{ marginTop: "-5px" }}
//             >
//               Select Batch
//             </InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               value={batchValue}
//               onChange={handleChange}
//               label="Select Batch"
//               sx={{
//                 padding: 0,
//                 height: "40px", // Set height directly on Select
//                 fontSize: "14px", // Adjust font size if needed
//               }}
//             >
//               {/* Render menu items dynamically from mentorData */}
//               {Array.isArray(mentorData) &&
//                 mentorData.map((batch, index) => (
//                   <MenuItem key={index} value={batch.BatchId}>
//                     {batch.BatchName}
//                   </MenuItem>
//                 ))}
//             </Select>

//             {error && <FormHelperText>Selection is required</FormHelperText>}
//           </FormControl>
//           <div className="ms-5 mb-6">
//             <Button variant="contained" onClick={handleIncludeAll}>
//               Include All
//             </Button>
//           </div>
//           <div className="ms-5 mb-6">
//             <Button variant="contained" onClick={handleExcludeAll}>
//               Exclude All
//             </Button>
//           </div>
//           <div className="ms-5">
//             <ExcelImports
//               setShowAddStudent={setShowAddStudent}
//               batchId={batchValue}
//             />
//           </div>
//           <div className="ms-5">
//             <ToggleSelector
//               selectedIndex={selectedIndex}
//               setSelectedIndex={setSelectedIndex}
//             />
//           </div>
//         </div>
//         <div className="mb-5">
//           <Addstudent
//             showAddStudent={showAddStudent}
//             setShowAddStudent={setShowAddStudent}
//             batchId={batchValue}
//           />
//         </div>
//         <div style={{ width: "auto" }}>
//           <StudentTableRender
//             studentsList={currentStudentList}
//             cellStyle={cellStyle}
//             tableHeight={tableHeight}
//             tableWidth={tableWidth}
//             batchId={batchValue}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// const mapStateToComponent = (state) => ({
//   studentsList: state.studentListByTechModuleReducer.data,
//   isLoading: state.studentListByTechModuleReducer.isLoading,
//   isError: state.studentListByTechModuleReducer.isError,
//   technologyId: state.userManagementPageReducer.technologyId,
//   moduleId: state.userManagementPageReducer.moduleId,
//   excelImports: state.excelStudnetReducer.excelImports,
//   userId: JSON.parse(localStorage.getItem("auth")).userId,
// });

// const mapDispatch = {
//   fetchStudentsList: (payload) => fetchStudentListbyTechModule(payload),
// };

// const StudentTable = connect(
//   mapStateToComponent,
//   mapDispatch
// )(StudentTableComponent);

// export default StudentTable;

import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { fetchStudentListbyTechModule } from "../../../store/root.actions";
import StudentTableRender from "./StudentTableRender";
import ExcelImports from "./ExcelImports";
import ToggleSelector from "./ToggleSelector";
import Addstudent from "./Addstudent";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setIncludedStudentsArr } from "../../../store/slice/userManagement.slice";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import axios from "axios";

// styles
const cellStyle = {
  fontFamily: "Roboto",
  fontSize: "1rem",
  color: "#636363",
  fontStyle: "normal",
};
// const tableHeight = "600px";
// const tableWidth = "1250px";
const screenHeight = window.innerHeight;
const tableHeight = screenHeight < 700 ? "450px" : "700px";
const tableWidth = "calc(100vw - 320px)";

function StudentTableComponent({
  setBatchId,
  batcid,
  studentsListx,
  isLoading,
  isError,
  technologyId,
  moduleId,
  fetchStudentsList,
  excelImports,
  userId
}) {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [error, setError] = useState(false);
  const [mentorData, setMentorData] = useState([]);
  const [studentsList, setStudentsList]=useState([]);


  useEffect(() => {
    if (userId !== null || userId !== undefined || userId !== '') {
      fetchMentorData(userId);
    }
  }, [userId]);

  useEffect(()=>{
    if(batcid !== '' || batcid !== null || batcid !== undefined){
      const students=Array.isArray(studentsListx) && studentsListx.length > 0 ? studentsListx.filter((row,index)=> row.BatchId === batcid) : []
      setStudentsList(students);
    }
    

  },[batcid])
    
    
    
  async function fetchMentorData(userId) {
    try {
      const res = await axios.get(
        `http://49.207.10.13:5004/apinit/fetchBatchesByMentorId?mentorId=${userId}`
      );
      setMentorData(res.data.data);
      console.log("mentor data:",res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const { includedStudents } = useSelector(
    (store) => store.userManagementPageReducer
  );

  const iterableStudentList = useMemo(
    () => (studentsList ? [...studentsList] : []),
    [studentsList]
  );

  const [currentStudentList, setCurrentStudentList] = useState(
    selectedIndex === 1
      ? studentsList
      : selectedIndex === 2
      ? excelImports
      : [...excelImports, ...iterableStudentList]
  );

  useEffect(() => {
    setCurrentStudentList(
      selectedIndex === 1
        ? studentsList
        : selectedIndex === 2
        ? excelImports
        : [...excelImports, ...iterableStudentList]
    );
  }, [selectedIndex, studentsList, excelImports, iterableStudentList]);

  
  const handleChange = (event) => {
    setBatchId(event.target.value);
    console.log(event.target.value);
    setError(false);
  };

  const handleExcludeAll = () => {
    dispatch(
      setIncludedStudentsArr(
        includedStudents.filter(
          (student) =>
            !currentStudentList.some(
              (currentStudent) => currentStudent.StudentID === student
            )
        )
      )
    );
  };

  const handleIncludeAll = () => {
    dispatch(
      setIncludedStudentsArr(
        Array.from(
          new Set([
            ...includedStudents,
            ...currentStudentList.map((student) => student.StudentID),
          ])
        )
      )
    );
  };

  return (
    <div className="flex justify-center mt-10" style={{margin:"10px"}}>
      <div>
        <div className="w-full flex justify-end">
        <FormControl sx={{ width: "140px", padding: 0 }} error={error}>
             <InputLabel
              id="demo-simple-select-label"
              sx={{ marginTop: "-5px" }}
            >
              Select Batch
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              // value={batchValue}
              onChange={handleChange}
              label="Select Batch"
              sx={{
                padding: 0,
                height: "40px", // Set height directly on Select
                fontSize: "14px", // Adjust font size if needed
              }}
            >
              <MenuItem value={null}>
                select a batch    
              </MenuItem>
              {/* Render menu items dynamically from mentorData */}
              {Array.isArray(mentorData) &&
                mentorData.map((batch, index) => (
                  <MenuItem key={index} value={batch.BatchId}>
                    {batch.BatchName}
                  </MenuItem>
                ))}
            </Select>

            {error && <FormHelperText>Selection is required</FormHelperText>}
          </FormControl>
          <div className="ms-5 mb-6">
            <Button variant="contained" onClick={handleIncludeAll}>
              Include All
            </Button>
          </div>
          <div className="ms-5 mb-6">
            <Button variant="contained" onClick={handleExcludeAll}>
              Exclude All
            </Button>
          </div>
          <div className="ms-5">
            <ExcelImports setShowAddStudent={setShowAddStudent} />
          </div>
          <div className="ms-5">
            <ToggleSelector
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
            />
          </div>
        </div>
        <div className="mb-5">
          <Addstudent
            showAddStudent={showAddStudent}
            setShowAddStudent={setShowAddStudent}
          />
        </div>
        <div>
          <StudentTableRender
            studentsList={currentStudentList}
            cellStyle={cellStyle}
            tableHeight={tableHeight}
            tableWidth={tableWidth}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToComponent = (state) => ({
  studentsListx: state.studentListByTechModuleReducer.data,
  isLoading: state.studentListByTechModuleReducer.isLoading,
  isError: state.studentListByTechModuleReducer.isError,
  technologyId: state.userManagementPageReducer.technologyId,
  moduleId: state.userManagementPageReducer.moduleId,
  excelImports: state.excelStudnetReducer.excelImports,
  userId: JSON.parse(localStorage.getItem("auth")).userId,
});

const mapDispatch = {
  fetchStudentsList: (payload) => fetchStudentListbyTechModule(payload),
};

const StudentTable = connect(
  mapStateToComponent,
  mapDispatch
)(StudentTableComponent);

export default StudentTable;
