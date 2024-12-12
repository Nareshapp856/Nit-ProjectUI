import { connect } from "react-redux";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getTestcasesByProgram } from "../../../store/QuestionDB/root.actions";

// Main component
function ProgramManagerComponent({
  selectedTopic,
  selectedModule,
  setShowAddModal,
  selectedProgram,
  selectedSubTopic,
  setShowImportBulk,
  selectedTechnology,
  getTestcasesByProgramDispatch,
}) {
  const fetchHandler = () => {
    getTestcasesByProgramDispatch({
      technologyId: selectedTechnology,
      moduleId: selectedModule,
      topicId: selectedTopic,
      subTopicId: selectedSubTopic,
      programId: selectedProgram,
    });
  };

  return (
    <>
      <div
        className="flex justify-between bg-red-500"
        style={{ width: "236px" }}
      >
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          onClick={setShowAddModal}
        >
          New
        </Button>

        {/* <Button variant="contained" onClick={setShowImportBulk}>
          Create Bulk
        </Button> */}
      </div>

      <div>
        <Button variant="contained" onClick={fetchHandler}>
          Fetch Testcases
        </Button>
      </div>
    </>
  );
}

const mapState = () => ({});

const mapDispatch = {
  getTestcasesByProgramDispatch: getTestcasesByProgram,
};

// Connecting the component to the Redux store
const ProgramManager = connect(mapState, mapDispatch)(ProgramManagerComponent);

export default ProgramManager;
