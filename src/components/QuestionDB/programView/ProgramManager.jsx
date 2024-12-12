import { connect } from "react-redux";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getProgramsByTechnologies } from "../../../store/QuestionDB/root.actions";
import { fetchProgramsDispatch } from "../../../store/types";

// Main component
function ProgramManagerComponent({
  setShowAddModal,
  setShowImportBulk,
  fetchPrograms,
  selectedTopic,
  selectedModule,
  selectedSubTopic,
  selectedTechnology,
}) {
  const fetchHandler = () => {
    fetchPrograms({
      technologyId: selectedTechnology,
      moduleId: selectedModule,
      topicId: selectedTopic,
      subTopicId: selectedSubTopic,
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
          Fetch Programs
        </Button>
      </div>
    </>
  );
}

const mapState = () => ({});

const mapDispatch = {
  fetchPrograms: fetchProgramsDispatch,
};

// Connecting the component to the Redux store
const ProgramManager = connect(mapState, mapDispatch)(ProgramManagerComponent);

export default ProgramManager;
