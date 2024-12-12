import { connect } from "react-redux";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Modal,
  Stack,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  FormControl,
  Select,
  Dialog,
  DialogActions,
  TextField,
} from "@mui/material";

import TechnologySelector from "../../../components/QuestionDB/testcasesView/filter/TechnologySelector";
import {
  p_a_fetchModulesDispatch,
  p_a_fetchSubtopicsDispatch,
  p_a_fetchTopicsDispatch,
  t_a_add_testcasesDispatch,
  t_a_fetchModulesDispatch,
  t_a_fetchProgramsDispatch,
  t_a_fetchSubtopicsDispatch,
  t_a_fetchTopicsDispatch,
} from "../../../store/types";

import ModuleSelector from "../../../components/QuestionDB/testcasesView/filter/ModuleSelector";

import TopicSelector from "../../../components/QuestionDB/testcasesView/filter/TopicSelector";

import SubTopicSelector from "../../../components/QuestionDB/testcasesView/filter/SubTopicSelector";
import {
  t_a_resetModulesSlice,
  t_a_resetSubTopicsSlice,
  t_a_resetTopicsSlice,
} from "../../../store/slices/testcaseVite/addModal";
import { resetProgramsSlice } from "../../../store/slices/testcaseVite/addModal/programsSlice";

import ProgramSelector from "../../../components/QuestionDB/testcasesView/filter/ProgramSelector";

