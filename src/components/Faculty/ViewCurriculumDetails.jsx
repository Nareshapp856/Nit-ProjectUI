import React, { memo, useMemo, useCallback, useRef } from "react";
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
import { useNavigate } from "react-router";
import CloseIcon from "@mui/icons-material/Close";

import { updateCurriculamUtil } from "../../store/Faculty/util/updateCurriculumUtil";

const columnHelper = createColumnHelper();

const CurriculumViewComponent = ({
  userId,
  curriculamData: tableData,
  mappingId,
  setShowModal,
  curriculamName,
  curriculumId,
  status,
  comments,
}) => {
  console.log("view Curriculum component:", tableData);
  const navigate = useNavigate();
  const commentRef = useRef("");
  const columns = useMemo(
    () => [
      columnHelper.accessor("sessionId", {
        header: "Session Number",
        cell: (info) => <Typography>{info.getValue()}</Typography>,
        width: 140,
      }),
      columnHelper.accessor("topicName", {
        header: "Topic",
        cell: (info) => <Typography>{info.getValue()}</Typography>,
        width: 250,
      }),
      columnHelper.accessor("subtopicName", {
        header: "Sub Topic",
        cell: (info) => <Typography>{info.getValue()}</Typography>,
        width: 250,
      }),
    ],
    []
  );

  const table = useReactTable({
    columns,
    data: tableData || [], // Ensure that it's always an array
    getCoreRowModel: getCoreRowModel(),
  });

  const blackDropClick = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  const onModalClick = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);

  const editHandler = () => {
    navigate(`/create-course-curriculum?e=${curriculumId}`);
  };

  const saveAsDraft = async () => {
    const res = await updateCurriculamUtil(
      userId,
      curriculamName,
      tableData,
      mappingId,
      curriculumId,
      "draft"
    );

    if (res.data) alert("successfully saved your data as draft");
    else alert("something went wrong please try again");

    setShowModal(false);
  };

  const sendCommentForRevert = async () => {
    const res = await updateCurriculamUtil(
      userId,
      curriculamName,
      tableData,
      mappingId,
      curriculumId,
      "revert",
      commentRef.current
    );

    if (res.data) alert("successfully sent request to admin");
    else alert("something went wrong please try again");

    setShowModal(false);
  };

  const handleCommentChange = (e) => {
    commentRef.current = e.target.value;
  };

  const sendForApproval = async () => {
    const res = await updateCurriculamUtil(
      userId,
      curriculamName,
      tableData,
      mappingId,
      curriculumId,
      "pending"
    );

    if (res.data) alert("successfully sent your data to admin");
    else alert("something went wrong please try again");

    setShowModal(false);
  };

  return (
    <>
      <div
        className="fixed z-50 top-0 left-0 flex items-center justify-center w-full h-screen p-4"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // light black with 50% opacity
        }}
        onClick={blackDropClick}
      >
        <div
          className="bg-white p-8 rounded-xl shadow-xl w-[1000px]"
          onClick={onModalClick}
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h6" className="font-bold text-gray-800">
              {curriculamName}
            </Typography>
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
            sx={{ overflowX: "auto", maxHeight: 400 }}
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
                {table.getRowModel().rows.length > 0 &&
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(30, 64, 175, 0.05)",
                        },
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

          <div className="flex justify-between mt-4 w-full">
            {status === "rejected" && comments && (
              <p className="max-h-[100px] min-w-[500px] text-sm font-semibold overflow-x-auto bg-gray-200 rounded px-2 py-2 me-2 minimize-scroll-width overflow-y-auto">
                {comments}
              </p>
            )}

            {status === "revert" && (
              <p className="text-sm whitespace-nowrap font-semibold w-[400px]">
                awaiting for admin to confirmation.
              </p>
            )}

            {status === "approved" && (
              <p className="text-sm font-semibold whitespace-nowrap w-[400px]">
                curriculum approved.
              </p>
            )}

            <div className="w-full">
              {status === "pending" && (
                <div className="mt-4">
                  <textarea
                    onChange={handleCommentChange}
                    placeholder="Add a comment"
                    rows={3}
                    className="border border-gray-300 w-full px-3 py-2 rounded-lg text-gray-800 bg-gray-50 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              )}

              <div className="w-full h-30 my-4 flex items-center justify-end flex-wrap gap-y-2 gap-x-4">
                {status === "pending" && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={sendCommentForRevert}
                    className="w-[260px] h-10 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
                  >
                    Send comment for revert
                  </Button>
                )}

                {(status === "draft" || status === "rejected") && (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={editHandler}
                      className="w-[240px] h-10 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
                    >
                      Edit This Curriculum
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={sendForApproval}
                      className="w-[200px] h-10 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
                    >
                      Send For Approval
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapState = (state) => ({
  userId: JSON.parse(localStorage.getItem("auth")).userId,
});

const mapDispatch = {};

const CurriculumView = connect(mapState, mapDispatch)(CurriculumViewComponent);

export default memo(CurriculumView);
