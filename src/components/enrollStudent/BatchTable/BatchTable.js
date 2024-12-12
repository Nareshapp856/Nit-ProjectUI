import { Checkbox, FormControlLabel } from "@mui/material";
import { NavLink } from "react-router-dom";

function BatchTable({ batchData, onBatchSelect }) {
  return (
    <div>
      <div className="max-h-[60vh] overflow-y-auto w-4/6 mx-auto border-collapse border border-gray-300">
        <table className="w-full">
          <Thead />
          <Tbody batchData={batchData} onBatchSelect={onBatchSelect} />
        </table>
      </div>
    </div>
  );
}

export default BatchTable;

function Thead() {
  return (
    <thead className="bg-gray-100">
      <tr className="border-b border-gray-300">
        <th className="py-3 px-4 text-left w-1/6">BatchId</th>
        <th className="py-3 px-4 text-left w-2/6">Batch Name</th>
        <th className="py-3 px-4 text-left w-1/6">Faculty</th>
        <th className="py-3 px-4 text-left w-1/6">Timings</th>
        <th className="py-3 px-4 text-left w-1/6">Active Users</th>
      </tr>
    </thead>
  );
}

function Tbody({ batchData, onBatchSelect }) {
  return batchData.length > 0 ? (
    <tbody>
      {batchData &&
        batchData.map((batch) => (
          <Td batch={batch} onBatchSelect={onBatchSelect} />
        ))}
    </tbody>
  ) : (
    <tbody className="h-[6rem] grid place-content-center w-full">
      <tr>
        <td colSpan="4">
          <i>Loading...</i>
        </td>
        <td colSpan="0"></td>
        <td colSpan="0"></td>
        <td colSpan="0"></td>
      </tr>
    </tbody>
  );
}

function Td({ batch, onBatchSelect }) {
  return (
    <tr className="border-b border-gray-300 hover:bg-gray-50">
      <td className="py-3 px-4">
        <FormControlLabel
          control={
            <Checkbox
              size=""
              sx={{ padding: 0, margin: 0 }}
              color="default"
              onClick={onBatchSelect}
            />
          }
        />
        <NavLink
          className="text-blue-500 hover:text-blue-600 underline underline-offset-[3px]"
          to={`/enroll-student/student-selection/${batch.BatchId}`}
        >
          {batch.BatchId}
        </NavLink>
      </td>
      <td className="py-3 px-4">{batch.BatchName}</td>
      <td className="py-3 px-4">{batch.CreatedBy}</td>
      <td className="py-3 px-4">
        {batch.CreatedAt ? new Date(batch.CreatedAt).toLocaleDateString() : ""}
      </td>
      <td className="py-3 px-4">-------</td>
    </tr>
  );
}
