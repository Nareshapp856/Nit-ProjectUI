import React, { memo, useEffect, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
} from "@mui/material";
import { connect } from "react-redux";
import { ac_curriculumById, ac_curriculumList } from "../store/action/admin";
import BatchCurriculumView from "./BatchCurriculumView";
import { ac_fetchCurriculamDetails } from "../store/Faculty/api";
import axios from "axios";

const fetchCurriculumData = async (id) => {
  return await ac_fetchCurriculamDetails(id);
};

const curriculumDataAdapter = (data) => {
  const defaultData = (data || [])[0];
  const Facaulty_Name = defaultData?.Facaulty_Name;
  const courseCurriculam_Name = defaultData?.courseCurriculam_Name;
  const curriculam_Id = defaultData?.curriculam_Id;
  const status = defaultData?.status;
  const comments = defaultData?.comments;
  const sessionData = data || [];

  const tableData = sessionData.map((session) => ({
    sessionNumber: session?.sessionId,
    topics: session?.topicName?.split(",") || [],
    subTopics: session?.subtopicName?.split(",") || [],
  }));

  return {
    Facaulty_Name,
    courseCurriculam_Name,
    curriculam_Id,
    status,
    tableData,
    comments,
  };
};

const columnHelper = createColumnHelper();

const BatchCurriculumTable = () => {
  //   {
  //   filter,
  //   tableData,
  //   curriculumListDispatch,
  //   fetchCurriculum,
  // }) => {
  const [showCurriculum, setShowCurriculum] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [filterState, setFilterState] = useState({
    facultyName: "",
    status: "",
  });

  useEffect(() => {
    fetchBatchCurriculum();
  }, []);

  const fetchBatchCurriculum = async () => {
    const res = await axios.get(
      "http://49.207.10.13:4017/api/retrieStudentCalenderforAdminApproval"
    );
    console.log("batch curriculum data:", res.data);
    setTableData(res.data);
  };

  const onSessionClick = async (rowData) => {
    console.log("row Data:", rowData);
    // const res = await fetchCurriculumData(rowData?.curriculam_Id);
    setShowCurriculum([rowData]);
  };

  const handleFilterChange = (e) => {
    setFilterState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const filteredData = useMemo(() => {
    return tableData.filter((row) => {
      return (
        (filterState.facultyName === "" ||
          row.facaulty_name
            .toLowerCase()
            .includes(filterState.facultyName.toLowerCase())) &&
        (filterState.status === "" || row.status === filterState.status)
      );
    });
  }, [filterState, tableData]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("facaulty_name", {
        header: "Faculty Name",
        width: 220,
      }),
      columnHelper.accessor("courseCurriculam_Name", {
        header: "Curriculum Name",
        cell: (info) => {
          return (
            <button
              className=" underline text-blue-600"
              onClick={() => onSessionClick(info.row.original)}
            >
              {info.getValue()}
            </button>
          );
        },
        width: 220,
      }),
      columnHelper.accessor("batchname", {
        header: "Batch Name",
        width: 150,
      }),
      columnHelper.accessor("status", {
        header: "BatchCurriculum Status",
        width: 160,
      }),
    ],
    []
  );

  const table = useReactTable({
    columns,
    data: filteredData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // Include this to enable filtering logic
  });

  return (
    <div>
      {showCurriculum && (
        <BatchCurriculumView
          setShowCurriculum={setShowCurriculum}
          showCurriculum={showCurriculum}
          fetchBatchCurriculum={fetchBatchCurriculum}
        />
      )}

      {/* Filter inputs */}
      <div
        style={{ display: "flex", gap: "16px", marginBottom: "16px" }}
        className="justify-end"
      >
        <TextField
          label="Faculty Name"
          name="facultyName"
          value={filterState.facultyName}
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        />
        <TextField
          label="Status"
          name="status"
          select
          sx={{ minWidth: 100 }}
          value={filterState.status}
          onChange={handleFilterChange}
          variant="outlined"
          size="small"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="Approved">Approved</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
          <MenuItem value="revert">Revert</MenuItem>
        </TextField>
      </div>

      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              {table.getHeaderGroups().map((headerGroup) =>
                headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    style={{ width: header.column.columnDef.width }}
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "rgba(30, 64, 175, 0.8)",
                      color: "#ffffff",
                      border: "1px solid rgba(0, 0, 0, 0.12)",
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },
                  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{ width: cell.column.columnDef.width }}
                    sx={{
                      padding: "16px",
                      borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

// const mapState = (state) => ({
//   tableData: state.adminCurriculumReducer?.data || [],
// });

// const mapDispatch = {
//   curriculumListDispatch: ac_curriculumList,
//   fetchCurriculum: ac_curriculumById,
// };

// const BatchCurriculumTable = connect(
//   mapState,
//   mapDispatch
// )(memo(TableComponent));

export default BatchCurriculumTable;
