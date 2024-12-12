// import clsx from "clsx";
// import { connect } from "react-redux";
// import { useEffect, useState } from "react";
// import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
// import DeleteIcon from "@mui/icons-material/Delete";

// import { fc_facultyCurriculumListDispatch } from "../../store/Faculty/actions/faculty";
// import { ac_curriculumByIDApi } from "../../store/Faculty/api";
// import ViewCurriculumDetails from "../../components/Faculty/ViewCurriculumDetails";
// import { IconButton } from "@mui/material";

// function ViewCurriculumComponent({
//   curriculumList,
//   fetchCurriculum,
//   filter,
//   userId,
// }) {
//   const [showDetails, setShowDetails] = useState(false);
//   const [filteredCurriculumList, setFilteredCurriculumList] = useState(
//     curriculumList || []
//   );
//   // replacement for redux
//   // used to store curriculam data
//   const [curriculamData, setCurriculamData] = useState({});
//   // flag indicates weather curriculam data is loading or not
//   const [isLoading, setIsLoading] = useState(false);
//   // flag to know weather do show data or not in view details feature
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     if (!showModal) fetchCurriculum({ facultyId: userId });
//   }, [fetchCurriculum, showModal]);

//   useEffect(() => {
//     if (Array.isArray(curriculumList)) {
//       setFilteredCurriculumList(
//         filter !== "all"
//           ? curriculumList.filter((curriculum) => curriculum.status === filter)
//           : curriculumList
//       );
//     } else {
//       // Handle case where curriculumList is not an array
//       console.error("curriculumList is not an array");
//     }
//   }, [filter, curriculumList]);

//   // I Know This way of fetch dosen't make sense but what can i do.
//   useEffect(() => {
//     const fetchCurriculumData = async () => {
//       try {
//         setIsLoading(true);
//         const res = await ac_curriculumByIDApi({
//           curriculamId: showDetails?.id,
//         });
//         console.log("fetch curriculum data", res);
//         setCurriculamData(res?.data.result);
//         setShowModal(true);
//         setIsLoading(false);
//       } catch (err) {}
//     };

//     if (showDetails) fetchCurriculumData();
//   }, [showDetails]);

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === "Escape") {
//         setShowModal(false);
//       }
//     };

//     if (showModal) {
//       window.addEventListener("keydown", handleKeyDown);
//     }

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [showModal]);

//   const handleDelete = (curriculum) => {
//     console.log(curriculum);
//   };

//   return (
//     <>
//       {showModal && (
//         <ViewCurriculumDetails
//           curriculamData={curriculamData.recordset || []}
//           setShowModal={setShowModal}
//           curriculamName={showDetails?.name}
//           curriculumId={showDetails?.id}
//           status={showDetails?.status}
//           mappingId={showDetails?.mapping_Id}
//           comments={curriculamData?.[0]?.comments || ""}
//         />
//       )}

//       {filteredCurriculumList.length > 0 &&
//         filteredCurriculumList.map((curriculum) => (
//           <div
//             key={curriculum.curriculam_Id}
//             className={clsx(
//               "w-[320px] shadow-lg bg-white p-1 border-s-4 py-2 rounded-md border-[.6px]",
//               curriculum.status?.toLowerCase() === "pending"
//                 ? "border-yellow-400"
//                 : curriculum.status?.toLowerCase() === "approved"
//                 ? "border-green-400"
//                 : curriculum.status?.toLowerCase() === "revert"
//                 ? "border-pink-400"
//                 : "border-red-400"
//             )}
//           >
//             <div className="p-1">
//               <div className="flex justify-between">
//                 <div>
//                   <p className="font-semibold">
//                     {curriculum.courseCurriculam_Name}
//                   </p>
//                   <span className="text-[.8rem] font-[100] opacity-80">
//                     created at:{" "}
//                     {new Date(curriculum.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>
//                 {/* <div>
//                   <IconButton onClick={() => handleDelete(curriculum)}>
//                     <DeleteIcon />
//                   </IconButton>
//                 </div> */}
//               </div>

//               <p
//                 style={{
//                   textAlign: "center",
//                   fontWeight: "600",
//                   fontFamily: "Times New Roman, serif",
//                 }}
//                 className={clsx(
//                   "text-md bg-opacity-50 rounded-xl my-1",
//                   curriculum.status?.toLowerCase() === "pending"
//                     ? "bg-yellow-400 text-yellow-900"
//                     : curriculum.status?.toLowerCase() === "approved"
//                     ? "bg-green-400 text-green-900"
//                     : curriculum.status?.toLowerCase() === "revert"
//                     ? ""
//                     : ""
//                 )}
//               >
//                 {(curriculum.status?.toLowerCase() === "pending"
//                   ? `${curriculum.status?.toLowerCase()} for Approval`
//                   : curriculum.status?.toLowerCase()) || "No Status Found"}
//               </p>
//               {curriculum.status === "rejected" && (
//                 <p>Reason: {curriculum.comments}</p>
//               )}
//             </div>
//             <hr />
//             <div className="p-1 pt-2">
//               <button
//                 onClick={() => {
//                   setShowDetails({
//                     id: curriculum.curriculam_Id,
//                     name: curriculum.courseCurriculam_Name,
//                     status: curriculum.status,
//                     comments: curriculum.comments,
//                   });
//                   setShowModal(true);
//                 }}
//                 className="text-[.8rem] text-blue-500 flex items-center"
//               >
//                 View Details <ArrowRightAltIcon />
//               </button>
//             </div>
//           </div>
//         ))}
//     </>
//   );
// }

