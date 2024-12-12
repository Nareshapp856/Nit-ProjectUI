import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import StudentRenderer from "./StudentRenderer";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  insertBatchId,
  removeBatchId,
} from "../../../store/slice/enrollStudent.slice";
import api from "../../../services/api";

const fetchStudent = async (id) => {
  const response = await api.post("/GetStudentNameByBatchId", {
    BatchId: id,
  });

  return response.data.dbresult;
};

function BatchRenderer({ batch, testId }) {
  const dispatch = useDispatch();
  const [displayStudents, setDisplayStudents] = useState(false);
  const [students, setStudents] = useState([]);
  const { batchIdList } = useSelector((store) => store.enrollStudentReducer);
  const [queryEnabled, setQeuryEnabled] = useState(false);
  const {
    data: studentList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["student", batch.BatchId],
    queryFn: () => fetchStudent(batch.BatchId),
    staleTime: 50000,
    gcTime: 300000,
    enabled: queryEnabled,
  });
  const isChecked = batchIdList[testId]?.includes(batch.BatchId) || false;

  useEffect(() => {
    setStudents(studentList || []);
  }, [studentList]);

  const onBatchSelection = (e) => {
    e.stopPropagation();
    const flag = e.target.checked;

    if (flag) {
      dispatch(insertBatchId({ testId, batchId: batch.BatchId }));
    } else {
      dispatch(removeBatchId({ testId, batchId: batch.BatchId }));
    }
  };

  if (isError) return <i>Something went wrong</i>;
  if (isLoading) return <i>Loading...</i>;

  return (
    <>
      <div
        className="flex justify-between cursor-pointer py-1"
        onClick={() => {
          setDisplayStudents((prev) => !prev);
          setQeuryEnabled(true);
        }}
      >
        <div className="flex">
          <FormControlLabel
            control={
              <Checkbox
                size=""
                sx={{ padding: 0, margin: 0 }}
                color="default"
                checked={isChecked}
                onClick={onBatchSelection}
              />
            }
          />

          <p>{batch.BatchName}</p>
        </div>

        <p style={{ rotate: displayStudents ? "90deg" : "0deg" }}>
          <ArrowForwardIosIcon fontSize="10" />
        </p>
      </div>

      {displayStudents ? (
        students.length > 0 ? (
          <div className="mb-4 mt-4 ms-10">
            <StudentRenderer
              students={students}
              testId={testId}
              batchId={batch.BatchId}
            />
          </div>
        ) : (
          <div className="mb-4 mt-4 ms-10">
            <i>No data to show.</i>
          </div>
        )
      ) : null}
    </>
  );
}

export default BatchRenderer;
