import React, {
  memo,
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { connect } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import {
  ac_curriculumByIDApi,
  ac_updateFaculityCurriculum,
} from "../store/Faculty/api";
import { ac_curriculumById, ac_curriculumList } from "../store/action/admin";
import axios from "axios";

const columnHelper = createColumnHelper();

const BatchCurriculumView = ({
  showCurriculum,
  setShowCurriculum,
  fetchBatchCurriculum,
}) => {
  const commentRef = useRef("");
  const status = showCurriculum[0].status;
  console.log("show curriculum status:", status);
  const [tableData, setTableData] = useState(showCurriculum || []);
  console.log(showCurriculum);

  const columns = useMemo(
    () => [
      columnHelper.accessor("batchname", {
        header: "Batch Name",
        cell: (info) => <Typography>{info.getValue()}</Typography>,
        width: 140,
      }),
      columnHelper.accessor("facaulty_name", {
        header: "Faculty Name",
        cell: (info) => <Typography>{info.getValue()}</Typography>,
        width: 250,
      }),
      columnHelper.accessor("teststartdate", {
        header: "Start Date",
        cell: (info) => <Typography>{info.getValue()}</Typography>,
        width: 200,
      }),
      columnHelper.accessor("testenddate", {
        header: "End Date",
        cell: (info) => <Typography>{info.getValue()}</Typography>,
        width: 200,
      }),
      columnHelper.accessor("teststarttime", {
        header: "Start Time",
        cell: (info) => (
          <Typography>{info.getValue().split(".")[0]}</Typography>
        ),
        width: 200,
      }),
      columnHelper.accessor("testendtime", {
        header: "End Time",
        cell: (info) => (
          <Typography>{info.getValue().split(".")[0]}</Typography>
        ),
        width: 200,
      }),
    ],
    []
  );

  const table = useReactTable({
    columns,
    data: showCurriculum,
    getCoreRowModel: getCoreRowModel(),
  });

  const blackDropClick = useCallback(() => {
    setShowCurriculum(false);
  }, [setShowCurriculum]);

  const onModalClick = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  const handleApprove = async () => {
    const res = await axios.put(
      "http://49.207.10.13:4017/api/UpdateStudentWeeklyCalender",
      {
        CurriculumId: showCurriculum[0].CurriculumId,

        status: "Approved",
      }
    );
    fetchBatchCurriculum();
    setShowCurriculum(false);
  };

  const handleRevert = async () => {
    const res = await axios.put(
      "http://49.207.10.13:4017/api/UpdateStudentWeeklyCalender",
      {
        CurriculumId: showCurriculum[0].CurriculumId,

        status: "Revert",
      }
    );
    fetchBatchCurriculum();
    setShowCurriculum(false);
  };

  const handleReject = async () => {
    if (!commentRef.current) {
      alert("Please add comment before rejecting");
      return;
    }

    const res = await axios.put(
      "http://49.207.10.13:4017/api/UpdateStudentWeeklyCalender",
      {
        CurriculumId: showCurriculum[0].CurriculumId,

        status: "rejected",
      }
    );
    fetchBatchCurriculum();
    setShowCurriculum(false);
  };

  const handleCommentChange = (event) => {
    commentRef.current = event.target.value;
  };

  const handleSendForReview = async () => {
    const res = await axios.put(
      "http://49.207.10.13:4017/api/UpdateStudentWeeklyCalender",
      {
        CurriculumId: showCurriculum[0].CurriculumId,

        status: "pending",
      }
    );
    fetchBatchCurriculum();
    setShowCurriculum(false);
  };

  return (
    <div
      className="fixed z-50 top-0 left-0 w-full h-screen bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center p-4"
      onClick={blackDropClick}
    >
      <div
        className="bg-white p-8 rounded-xl shadow-xl w-[1000px] overflow-auto"
        onClick={onModalClick}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <p className="text-xl font-bold text-gray-800">
              {showCurriculum.courseCurriculam_Name}
            </p>

            <p
              variant="body-2"
              className="font-bold text-gray-800 uppercase text-sm"
            >
              - {showCurriculum.status}
            </p>
          </div>

          <IconButton
            edge="end"
            color="inherit"
            onClick={blackDropClick}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </div>

        {/* Table */}
        <TableContainer
          component={Paper}
          sx={{ overflowX: "auto", maxHeight: 450 }}
          className="border-2"
        >
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
                        backgroundColor: "#1E40AF",
                        color: "#ffffff",
                        border: "1px solid rgba(0, 0, 0, 0.12)",
                        outline: ".2px solid rgba(30, 64, 175, 0.2)",
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
                    "&:hover": { backgroundColor: "rgba(30, 64, 175, 0.05)" },
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
                        outline: ".2px solid rgba(30, 64, 175, 0.2)",
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Comment Section */}
        {status === "revert" && showCurriculum?.comments && (
          <div className="mt-4">
            <p className="max-h-[100px] min-w-[500px] text-sm font-semibold overflow-x-auto bg-gray-200 rounded px-2 py-2 me-2 minimize-scroll-width overflow-y-auto">
              {showCurriculum?.comments || ""}
            </p>
          </div>
        )}

        {status !== "Approved" &&
          status !== "rejected" &&
          status !== "revert" && (
            <div className="mt-4">
              <textarea
                onChange={handleCommentChange}
                placeholder="add comment before rejecting..."
                rows={3}
                className="border border-gray-300 w-full px-3 py-2 rounded-lg text-gray-800 bg-gray-50 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          )}

        {/* Action Buttons */}
        {(status === "pending" || status === "revert") && (
          <div className="mt-4 flex justify-end space-x-3">
            <Button
              onClick={status === "revert" ? handleRevert : handleApprove}
              variant="contained"
              sx={{
                backgroundColor: "#4CAF50",
                "&:hover": { backgroundColor: "#45A049" },
              }}
            >
              Approve
            </Button>
            {status === "pending" && (
              <Button
                onClick={handleReject}
                variant="contained"
                sx={{
                  backgroundColor: "#F44336",
                  "&:hover": { backgroundColor: "#E53935" },
                }}
              >
                Reject
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchCurriculumView;
