import { AgGridReact } from "ag-grid-react";

function TableRenderer({ rowData, colDefs }) {
  return (
    <div>
      <h1>hi</h1>
      <AgGridReact columnDefs={colDefs} rowData={rowData} />
      <h2>bi</h2>
    </div>
  );
}

export default TableRenderer;
