import { connect } from "react-redux";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { useLocation, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import BatchFormComponent from "../../components/Faculty/BatchForm";
import BatchTable from "../../components/Faculty/BatchTable";
import {
  mb_fetch_batches,
  mb_fetch_courseCurriculum,
} from "../../store/Faculty/api";

const fetchCourseCurriculum = async (setter, payload) => {
  try {
    const res = await mb_fetch_courseCurriculum(payload);
    setter(res.data || []);
  } catch (error) {
    console.error(error);
  }
};

const fetchBatches = async (setter, payload) => {
  try {
    const res = await mb_fetch_batches(payload);
    setter(res.data || []);
  } catch (error) {
    console.error(error);
  }
};

function AssignCurriuculumComponent({ userId }) {
  const [view, setView] = useState("show");
  const [courseCurriculumList, setCourseCurriculumList] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [curriculumBatchData, setCurriculumBatchData] = useState({});

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // e stands for edit === "true" if editing
  const e = queryParams.get("e");

  useEffect(()=>{
    if(e){
      setView("assign");
    }
  },[e])

  useEffect(() => {
    fetchCourseCurriculum(setCourseCurriculumList, userId);
    fetchBatches(setBatchList, userId);
  }, []);

  // i don't know why this is here.
  const fetchData = (id) => {
    console.log(id);
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div style={{ padding: "10px" }}>
      <h1 className="text-2xl font-bold mb-4">Assign Curriculum</h1>
      <hr className="mb-6 border-gray-300" />

      <div>
        <ul className="flex space-x-4 mb-6 border-b-2 border-gray-200">

          <li>
            <Button
              variant="contained"
              className={`relative px-4 py-2 transition-all duration-300 ${
                view === "show"
                  ? "text-blue-900 font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-900"
                  : "text-gray-500 hover:text-blue-900"
              }`}
              onClick={() => {
                handleViewChange("show");

                searchParams.delete("e");
                searchParams.delete("id");

                setSearchParams(searchParams);
              }}
            >
              My Curriculums
            </Button>
          </li>
          <li>
            <Button
              variant="contained"
              className={`relative px-4 py-2 transition-all duration-300 ${
                view === "assign"
                  ? "text-blue-900 font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-blue-900"
                  : "text-gray-500 hover:text-blue-900"
              }`}
              onClick={() => {
                handleViewChange("assign");

                searchParams.delete("e");
                searchParams.delete("id");

                setSearchParams(searchParams);
              }}
            >
              {e ? "Edit Curriculum" : "Assign Curriculum to Batch"}
            </Button>
          </li>
        </ul>

        <motion.div
          key={view}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4 }}
        >
          {view === "assign" ? (
            <BatchFormComponent
              courseCurriculumList={courseCurriculumList}
              batchList={batchList}
              setView={setView}
            />
          ) : (
            <BatchTable
              handleViewChange={handleViewChange}
              fetchData={fetchData}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  userId: JSON.parse(localStorage.getItem("auth")).userId,
});

const mapDispatch = {};

export default connect(mapState, mapDispatch)(AssignCurriuculumComponent);

//Testing purpose
