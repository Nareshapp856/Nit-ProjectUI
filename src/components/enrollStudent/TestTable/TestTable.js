import { Close } from "@mui/icons-material";
import { Button, Checkbox, Collapse, FormControlLabel } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import BatchDataRenderer from "../BatchTable/BatchDataRenderer";

function TestTable({ testData, onTestSelect }) {
  return (
    <div>
      <div className="max-h-[60vh] overflow-y-auto w-4/6 mx-auto border-collapse border border-gray-300">
        <table className="w-full">
          <Thead />
          <Tbody testData={testData} onTestSelect={onTestSelect} />
        </table>
      </div>
    </div>
  );
}

function Thead() {
  return (
    <thead className="bg-gray-100 sticky top-0 z-10">
      <tr className="border-b border-gray-300">
        <th className="py-3 px-4 text-left w-1/4">Test ID</th>
        <th className="py-3 px-4 text-left w-1/4">Test Name</th>
        <th className="py-3 px-4 text-left w-1/4">Start Date</th>
        <th className="py-3 px-4 text-left w-1/4">End Date</th>
      </tr>
    </thead>
  );
}

function Tbody({ testData, onTestSelect }) {
  const { isLoading, isError, state, data } = useSelector(
    (store) => store.testListReducer
  );

  return testData.length > 0 ? (
    <tbody>
      {testData.map((test) => (
        <Td key={test.TestID} test={test} onTestSelect={onTestSelect} />
      ))}
    </tbody>
  ) : (
    <tbody>
      <tr>
        <td colSpan="4" className="h-[100px]">
          {isError ? (
            <i className="mx-10">
              Something went wrong!. please try refreshing
            </i>
          ) : isLoading ? (
            <i className="mx-10">Loading...</i>
          ) : data === undefined ? (
            <i className="mx-10">Select Technology and Module to get tests</i>
          ) : state === "resolved" ? (
            <i className="mx-10">No data available on this module</i>
          ) : null}
        </td>
      </tr>
    </tbody>
  );
}

function Td({ test, onTestSelect }) {
  const [showDetails, setShowDetails] = useState(false);
  const { testIdList } = useSelector((store) => store.enrollStudentReducer);

  return (
    <>
      <tr className="border-b border-gray-300 hover:bg-gray-50">
        <td className="py-3 px-4">
          <FormControlLabel
            control={
              <Checkbox
                size=""
                sx={{ padding: 0, margin: 0 }}
                color="default"
                checked={testIdList.includes(test.TestID)}
                onClick={(e) => onTestSelect(e, test.TestID)}
              />
            }
          />
          {test.TestID}
        </td>
        <td
          className="py-3 px-4 text-blue-700 underline underline-offset-2 hover:cursor-pointer"
          onClick={() => setShowDetails((prev) => !prev)}
        >
          {test.TestDescription}
        </td>
        <td className="py-3 px-4">
          {test.TestStartDate
            ? new Date(test.TestStartDate).toLocaleDateString()
            : ""}
        </td>
        <td className="py-3 px-4">
          {test.TestEndDate
            ? new Date(test.TestEndDate).toLocaleDateString()
            : ""}
        </td>
      </tr>
      <AnimatePresence>
        {showDetails && (
          <motion.tr
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{
              scaleY: 0,
              y: -20,
              opacity: 0,
              transition: { duration: 0.1 },
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="border-b-2"
          >
            <td colSpan="4">
              <section className="p-2 pe-0">
                <div>
                  <div className="flex justify-between">
                    <h2>Batch Details</h2>
                    <span className="hover:cursor-pointer">
                      <Close onClick={() => setShowDetails(false)} />
                    </span>
                  </div>
                  <div className="m-8">
                    <BatchDataRenderer testId={test.TestID} />
                  </div>
                </div>
              </section>
            </td>
            <td colSpan="0"></td>
            <td colSpan="0"></td>
            <td colSpan="0"></td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
}

export default TestTable;
