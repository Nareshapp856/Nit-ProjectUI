import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const defaultColumnDefs = (navigate) => [
  {
    field: "BatchId",
    headerName: "Batch ID",
    width: 200,
  },
  {
    field: "BatchName",
    headerName: "Batch Name",
    width: 300,
  },
  {
    field: "No_Of_Students",
    headerName: "No of Students",
    width: 150,
  },
  {
    field: "Facaulty",
    headerName: "Batch Admin",
    width: 250,
  },
  // {
  //   field: "mentor",
  //   headerName: "Mentor",
  //   width: 230,
  // },
  {
    field: "Actions",
    headerName: "Actions",
    width: 110,
    cellRenderer: (params) => {
      return (
        <div
          onClick={() =>
            navigate(`/user-management/batch-details/${params.data.BatchId}`)
          }
        >
          <Edit />
        </div>
      );
    },
  },
];

function BatchTableRenderer({ batchList, cellStyle, height, width }) {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (batchList) setRowData(batchList);
  }, [batchList]);

  const columnDefs = useMemo(() => {
    return defaultColumnDefs(navigate).map((def) => ({
      ...def,
      cellStyle: {
        ...def.cellStyle,
        ...cellStyle,
      },
    }));
  }, [cellStyle, navigate]);

  return (
    <div style={{ height, width }} className="ag-theme-alpine">
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        rowSelection="multiple"
      />
    </div>
  );
}

export default BatchTableRenderer;
