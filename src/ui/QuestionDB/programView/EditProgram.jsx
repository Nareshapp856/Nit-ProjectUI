import { useEffect, useState } from "react";
import {
  Button,
  Stack,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  FormControl,
  Select,
  Dialog,
  Typography,
  TextField,
  DialogActions,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TechnologySelector from "../../../components/QuestionDB/programView/filter/TechnologySelector";
import { connect } from "react-redux";
import {
  fetchProgramsDispatch,
  p_a_addProgramDispatch,
  p_a_fetchLanguagesDispatch,
  p_a_fetchModulesDispatch,
  p_a_fetchSubtopicsDispatch,
  p_a_fetchTopicsDispatch,
} from "../../../store/types";

import ModuleSelector from "../../../components/QuestionDB/programView/filter/ModuleSelector";
import TopicSelector from "../../../components/QuestionDB/programView/filter/TopicSelector";
import SubTopicSelector from "../../../components/QuestionDB/programView/filter/SubTopicSelector";
import {
  p_a_resetAddProgramSlice,
  p_a_resetModulesSlice,
  p_a_resetSubTopicsSlice,
  p_a_resetTopicsSlice,
} from "../../../store/slices/programView/addModal";
import "./scrollbar.css";

function EditProgramComponent({
  data,
  handleClose,
  languageData,
  showAddSuccess,
  setShowEditModal,
  setShowEditSuccess,
  //
  addLanguageState,
  technologyData,
  moduleData,
  topicData,
  subTopicData,
  fetchModules,
  fetchTopics,
  fetchLanguages,
  fetchSubTopics,
  fetchPrograms,
  addProgram,
  programDispatchData,
  resetModule,
  resetTopic,
  resetSubTopic,
  resetAddLangage,
  resetAddProgramState,
}) {
  // Ex:- Languages: "javascript,java"
  let defaultLanguages = data.Languages && data.Languages.split(",");

  // make user that selected items wont be <empty String> when updating in useEffect.
  const [firstUpdate, setFirstUpdate] = useState({
    module: true,
    topic: true,
    subTopic: true,
  });

  const [selectedTechnology, setSelectedTechnology] = useState(
    data.TechnologyId
  );
  const [selectedModule, setSelectedModule] = useState(data.ModuleID);
  const [selectedTopic, setSelectedTopic] = useState(data.TopicId);
  const [selectedSubTopic, setSelectedSubTopic] = useState(data.SubtopicId);
  const [programName, setProgramName] = useState(data.ProgramName);
  const [programDescription, setProgramDescription] = useState(
    data.ProgramDescription
  );
  const [languages, setLanguages] = useState([]);
  const [constraints, setConstraints] = useState(data.Constraints);
  const [sampleInput, setSampleInput] = useState(data.SampleInput);
  const [sampleOutput, setSampleOutput] = useState(data.SampleOutput);
  const [explanation, setExplanation] = useState(data.Explanation);
  const [image, setImage] = useState(data.Image);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [confirmMsg, setConfirmMsg] = useState("edit");
  const [difficultyLevel, setDifficultyLevel] = useState(
    data.DifficultyLevelId
  );

  const [nameErr, setNameErr] = useState(false);
  const [langErr, setLangErr] = useState(false);
  const [inputErr, setInputErr] = useState(false);
  const [outputErr, setOutputErr] = useState(false);
  const [consOrImgErr, setConsOrImgErr] = useState(false);
  const [explanationErr, setExplanationErr] = useState(false);
  const [descriptionErr, setDescriptionErr] = useState(false);

  useEffect(() => {
    if (Array.isArray(defaultLanguages) && languageData) {
      setLanguages(
        defaultLanguages.map(
          (language) =>
            languageData?.find((lanObj) => lanObj.Languages === language)?.Id
        )
      );
    }
  }, [languageData]);

  useEffect(() => {
    if (addLanguageState === "reslove") {
      setShowEditSuccess(true);
      resetAddProgramState();
      setShowEditModal(false);
      fetchPrograms({ ...programDispatchData });
    } else if (addLanguageState === "reject") {
      setConfirmMsg("failed to edit, retry?");
      resetAddLangage();
    }
  }, [addLanguageState]);

  useEffect(() => {
    fetchLanguages();
  }, []);

  useEffect(() => {
    if (nameErr) {
      if (programName) setNameErr(false);
    }
  }, [nameErr, programName, setNameErr]);

  useEffect(() => {
    if (descriptionErr) {
      if (programDescription) setDescriptionErr(false);
    }
  }, [descriptionErr, programDescription, setDescriptionErr]);

  useEffect(() => {
    if (langErr) {
      if (Array.isArray(languages) && languages.length > 0) {
        setLangErr(false);
      }
    }
  }, [languages, langErr, setLangErr]);

  useEffect(() => {
    if (inputErr) if (sampleInput) setInputErr(false);
  }, [inputErr, setInputErr, sampleInput]);

  useEffect(() => {
    if (outputErr) if (sampleOutput) setOutputErr(false);
  }, [outputErr, sampleOutput, setOutputErr]);

  useEffect(() => {
    if (explanationErr) if (explanation) setExplanationErr(false);
  }, [explanationErr, setExplanationErr, explanation]);

  useEffect(() => {
    if (consOrImgErr) {
      if (constraints || image) setConsOrImgErr(false);
    }
  }, [consOrImgErr, setConsOrImgErr, constraints, image]);

  const validateImageFile = (file) => {
    const validTypes = ["image/jpeg", "image/png"];
    return validTypes.includes(file.type);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.size > 10240) {
      // Check if file size exceeds 10KB
      setError("File size should be less than 10KB");
      setOpenSnackbar(true);
      setImage(null);
    } else if (!validateImageFile(file)) {
      // Check if file is a valid image type to make sure hacker didn't try to upload scripts :<
      setError("Invalid file type. Only JPEG and PNG are allowed.");
      setOpenSnackbar(true);
      setImage(null);
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Store the Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

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

  const handleSubmit = () => {
    const selectedLanguageObjects = languages.map((languageId) =>
      languageData.find((language) => language?.Id === languageId)
    );

    if (
      programName &&
      programDescription &&
      selectedLanguageObjects.length > 0 &&
      sampleInput &&
      sampleOutput &&
      explanation
    ) {
      addProgram({
        programId: data.ProgramId,
        programName,
        programDescription,
        languages: selectedLanguageObjects,
        constraints,
        sampleInput,
        sampleOutput,
        explanation,
        difficultyLevelId: difficultyLevel,
        image,
        technologyId: selectedTechnology,
        moduleId: selectedModule,
        topicId: selectedTopic,
        subTopicId: selectedSubTopic,
      });
    } else {
      if (!programName) setNameErr(true);
      if (!programDescription) setDescriptionErr(true);
      if (selectedLanguageObjects.length === 0) setLangErr(true);
      if (!sampleInput) setInputErr(true);
      if (!sampleOutput) setOutputErr(true);
      if (!explanation) setExplanationErr(true);
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
          Edit Program
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
              maxWidth: "42%",
              minWidth: "42%",
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

            <div
              style={{
                width: "100%",
                height: "300px",
                overflow: "hidden",
                border:
                  consOrImgErr && !image
                    ? "1.4px solid #ca0000"
                    : "1.4px solid #888",
                backgroundColor: "rgba(30, 41, 59, .06)",
                display: "grid",
                placeContent: "center",
                cursor: "pointer",
              }}
              onClick={() => document.getElementById("image-upload").click()}
            >
              {image ? (
                <img
                  src={image}
                  alt="Uploaded"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Button variant="contained" component="span">
                    Upload Image
                  </Button>
                  <Typography variant="body2" color="textSecondary">
                    Click to upload
                  </Typography>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </div>
          </Stack>

          <Stack
            spacing={2}
            margin={2}
            sx={{
              maxWidth: "52%",
              minWidth: "52%",
              maxHeight: "100%",
              overflowBlock: "auto",
            }}
            className="scroll"
          >
            <TextField
              id="program-name"
              label="Program Name *"
              variant="filled"
              value={programName}
              error={nameErr}
              onChange={(e) => setProgramName(e.target.value)}
            />

            <TextField
              id="program-description"
              label="Description *"
              multiline
              rows={4}
              variant="filled"
              value={programDescription}
              error={descriptionErr}
              onChange={(e) => setProgramDescription(e.target.value)}
            />
            <div className="flex justify-between">
              <FormControl sx={{ width: "60%" }}>
                <InputLabel id="languages-label">Languages *</InputLabel>
                <Select
                  variant="filled"
                  multiple
                  value={languages}
                  error={langErr}
                  onChange={(e) => setLanguages(e.target.value)}
                  input={<OutlinedInput label="languages" />}
                  renderValue={(selected) => {
                    const selectedLanguages =
                      selected.map((select) => {
                        const language = languageData?.find(
                          (lang) => lang.Id === select
                        );
                        return language ? language.Languages : select;
                      }) || [];
                    return selectedLanguages.join(", ");
                  }}
                >
                  {Array.isArray(languageData) &&
                    languageData.map((language) => (
                      <MenuItem key={language.Id} value={language.Id}>
                        <Checkbox
                          checked={languages.indexOf(language.Id) > -1}
                        />
                        <ListItemText primary={language.Languages} />
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl sx={{ width: "36%" }}>
                <Select
                  value={difficultyLevel}
                  onChange={(e) => setDifficultyLevel(e.target.value)}
                >
                  <MenuItem value={1}>Easy</MenuItem>
                  <MenuItem value={2}>Medium</MenuItem>
                  <MenuItem value={3}>Hard</MenuItem>
                </Select>
              </FormControl>
            </div>

            <TextField
              id="program-constraints"
              label="Constraints"
              multiline
              rows={1}
              variant="filled"
              value={constraints}
              error={consOrImgErr && !constraints}
              onChange={(e) => setConstraints(e.target.value)}
            />

            <div className="flex justify-between">
              <TextField
                id="program-sample-input"
                label="Sample Input *"
                multiline
                rows={4}
                variant="filled"
                value={sampleInput}
                error={inputErr}
                onChange={(e) => setSampleInput(e.target.value)}
                sx={{ maxWidth: "48%", minWidth: "48%" }}
              />
              <TextField
                id="program-sample-output"
                label="Sample Output *"
                multiline
                rows={4}
                variant="filled"
                value={sampleOutput}
                error={outputErr}
                onChange={(e) => setSampleOutput(e.target.value)}
                sx={{ maxWidth: "48%", minWidth: "48%" }}
              />
            </div>

            <TextField
              id="program-explanation"
              label="Explanation *"
              multiline
              rows={6}
              variant="filled"
              value={explanation}
              error={explanationErr}
              onChange={(e) => setExplanation(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{ margin: 2, display: "flex", flexDirection: "column" }}
        >
          {consOrImgErr && (
            <b className="text-sm text-red-800 font-bold">
              <span className="font-bold">&#8226;</span> Must add either
              Constraints or Image.
            </b>
          )}
          <Button variant="outlined" fullWidth onClick={handleSubmit}>
            {confirmMsg}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}

const mapState = (state) => ({
  moduleData: state.p_a_modules.data,
  topicData: state.p_a_topics.data,
  subTopicData: state.p_a_subtopics.data,
  languageData: state.p_a_languages.data,

  addLanguageState: state.p_a_addProgram.state,
});

const mapDispatch = {
  fetchLanguages: p_a_fetchLanguagesDispatch,
  fetchModules: p_a_fetchModulesDispatch,
  fetchTopics: p_a_fetchTopicsDispatch,
  fetchSubTopics: p_a_fetchSubtopicsDispatch,
  addProgram: p_a_addProgramDispatch,

  fetchPrograms: fetchProgramsDispatch,
  resetModule: p_a_resetModulesSlice,
  resetTopic: p_a_resetTopicsSlice,
  resetSubTopic: p_a_resetSubTopicsSlice,
  resetAddLangage: p_a_resetAddProgramSlice,
  resetAddProgramState: p_a_resetAddProgramSlice,
};

const EditProgram = connect(mapState, mapDispatch)(EditProgramComponent);

export default EditProgram;