import "./scrollbar.css";
import {
  t_a_add_testcasesSlice,
  t_a_resetTestCasesSlice,
} from "../../../store/slices/testcaseVite/addModal/testcaseSlice";
import { getTestcasesByProgram } from "../../../store/QuestionDB/root.actions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function AddNewComponent({
  handleClose,
  technologyData,
  setShowAddModal,
  setShowAddSuccess,
  programDispatchData,
  moduleData,
  topicData,
  subTopicData,
  programsData,
  //
  addTestcaseState,
  addTestCase,
  fetchModules,
  fetchTopics,
  fetchSubTopics,
  fetchPrograms,
  fetchTestcases,
  //
  resetAddTestcasesState,
  resetTopic,
  resetModule,
  resetSubTopic,
  resetAddTestCaseSlice,
}) {
  const [selectedProgram, setSelectedProgram] = useState(
    programDispatchData.programId || ""
  );
  const [selectedTechnology, setSelectedTechnology] = useState(
    programDispatchData.technologyId || ""
  );
  const [selectedModule, setSelectedModule] = useState(
    programDispatchData.moduleId || ""
  );
  const [selectedTopic, setSelectedTopic] = useState(
    programDispatchData.topicId || ""
  );
  const [selectedSubTopic, setSelectedSubTopic] = useState(
    programDispatchData.subTopicId || ""
  );

  const [progErr, setProgErr] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState("add");
  const [expectedInputErr, setExpectedInputErr] = useState(false);
  const [expectedOutputErr, setExpectedOutputErr] = useState(false);

  const [name, setName] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  // make user that selected items wont be <empty String> when updating in useEffect.
  const [firstUpdate, setFirstUpdate] = useState({
    module: true,
    topic: true,
    subTopic: true,
    program: true,
  });

  useEffect(() => {
    if (progErr) if (selectedProgram) setProgErr(false);
  }, [progErr, setProgErr, selectedProgram]);

  useEffect(() => {
    if (nameError) {
      if (name && name.length > 3) {
        setNameError(false);
      }
    }
  }, [nameError, name, setNameError]);

  useEffect(() => {
    if (expectedInputErr) {
      if (input) {
        setExpectedInputErr(false);
      }
    }
  }, [expectedInputErr, input, setExpectedInputErr]);

  useEffect(() => {
    if (expectedOutputErr) {
      if (output) {
        setExpectedOutputErr(false);
      }
    }
  }, [expectedOutputErr, output, setExpectedOutputErr]);

  useEffect(() => {
    fetchPrograms({
      technologyId: selectedTechnology,
      moduleId: selectedModule,
      topicId: selectedTopic,
      subTopicId: selectedSubTopic,
    });

    if (firstUpdate.program) {
      setFirstUpdate((prev) => ({ ...prev, program: false }));
    } else {
      setSelectedProgram("");
    }
  }, [selectedTechnology, selectedModule, selectedTopic, selectedSubTopic]);

  useEffect(() => {
    if (selectedTechnology) {
      fetchModules({ technologyId: selectedTechnology });
    }
  }, [selectedTechnology, fetchModules]);

  useEffect(() => {
    if (selectedModule) {
      fetchTopics({ moduleId: selectedModule });
    }
  }, [selectedModule, fetchTopics]);

  useEffect(() => {
    if (selectedTopic) {
      fetchSubTopics({ topicId: selectedTopic });
    }
  }, [selectedTopic, fetchSubTopics]);

  useEffect(() => {
    resetModule();
    if (firstUpdate.module) {
      setFirstUpdate((prev) => ({ ...prev, module: false }));
    } else {
      setSelectedModule("");
    }
  }, [selectedTechnology, resetModule]);

  useEffect(() => {
    resetTopic();
    if (firstUpdate.topic) {
      setFirstUpdate((prev) => ({ ...prev, topic: false }));
    } else {
      setSelectedTopic("");
    }
  }, [selectedModule, resetTopic]);

  useEffect(() => {
    resetSubTopic();
    if (firstUpdate.subTopic) {
      setFirstUpdate((prev) => ({ ...prev, subTopic: false }));
    } else {
      setSelectedSubTopic("");
    }
  }, [selectedTopic, resetSubTopic]);

  useEffect(() => {
    if (addTestcaseState === "reslove") {
      resetAddTestCaseSlice();
      setShowAddModal(false);
      resetAddTestcasesState();
      setShowAddSuccess(true);
      fetchPrograms({ ...programDispatchData });
      fetchTestcases({
        technologyId: selectedTechnology,
        moduleId: selectedModule,
        topicId: selectedTopic,
        subTopicId: selectedSubTopic,
        programId: selectedProgram,
      });
    } else if (addTestcaseState === "reject") {
      setConfirmMsg("failed to add, retry?");
      resetAddTestcasesState();
    }
  }, [addTestcaseState]);

  const handleSubmit = () => {
    if (name && name.length > 3 && input && output && selectedProgram) {
      addTestCase({
        testCaseName: name,
        sampleInputValue: input,
        sampleOutputValue: output,
        programId: selectedProgram,
      });
    } else {
      if (!name) setNameError(true);
      if (!input || !(name > 3)) setExpectedInputErr(true);
      if (!selectedProgram) setProgErr(true);
      if (!output) setExpectedOutputErr(true);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Dialog
        open={true}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
        sx={{ height: "100vh" }}
      >
        <DialogTitle>
          Create Testcase
          <IconButton style={{ float: "right" }} onClick={handleClose}>
            <CloseIcon color="primary" />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          className="scroll"
        >
          <Stack
            spacing={2}
            margin={2}
            sx={{
              maxWidth: "40%",
              minWidth: "40%",
              maxHeight: "100%",
              overflowBlock: "auto",
            }}
            className="scroll"
          >
            <TechnologySelector
              required
              technologyData={technologyData}
              selectedTechnology={selectedTechnology}
              setSelectedTechnology={setSelectedTechnology}
            />
            <ModuleSelector
              required
              moduleData={moduleData}
              selectedModule={selectedModule}
              setSelectedModule={setSelectedModule}
            />
            <TopicSelector
              required
              topicData={topicData}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
            />
            <SubTopicSelector
              required
              subTopicData={subTopicData}
              selectedSubTopic={selectedSubTopic}
              setSelectedSubTopic={setSelectedSubTopic}
            />
          </Stack>

          <Stack
            spacing={2.1}
            margin={2}
            sx={{
              maxWidth: "52%",
              minWidth: "52%",
              maxHeight: "100%",
              overflowBlock: "auto",
            }}
            className="scroll"
          >
            <ProgramSelector
              required
              error={progErr}
              programsData={programsData}
              selectedProgram={selectedProgram}
              setSelectedProgram={setSelectedProgram}
            />
            <TextField
              id="testcase-name"
              error={nameError}
              label={
                <span>
                  Testcase Name <span style={{ color: "#960000" }}>*</span>
                </span>
              }
              variant="filled"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "48%" }}>
                <TextField
                  id="program-expected-input"
                  label={
                    <span>
                      Expected Input <span style={{ color: "#960000" }}>*</span>
                    </span>
                  }
                  error={expectedInputErr}
                  multiline
                  rows={4}
                  variant="filled"
                  value={input}
                  fullWidth
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <div style={{ width: "48%" }}>
                <TextField
                  id="program-expected-output"
                  label={
                    <span>
                      Expected Output{" "}
                      <span style={{ color: "#960000" }}>*</span>
                    </span>
                  }
                  error={expectedOutputErr}
                  multiline
                  rows={4}
                  variant="filled"
                  value={output}
                  fullWidth
                  onChange={(e) => setOutput(e.target.value)}
                />
              </div>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ margin: 2 }}>
          <Button variant="outlined" fullWidth onClick={handleSubmit}>
            {confirmMsg}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapState = (state) => ({
  programsData: state.t_a_programs.data,
  moduleData: state.t_a_modules.data,
  topicData: state.t_a_topics.data,
  subTopicData: state.t_a_subtopics.data,

  addTestcaseState: state.t_a_add_testcases.state,
});

const mapDispatch = {
  fetchTestcases: getTestcasesByProgram,
  fetchPrograms: t_a_fetchProgramsDispatch,
  fetchModules: t_a_fetchModulesDispatch,
  fetchTopics: t_a_fetchTopicsDispatch,
  fetchSubTopics: t_a_fetchSubtopicsDispatch,

  addTestCase: t_a_add_testcasesDispatch,

  resetTopic: t_a_resetTopicsSlice,
  resetModule: t_a_resetModulesSlice,
  resetSubTopic: t_a_resetSubTopicsSlice,
  resetAddTestCaseSlice: t_a_resetTestCasesSlice,
  resetAddTestcasesState: t_a_resetTestCasesSlice,
};

const AddNew = connect(mapState, mapDispatch)(AddNewComponent);

export default AddNew;
