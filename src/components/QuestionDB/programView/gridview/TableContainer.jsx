import { connect } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";
import {
  deleteProgramDispatch,
  fetchProgramsDispatch,
} from "../../../../store/types";
import SuccessNotification from "../../../../ui/QuestionDB/SuccessSnackBar";
import { resetDeleteProgramSlice } from "../../../../store/slices/programView/programsSlice";
import ConfirmDelete from "../../../../ui/QuestionDB/ConfirmDelete";

function TableContainerComponent({
  selectedTopic,
  selectedModule,
  selectedSubTopic,
  selectedTechnology,
  //
  programsData,
  setShowEditModal,
  deleteProgramStatus,
  //
  fetchPrograms,
  deleteProgram,
  resetDeleteProgramDispatch,
}) {
  const navigate = useNavigate();
  const [columnDefs, setCoulmnDefs] = useState([]);
  const [programsList, setProgramsList] = useState([]);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    if (deleteProgramStatus === 204) {
      resetDeleteProgramDispatch();
      setShowDeleteSuccess(true);
    }
  }, [deleteProgramStatus]);

  useEffect(() => {
    if (
      typeof programsData === "object" &&
      programsData !== null &&
      programsData !== undefined
    ) {
      if (Object.keys(programsData).length === 0) setProgramsList([]);
      else if (Object.keys(programsData).length)
        setProgramsList(Object.values(programsData));
      else setProgramsList(programsData);
    }
    if (programsData === null || programsData === undefined)
      setProgramsList([]);
  }, [programsData, setProgramsList]);

  const onCellClicked = (e) => {
    navigate(
      `/testcase-view/${e.data.ProgramId}?techId=${
        e.data.TechnologyId || ""
      }&modId=${e.data.ModuleID || ""}&topicId=${
        e.data.TopicId || ""
      }&subtopicId=${e.data.SubtopicId || ""}`
    );
  };

  const onGridReady = () => {
    setCoulmnDefs([
      {
        headerName: "ID",
        field: "ProgramId",
        filter: true,
        floatingFilter: true,
        onCellClicked: onCellClicked,
        cellRenderer: (params) => {
          return (
            <div title={`Program ID: ${params.value}`}>{params.value}</div>
          );
        },
      },
      {
        headerName: "Program Name",
        field: "ProgramName",
        filter: true,
        floatingFilter: true,
        onCellClicked: onCellClicked,
        cellRenderer: (params) => {
          return (
            <div title={`Program Name: ${params.value}`}>{params.value}</div>
          );
        },
      },
      {
        headerName: "Program Description",
        field: "ProgramDescription",
        onCellClicked: onCellClicked,
        cellRenderer: (params) => {
          return (
            <div title={`Program Description: ${params.value}`}>
              {params.value}
            </div>
          );
        },
      },
      {
        headerName: "Constraints",
        field: "Constraints",
        onCellClicked: onCellClicked,
        cellRenderer: (params) => {
          return (
            <div title={`Constraints: ${params.value}`}>{params.value}</div>
          );
        },
      },
      {
        headerName: "Sample Input",
        field: "SampleInput",
        onCellClicked: onCellClicked,
        cellRenderer: (params) => {
          return (
            <div title={`SampleInput: ${params.value}`}>{params.value}</div>
          );
        },
      },
      {
        headerName: "Sample Output",
        field: "SampleOutput",
        onCellClicked: onCellClicked,
        cellRenderer: (params) => {
          return (
            <div title={`SampleOutput: ${params.value}`}>{params.value}</div>
          );
        },
      },
      {
        headerName: "Explanation",
        field: "Explanation",
        onCellClicked: onCellClicked,
        cellRenderer: (params) => {
          return (
            <div title={`Explanation: ${params.value}`}>{params.value}</div>
          );
        },
      },
      {
        headerName: "Languages",
        field: "Languages",
        onCellClicked: onCellClicked,
        cellRenderer: (params) => {
          return <div title={`Languages: ${params.value}`}>{params.value}</div>;
        },
      },
      {
        headerName: "Default Program",
        field: "DefaultProgram",
        onCellClicked: onCellClicked,
        cellRenderer: (params) => {
          return (
            <div title={params.value}>
              <pre>{params.value}</pre>
            </div>
          );
        },
      },
      {
        headerName: "Actions",
        width: 150,
        cellRenderer: (params) => {
          const onEdit = (e) => {
            setShowEditModal(params.data);
          };

          const onDelete = (e) => {
            setShowConfirmDelete({ programId: params.data.ProgramId });
            //deleteProgram();
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
    ]);
  };

  return (
    <>
      {/**  When user clicked on delete icon */}
      <ConfirmDelete
        open={Boolean(showConfirmDelete)}
        message="Are you sure you want to delte this program"
        handleConfirm={() => {
          deleteProgram({ programId: showConfirmDelete?.programId });
          setShowConfirmDelete(false);
          fetchPrograms({
            technologyId: selectedTechnology,
            moduleId: selectedModule,
            topicId: selectedTopic,
            subTopicId: selectedSubTopic,
          });
        }}
        handleCancel={() => {
          setShowConfirmDelete(false);
        }}
        handleClose={() => {
          setShowConfirmDelete(false);
        }}
      />

      {/**  To show successfully deleted notification */}
      <SuccessNotification
        open={showDeleteSuccess}
        handleClose={() => setShowDeleteSuccess(false)}
        message="Program deleted successfully"
      />

      {/**  Main Content */}
      <AgGridReact
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        rowData={programsList}
      />
    </>
  );
}

const mapState = (state) => ({
  programsData: state.p_programs.data,
  deleteProgramStatus: state.p_deleteProgram.status,
});

const mapDispatch = {
  fetchPrograms: fetchProgramsDispatch,
  deleteProgram: deleteProgramDispatch,
  resetDeleteProgram: resetDeleteProgramSlice,
  resetDeleteProgramDispatch: resetDeleteProgramSlice,
};

const TableContainer = connect(mapState, mapDispatch)(TableContainerComponent);

export default TableContainer;
