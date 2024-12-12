import { AgGridReact } from "ag-grid-react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";

import ConfirmDelete from "../../../../ui/QuestionDB/ConfirmDelete";
import { t_deleteTestcasesDispatch } from "../../../../store/types";
import SuccessNotification from "../../../../ui/QuestionDB/SuccessSnackBar";
import { resetDeleteTestcasesSlice } from "../../../../store/slices/testcaseVite/testcasesSlice";

import { getTestcasesByProgram } from "../../../../store/QuestionDB/root.actions";

function TableContainerComponent({
  selectedTechnology,
  selectedModule,
  selectedTopic,
  selectedSubTopic,
  selectedProgram,
  setShowEditModal,
  //
  testCasesData,
  //
  deleteTestCase,
  fetchTestCases,
  deleteTestcasesStatus,
  resetDeleteTestCasesSliceDispatch,
}) {
  const [testCasesList, setTestCasesList] = useState([]);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  console.log("selectedModule",selectedModule);

  useEffect(() => {
    if (deleteTestcasesStatus === 204) {
      resetDeleteTestCasesSliceDispatch();
      setShowDeleteSuccess(true);
    }
  }, [deleteTestcasesStatus]);

  useEffect(() => {
    if (typeof testCasesData === "object") {
      if (Object.keys(testCasesData).length === 0) setTestCasesList([]);
      else if (Array.isArray(testCasesData)) {
        setTestCasesList(testCasesData);
      } else if (!testCasesData) {
        setTestCasesList([]);
      }
    }
  }, [testCasesData, setTestCasesList]);

  return (
    <>
      {/**  When user clicked on delete icon */}
      <ConfirmDelete
        open={Boolean(showConfirmDelete)}
        message="Are you sure you want to delte this program"
        handleConfirm={() => {
          deleteTestCase({
            testCaseId: showConfirmDelete?.TestCaseId || "test2",
          });
          setShowConfirmDelete(false);
          fetchTestCases({
            technologyId: selectedTechnology,
            moduleId: selectedModule,
            topicId: selectedTopic,
            subTopicId: selectedSubTopic,
            programId: selectedProgram,
          });
        }}
        handleCancel={() => {
          setShowConfirmDelete(false);
        }}
        handleClose={() => {
          setShowConfirmDelete(false);
        }}
      />

      <SuccessNotification
        open={showDeleteSuccess}
        handleClose={() => setShowDeleteSuccess(false)}
        message="Program deleted successfully"
      />

      <AgGridReact
        columnDefs={[
          {
            header: "ID",
            field: "TestCaseId",
            flex: 1,
            filter: true,
            floatingFilter: true,
          },
          {
            header: "Program Name",
            field: "TestCaseName",
            flex: 3,
            filter: true,
            floatingFilter: true,
          },
          { header: "Sample Input", field: "SampleInputValue", flex: 2 },
          { header: "Sample Output", field: "SampleOutputValue", flex: 2 },
          {
            header: "Actions",
            field: "Actions",
            width: 100,
            flex: 1,
            cellRenderer: (params) => {
              const onEdit = () => {
                setShowEditModal(params.data);
              };
              const onDelete = () => {
                setShowConfirmDelete({ TestCaseId: params.data.TestCaseId });
              };

              return (
                <div>
                  <IconButton onClick={onEdit}>
                    <EditIcon style={{ color: "blue" }} />
                  </IconButton>

                  <IconButton onClick={onDelete}>
                    <DeleteOutlineIcon style={{ color: "Red" }} />
                  </IconButton>
                </div>
              );
            },
          },
        ]}
        rowData={testCasesList}
      />
    </>
  );
}

const mapState = (state) => ({
  testCasesData: state.p_testCasesList.response || [],
  deleteTestcasesStatus: state.t_deleteTestcases.status,
});

const mapDispatch = {
  fetchTestCases: getTestcasesByProgram,
  deleteTestCase: t_deleteTestcasesDispatch,

  resetDeleteTestCasesSliceDispatch: resetDeleteTestcasesSlice,
};

const TableContainer = connect(mapState, mapDispatch)(TableContainerComponent);

export default TableContainer;