// const mapState = (state) => ({
//   userId: JSON.parse(localStorage.getItem("auth")).userId,
//   curriculumList: state.facultyCurriculumReducer.data,
// });

// const mapDispatch = {
//   fetchCurriculum: fc_facultyCurriculumListDispatch,
// };

// const ViewCurriculum = connect(mapState, mapDispatch)(ViewCurriculumComponent);

// export default ViewCurriculum;

import clsx from "clsx";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import DeleteIcon from "@mui/icons-material/Delete";

import { fc_facultyCurriculumListDispatch } from "../../store/Faculty/actions/faculty";
import { ac_curriculumByIDApi } from "../../store/Faculty/api";
import ViewCurriculumDetails from "../../components/Faculty/ViewCurriculumDetails";
import { IconButton } from "@mui/material";

function ViewCurriculumComponent({
  curriculumList,
  fetchCurriculum,
  filter,
  userId,
}) {
  const [showDetails, setShowDetails] = useState(false);
  const [filteredCurriculumList, setFilteredCurriculumList] = useState(
    curriculumList || []
  );
  const [curriculamData, setCurriculamData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    if (!showModal) fetchCurriculum({ facultyId: userId });
  }, [fetchCurriculum, showModal]);

  useEffect(() => {
    if (Array.isArray(curriculumList)) {
      setFilteredCurriculumList(
        filter !== "all"
          ? curriculumList.filter((curriculum) => curriculum.status === filter)
          : curriculumList
      );
    } else {
      console.error("curriculumList is not an array");
    }
  }, [filter, curriculumList]);

  useEffect(() => {
    const fetchCurriculumData = async () => {
      try {
        setIsLoading(true);
        const res = await ac_curriculumByIDApi({
          curriculamId: showDetails?.id,
        });
        console.log("fetch curriculum data", res);
        setCurriculamData(res?.data.result);
        setShowModal(true);
        setIsLoading(false);
      } catch (err) {}
    };

    if (showDetails) fetchCurriculumData();
  }, [showDetails]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    if (showModal) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  const handleDelete = (curriculum) => {
    console.log(curriculum);
  };

  const totalPages = Math.ceil(filteredCurriculumList.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const displayedCurriculum = filteredCurriculumList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      {showModal && (
        <ViewCurriculumDetails
          curriculamData={curriculamData.recordset || []}
          setShowModal={setShowModal}
          curriculamName={showDetails?.name}
          curriculumId={showDetails?.id}
          status={showDetails?.status}
          mappingId={showDetails?.mapping_Id}
          comments={curriculamData?.[0]?.comments || ""}
        />
      )}

      {displayedCurriculum.length > 0 &&
        displayedCurriculum.map((curriculum) => (
          <div
            key={curriculum.curriculam_Id}
            className={clsx(
              "w-[320px] shadow-lg bg-white p-1 border-s-4 py-2 rounded-md border-[.6px]",
              curriculum.status?.toLowerCase() === "pending"
                ? "border-yellow-400"
                : curriculum.status?.toLowerCase() === "approved"
                ? "border-green-400"
                : curriculum.status?.toLowerCase() === "revert"
                ? "border-pink-400"
                : "border-red-400"
            )}
          >
            <div className="p-1">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">
                    {curriculum.courseCurriculam_Name}
                  </p>
                  <span className="text-[.8rem] font-[100] opacity-80">
                    created at: {" "}
                    {new Date(curriculum.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <p
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  fontFamily: "Times New Roman, serif",
                }}
                className={clsx(
                  "text-md bg-opacity-50 rounded-xl my-1",
                  curriculum.status?.toLowerCase() === "pending"
                    ? "bg-yellow-400 text-yellow-900"
                    : curriculum.status?.toLowerCase() === "approved"
                    ? "bg-green-400 text-green-900"
                    : curriculum.status?.toLowerCase() === "revert"
                    ? ""
                    : ""
                )}
              >
                {(curriculum.status?.toLowerCase() === "pending"
                  ? `${curriculum.status?.toLowerCase()} for Approval`
                  : curriculum.status?.toLowerCase()) || "No Status Found"}
              </p>
              {curriculum.status === "rejected" && (
                <p>Reason: {curriculum.comments}</p>
              )}
            </div>
            <hr />
            <div className="p-1 pt-2">
              <button
                onClick={() => {
                  setShowDetails({
                    id: curriculum.curriculam_Id,
                    name: curriculum.courseCurriculam_Name,
                    status: curriculum.status,
                    comments: curriculum.comments,
                  });
                  setShowModal(true);
                }}
                className="text-[.8rem] text-blue-500 flex items-center"
              >
                View Details <ArrowRightAltIcon />
              </button>
            </div>
          </div>
        ))}

      <div className="flex flex-col items-start mt-4 space-y-2">
        <span className="text-sm font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm text-white bg-blue-500 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm text-white bg-blue-500 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

const mapState = (state) => ({
  userId: JSON.parse(localStorage.getItem("auth")).userId,
  curriculumList: state.facultyCurriculumReducer.data,
});

const mapDispatch = {
  fetchCurriculum: fc_facultyCurriculumListDispatch,
};

const ViewCurriculum = connect(mapState, mapDispatch)(ViewCurriculumComponent);

export default ViewCurriculum;
