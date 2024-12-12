import React, { useEffect, useState } from "react";
import { Checkbox, Button } from "@mui/material";
import { Table, Column } from "react-virtualized";
import "react-virtualized/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { setTestIdList } from "../../../store/slice/enrollStudent.slice";
import { fetchBatchList, fetchTestList } from "../../../store/root.actions";

function EnrollStudentTable({ testData }) {
  const [expandedRowIndex, setExpandedRowIndex] = useState(-1);
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();

  const {
    data: batchList,
    isLoading,
    isError,
  } = useSelector((store) => store.testListReducer);

  useEffect(() => {
    dispatch(fetchTestList({ technologyId: 2, moduleId: 2 }));
  }, []);

  const toggleRow = (index) => {
    setExpandedRowIndex((prevIndex) => (prevIndex === index ? -1 : index));
    setIsExpanded(true);
  };

  const rowRenderer = ({ index, key, style }) => {
    const test = batchList[index];
    const isRowExpanded = index === expandedRowIndex;

    const rowHeight = isRowExpanded ? 100 : 50;

    return (
      <div key={key} style={{ ...style, height: rowHeight }}>
        <div
          className="border-b-2 border-gray-300 flex items-center py-2 hover:bg-gray-50"
          style={{
            border: "1px solid rgb(209 213 219)",
          }}
        >
          <div style={{ width: "200px" }}>
            <Checkbox size="" color="default" />
            {test.TestID}
          </div>
          <div
            className="cursor-pointer text-blue-700 underline underline-offset-2"
            onClick={() => toggleRow(index)}
            style={{ width: "450px" }}
          >
            {test.TestName}
          </div>
          <div className="" style={{ width: "300px" }}>
            {test.TestStartDate
              ? new Date(test.TestStartDate).toLocaleDateString()
              : ""}
          </div>
          <div className="" style={{ width: "300px" }}>
            {test.TestEndDate
              ? new Date(test.TestEndDate).toLocaleDateString()
              : ""}
          </div>
        </div>
        {isRowExpanded && (
          <div className="border-b border-gray-300 p-2">
            <h2>Batch Details</h2>
            <p className="m-2">Table Goes Here</p>
            <Button variant="contained">Fetch Students</Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <Table
      className="verflow-y-auto mx-auto border-collapse border w-[1110px] border-gray-300"
      width={1110}
      height={600}
      rowHeight={isExpanded ? 100 : 50}
      rowCount={batchList.length}
      rowGetter={({ index }) => batchList[index]}
      rowRenderer={rowRenderer}
      headerHeight={60}
    >
      <Column
        label="Test ID"
        dataKey="TestID"
        width={200}
        headerRenderer={({ label }) => (
          <div style={{ padding: "8px" }}>{label}</div>
        )}
      />
      <Column
        label="Test Name"
        dataKey="TestName"
        width={500}
        headerRenderer={({ label }) => (
          <div style={{ padding: "8px" }}>{label}</div>
        )}
      />
      <Column
        label="Start Date"
        dataKey="TestStartDate"
        width={300}
        headerRenderer={({ label }) => (
          <div style={{ padding: "8px" }}>{label}</div>
        )}
      />
      <Column
        label="End Date"
        dataKey="TestEndDate"
        width={300}
        headerRenderer={({ label }) => (
          <div style={{ padding: "8px" }}>{label}</div>
        )}
      />
    </Table>
  );
}

export default EnrollStudentTable;
