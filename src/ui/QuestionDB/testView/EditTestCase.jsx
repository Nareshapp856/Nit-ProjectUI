import { useEffect, useState } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import TechnologySelector from "../../../components/QuestionDB/testcasesView/filter/TechnologySelector";
import { connect } from "react-redux";
import {
  p_a_fetchModulesDispatch,
  p_a_fetchSubtopicsDispatch,
  p_a_fetchTopicsDispatch,
  t_a_add_testcasesDispatch,
  t_a_fetchProgramsDispatch,
} from "../../../store/types";

import ModuleSelector from "../../../components/QuestionDB/programView/filter/ModuleSelector";

import TopicSelector from "../../../components/QuestionDB/programView/filter/TopicSelector";

import SubTopicSelector from "../../../components/QuestionDB/programView/filter/SubTopicSelector";
import {
  p_a_resetModulesSlice,
  p_a_resetSubTopicsSlice,
  p_a_resetTopicsSlice,
} from "../../../store/slices/programView/addModal";

import "./scrollbar.css";

import ProgramSelector from "../../../components/QuestionDB/testcasesView/filter/ProgramSelector";
import { resetProgramsSlice } from "../../../store/slices/testcaseVite/addModal/programsSlice";
import { t_a_resetTestCasesSlice } from "../../../store/slices/testcaseVite/addModal/testcaseSlice";
import { getTestcasesByProgram } from "../../../store/QuestionDB/root.actions";

function EditProgramComponent({
  data,
  programDispatchData,
  handleClose,
  technologyData,
  moduleData,
  topicData,
  subTopicData,
  setShowEditModal,
  setShowEditSuccess,
  //
  addTestcaseState,
  programsData,
  //
  fetchModules,
  fetchTopics,
  fetchSubTopics,
  fetchPrograms,
  fetchTestcases,
  addTestCase,
  //
  resetTopic,
  resetModule,
  resetSubTopic,
  resetAddTestCaseSlice,
  resetAddTestcasesState,
}) {

  // make user that selected items wont be <empty String> when updating in useEffect.
  const [firstUpdate, setFirstUpdate] = useState({
    module: true,
    topic: true,
    subTopic: true,
  });

  const [selectedTopic, setSelectedTopic] = useState(data.TopicId);
  const [selectedModule, setSelectedModule] = useState(data.ModuleID);
  const [selectedProgram, setSelectedProgram] = useState(data.ProgramId);
  const [selectedSubTopic, setSelectedSubTopic] = useState(data.SubtopicId);
  const [selectedTechnology, setSelectedTechnology] = useState(
    data.TechnologyId
  );

  const [progErr, setProgErr] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState("edit");
  const [expectedInputErr, setExpectedInputErr] = useState(false);
  const [expectedOutputErr, setExpectedOutputErr] = useState(false);

  const [name, setName] = useState(data.TestCaseName || "");
  const [input, setInput] = useState(data.SampleInputValue || "");
  const [output, setOutput] = useState(data.SampleOutputValue || "");

  useEffect(() => {
    if (progErr) if (selectedProgram) setProgErr(false);
  }, [progErr, setProgErr, selectedProgram]);

  useEffect(() => {
    if (nameError) {
      if (name) {
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
      setShowEditModal(false);
      resetAddTestcasesState();
      setShowEditSuccess(true);
      fetchPrograms({ ...programDispatchData });
      fetchTestcases({
        technologyId: selectedTechnology,
        moduleId: selectedModule,
        topicId: selectedTopic,
        subTopicId: selectedSubTopic,
        programId: selectedProgram,
      });
    } else if (addTestcaseState === "reject") {
      setConfirmMsg("failed to edit, retry?");
      resetAddTestCaseSlice();
    }
  }, [addTestcaseState]);

  const handleSubmit = () => {
    if (name && input && output && selectedProgram) {
      addTestCase({
        testcaseId: data.TestCaseId,
        testCaseName: name,
        sampleInputValue: input,
        sampleOutputValue: output,
        programId: selectedProgram,
      });
    } else {
      if (!name) setNameError(true);
      if (!input) setExpectedInputErr(true);
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
          Edit Testcase
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
              label="Testcase Name *"
              variant="filled"
              value={name}
              error={nameError}
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
                  label="Expected Input *"
                  multiline
                  rows={4}
                  variant="filled"
                  value={input}
                  error={expectedInputErr}
                  fullWidth
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <div style={{ width: "48%" }}>
                <TextField
                  id="program-expected-output"
                  label="Expected Output *"
                  multiline
                  rows={4}
                  variant="filled"
                  value={output}
                  error={expectedOutputErr}
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
  moduleData: state.p_a_modules.data,
  topicData: state.p_a_topics.data,
  subTopicData: state.p_a_subtopics.data,

  addTestcaseState: state.t_a_add_testcases.state,
});

const mapDispatch = {
  fetchTestcases: getTestcasesByProgram,
  fetchPrograms: t_a_fetchProgramsDispatch,
  fetchModules: p_a_fetchModulesDispatch,
  fetchTopics: p_a_fetchTopicsDispatch,
  fetchSubTopics: p_a_fetchSubtopicsDispatch,

  resetAddTestcasesState: t_a_resetTestCasesSlice,
  addTestCase: t_a_add_testcasesDispatch,
  resetModule: p_a_resetModulesSlice,
  resetTopic: p_a_resetTopicsSlice,
  resetAddTestCaseSlice: t_a_resetTestCasesSlice,
  resetSubTopic: p_a_resetSubTopicsSlice,
};

const EditProgram = connect(mapState, mapDispatch)(EditProgramComponent);

export default EditProgram;
