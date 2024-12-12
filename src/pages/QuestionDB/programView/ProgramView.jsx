import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box, Divider, Typography } from "@mui/material";

import AddNew from "../../../ui/QuestionDB/programView/AddNew";
import ImportBulk from "../../../ui/QuestionDB/programView/ImportBulk";
import Filter from "../../../components/QuestionDB/programView/Filter";
import TableContainer from "../../../components/QuestionDB/programView/gridview/TableContainer";
import ProgramManager from "../../../components/QuestionDB/programView/ProgramManager";
import EditProgram from "../../../ui/QuestionDB/programView/EditProgram";
import {
  fetchProgramsDispatch,
  fetchTechnologyDispatch,
} from "../../../store/types";
import SuccessNotification from "../../../ui/QuestionDB/SuccessSnackBar";

function ProgramViewComponent({
  fetchTechnologies,
  fetchPrograms,
  //
  technologyData,
}) {
  const [showAddModal, setShowAddModal] = useState();
  const [showEditModal, setShowEditModal] = useState();
  const [showImportBulk, setShowImportBulk] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState();

  // Filter
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedSubTopic, setSelectedSubTopic] = useState("");
  const [selectedTechnology, setSelectedTechnology] = useState("");

  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [showEditSuccess, setShowEditSuccess] = useState(false);

  useEffect(() => {
    console.log("fetch technologies");
    fetchTechnologies();
  }, [fetchTechnologies]);

  useEffect(() => {
    console.log("fetch programs from pages");
    fetchPrograms({
      technologyId: selectedTechnology,
      moduleId: selectedModule,
      topicId: selectedTopic,
      subTopicId: selectedSubTopic,
    });
  }, []);

  const handleAddModalClose = () => {
    setShowAddModal(false);
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleImportBulkClose = () => {
    setShowImportBulk(false);
  };

  return (
    <>
      <SuccessNotification
        open={showAddSuccess}
        handleClose={() => setShowAddSuccess(false)}
        message="program added successfully"
      />

      <SuccessNotification
        open={showEditSuccess}
        handleClose={() => setShowEditSuccess(false)}
        message="program Edit successfully"
      />

      {showAddModal && (
        <AddNew
          technologyData={technologyData}
          setShowAddModal={setShowAddModal}
          handleClose={handleAddModalClose}
          showAddSuccess={showAddSuccess}
          setShowAddSuccess={setShowAddSuccess}
          // To make user programDispatch will dispatch selectors from root component
          programDispatchData={{
            technologyId: selectedTechnology,
            moduleId: selectedModule,
            topicId: selectedTopic,
            subTopicId: selectedSubTopic,
          }}
        />
      )}

      {showImportBulk && (
        <ImportBulk
          setShowImportBulk={setShowImportBulk}
          handleClose={handleImportBulkClose}
        />
      )}

      {showEditModal && (
        <EditProgram
          data={showEditModal}
          technologyData={technologyData}
          handleClose={handleEditModalClose}
          setShowEditModal={setShowEditModal}
          setShowEditSuccess={setShowEditSuccess}
        />
      )}

      <Box sx={{ display: "flex" }}>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
          style={{ margin: "5px", paddingTop: "0px" }}
        >
          <div
            className="ag-theme-quartz"
            style={{ width: "100%", height: "500px", margin: "10px" }}
          >
            {/**  Title */}
            <div style={{ marginBottom: "5px" }}>
              <Typography variant="h5" gutterBottom>
                Program View
              </Typography>
            </div>

            <Divider />

            {/**  Filter Logic */}
            <div style={{ marginTop: "30px", marginBottom: "5px" }}>
              <Filter
                selectedTopic={selectedTopic}
                setSelectedTopic={setSelectedTopic}
                selectedModule={selectedModule}
                setSelectedModule={setSelectedModule}
                selectedSubTopic={selectedSubTopic}
                setSelectedSubTopic={setSelectedSubTopic}
                selectedTechnology={selectedTechnology}
                setSelectedTechnology={setSelectedTechnology}
              />
            </div>

            {/**  Add New, Import Bulk, Fetch */}
            <div
              style={{
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <ProgramManager
                selectedTopic={selectedTopic}
                selectedModule={selectedModule}
                selectedSubTopic={selectedSubTopic}
                selectedTechnology={selectedTechnology}
                setShowAddModal={setShowAddModal}
                setShowImportBulk={setShowImportBulk}
              />
            </div>

            {/**  Grid View */}
            <div
              className="ag-theme-quartz"
              style={{ width: "100%", height: "500px" }}
            >
              <TableContainer
                selectedTopic={selectedTopic}
                selectedModule={selectedModule}
                selectedSubTopic={selectedSubTopic}
                selectedTechnology={selectedTechnology}
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
              />
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}

const mapState = (state) => ({
  technologyData: state.p_technology.data,
});

const mapDispatch = {
  fetchPrograms: fetchProgramsDispatch,
  fetchTechnologies: fetchTechnologyDispatch,
};

const ProgramView = connect(mapState, mapDispatch)(ProgramViewComponent);

export default ProgramView;
