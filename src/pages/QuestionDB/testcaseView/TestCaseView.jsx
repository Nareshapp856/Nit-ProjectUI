import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";

import AddNew from "../../../ui/QuestionDB/testView/AddNew";
import ImportBulk from "../../../ui/QuestionDB/testView/ImportBulk";
import EditProgram from "../../../ui/QuestionDB/testView/EditTestCase";
import Filter from "../../../components/QuestionDB/testcasesView/Filter";
import { t_fetchTechnologyDispatch } from "../../../store/types";
import { getTestcasesByProgram } from "../../../store/QuestionDB/root.actions";
import ProgramManager from "../../../components/QuestionDB/testcasesView/ProgramManager";
import TableContainer from "../../../components/QuestionDB/testcasesView/gridview/TableContainer";

function TestCaseViewComponent({
  getTestcasesByProgramDispatch,
  fetchTechnologies,
  //
  technologyData,
}) {
  // Query Params
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const modId = queryParams.get("modId") || "";
  const techId = queryParams.get("techId") || "";
  const topicId = queryParams.get("topicId") || "";
  const subTopicId = queryParams.get("subtopicId") || "";

  console.log("moduleid:",modId,"techId:",techId,"topicId:",topicId,"subtopicId:",subTopicId);

  //
  const { programId } = useParams();
  const [showAddModal, setShowAddModal] = useState();
  const [showEditModal, setShowEditModal] = useState();
  const [showImportBulk, setShowImportBulk] = useState();

  const [showAddSuccess, setShowAddSuccess] = useState(false);
  const [showEditSuccess, setShowEditSuccess] = useState(false);

  // Filter
  const [selectedProgram, setSelectedProgram] = useState(programId || "");
  const [selectedTopic, setSelectedTopic] = useState(Number(topicId) || "");
  const [selectedModule, setSelectedModule] = useState(Number(modId) || "");
  const [selectedSubTopic, setSelectedSubTopic] = useState(
    Number(subTopicId) || ""
  );
  const [selectedTechnology, setSelectedTechnology] = useState(
    Number(techId) || ""
  );

  useEffect(() => {
    fetchTechnologies();
  }, [fetchTechnologies]);

  useEffect(() => {
    getTestcasesByProgramDispatch({
      technologyId: selectedTechnology,
      moduleId: selectedModule,
      topicId: selectedTopic,
      subTopicId: selectedSubTopic,
      programId: selectedProgram,
    });
  }, [getTestcasesByProgramDispatch]);

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
      {showAddModal && (
        <AddNew
          technologyData={technologyData}
          setShowAddModal={setShowAddModal}
          handleClose={handleAddModalClose}
          showAddSuccess={showAddSuccess}
          setShowAddSuccess={setShowAddSuccess}
          programDispatchData={{
            technologyId: selectedTechnology,
            moduleId: selectedModule,
            topicId: selectedTopic,
            subTopicId: selectedSubTopic,
            programId: selectedProgram,
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
          showEditSuccess={showEditSuccess}
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
                TestCase View
              </Typography>
            </div>

            <Divider />

            {/**  Filter Logic */}
            <div style={{ marginTop: "30px", marginBottom: "5px" }}>
              <Filter
                selectedTopic={selectedTopic}
                selectedModule={selectedModule}
                selectedProgram={selectedProgram}
                selectedSubTopic={selectedSubTopic}
                setSelectedTopic={setSelectedTopic}
                setSelectedModule={setSelectedModule}
                selectedTechnology={selectedTechnology}
                setSelectedProgram={setSelectedProgram}
                setSelectedSubTopic={setSelectedSubTopic}
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
                selectedProgram={selectedProgram}
                setShowAddModal={setShowAddModal}
                selectedSubTopic={selectedSubTopic}
                setShowImportBulk={setShowImportBulk}
                selectedTechnology={selectedTechnology}
              />
            </div>

            {/**  Grid View */}
            <div
              className="ag-theme-quartz"
              style={{ width: "100%", height: "500px" }}
            >
              <TableContainer
                selectedTechnology={selectedTechnology}
                selectedModule={selectedModule}
                selectedTopic={selectedTopic}
                selectedSubTopic={selectedSubTopic}
                selectedProgram={selectedProgram}
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
  technologyData: state.t_technology.data,
});

const mapDispatch = {
  fetchTechnologies: t_fetchTechnologyDispatch,
  getTestcasesByProgramDispatch: getTestcasesByProgram,
};

const TestCaseView = connect(mapState, mapDispatch)(TestCaseViewComponent);

export default TestCaseView;
