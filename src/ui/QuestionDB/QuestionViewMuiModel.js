import * as React from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  TextField,
  Stack,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import { Link, json } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import pako from "pako";
import { questionImagelistslice } from "../../store/QuestionDB/root.slice";
import BooleanOption from "../../components/QuestionDB/questionView.js/BooleanOption";

import { useEffect } from "react";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const style = {
  position: "absolute",
  // top: "0%",
  // left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function QuestionViewMuiModel({
  flag,
  technologyData,
  ModuleData,
  TopicData,
  subTopicData,
  addClick,
  editRow,
  popupclose,
  selectedFilters,
}) {
  var dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const [isEdit, setIsEdit] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    popupclose(false);
    setQuestionImage();
    setOptionAImage();
    setOptionBImage();
    setOptionCImage();
    setOptionDImage();
    setOptionEImage();
  };
  const [question, setQuestion] = React.useState({
    QuestionID: "",
    Question: "",
    difficultyLevelID: 1,
    OptionA: "",
    OptionB: "",
    OptionC: "",
    OptionD: "",
    OptionE: "",

    CorrectAnswer: "",
  });
  /**
   * BooleanOption is added to add true or false questions in question-view modals
   *
   * display: weather to display true or false || Options
   * value: holds value to the true or false id
   * */
  const [optionBool, setOptionBool] = React.useState({
    display: false,
    value: 0,
  });
  const [headerTitle, setHeaderTitle] = React.useState("");
  const [technologyid, setTechnologyId] = React.useState(0);
  const [moduleId, setModuleId] = React.useState(0);
  const [topic, setTopic] = React.useState(0);
  const [subtopic, setSubTopic] = React.useState(0);
  const [topicDesc, setTopicDesc] = React.useState("");
  const [checkedAnswers, setCheckedAnswers] = React.useState([]);
  const [modulefilterData, setModuleData] = React.useState();
  const [topicfilterData, setTopicData] = React.useState();
  const [subTopicfilterData, setSubTopicData] = React.useState();

  const [questionFile, setQuestionFile] = React.useState();
  const [optionAFile, setOptionAFile] = React.useState();
  const [optionBFile, setOptionBFile] = React.useState();
  const [optionCFile, setOptionCFile] = React.useState();
  const [optionDFile, setOptionDFile] = React.useState();
  const [optionEFile, setOptionEFile] = React.useState();
  const [questionImage, setQuestionImage] = React.useState();
  const [optionAImage, setOptionAImage] = React.useState("");
  const [optionBImage, setOptionBImage] = React.useState();
  const [optionCImage, setOptionCImage] = React.useState();
  const [optionDImage, setOptionDImage] = React.useState();
  const [optionEImage, setOptionEImage] = React.useState();
  const [files, setFiles] = React.useState([]);

  const [fileBase64, setFileBase64] = React.useState("");

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    debugger;
    if (file.size > 10000) {
      window.alert("Please upload a file smaller than 10kb");
      return false;
    }

    if (file) {
      convertToBase64(file, event.target.name);
    }
  };

  // Function to convert file to Base64
  const convertToBase64 = (file, title) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      switch (title) {
        case "questionImage":
          setQuestionFile(file);
          setQuestionImage(
            reader.result
              .toString("base64")
              .replace(/^data:image\/\w+;base64,/, "")
          );
          break;
        case "optionAImage":
          setOptionAFile(file);
          setOptionAImage(
            reader.result
              .toString("base64")
              .replace(/^data:image\/\w+;base64,/, "")
          );
          break;
        case "optionBImage":
          setOptionBFile(file);
          setOptionBImage(
            reader.result
              .toString("base64")
              .replace(/^data:image\/\w+;base64,/, "")
          );
          break;
        case "optionCImage":
          setOptionCFile(file);
          setOptionCImage(
            reader.result
              .toString("base64")
              .replace(/^data:image\/\w+;base64,/, "")
          );
          break;
        case "optionDImage":
          setOptionDFile(file);
          setOptionDImage(
            reader.result
              .toString("base64")
              .replace(/^data:image\/\w+;base64,/, "")
          );
          break;
        case "optionEImage":
          setOptionEFile(file);
          setOptionEImage(
            reader.result
              .toString("base64")
              .replace(/^data:image\/\w+;base64,/, "")
          );
          break;
      }
      //      setFileBase64(reader.result.toString('base64').replace(/^data:image\/\w+;base64,/, ''));
    };
    reader.onerror = (error) => {};
  };

  const selectedTechnologySelector = useSelector(
    (state) => state?.selectedTechnologyReducer
  );
  const questionImagList = useSelector(
    (state) => state?.QuestionImageListReducer
  );

  React.useEffect(() => {
    setTechnologyId(selectedFilters?.technologyid);
    setModuleId(selectedFilters?.moduleid);
    setTopic(selectedFilters?.topicid);
    setSubTopic(selectedFilters?.subtopicid);

    // alert(selectedTechnologySelector.response?.technologyid)
    if (selectedFilters?.technologyid !== 0) {
      setTechnologyId(selectedFilters?.technologyid);
    } else {
      // alert('rrrrr')
      setTechnologyId(0);
    }

    if (selectedFilters?.technologyid !== 0) {
      var filterModuleDataa = ModuleData.filter(
        (x) => x.TechnologyID === selectedFilters?.technologyid
      );
      setModuleData(filterModuleDataa);
      // setModuleId(selectedFilters?.moduleid);
    } else {
      // alert('rrrrr')
      setModuleId(0);
    }

    if (selectedFilters?.moduleid !== 0) {
      var filterModuleDataa = TopicData.filter(
        (x) => x.ModuleID === selectedFilters?.moduleid
      );
      setTopicData(filterModuleDataa);
    } else {
      // alert('rrrrr')
      setTopic(0);
    }
    //  alert(selectedFilters?.topicid);
    if (selectedFilters?.topicid !== 0) {
      var filterModuleDataa = subTopicData.filter(
        (x) => x.TopicID === selectedFilters?.topicid
      );
      setSubTopicData(filterModuleDataa);
    } else {
      setSubTopicData(subTopicData);
      // alert('rrrrr')
      setSubTopic(0);
    }
  }, []);
  const onChangeTechnology = (event) => {
    var technologySelected = event.target.value;
    setTechnologyId(technologySelected);
    var filterModuleDataa = ModuleData.filter(
      (x) => x.TechnologyID === technologySelected
    );
    setModuleId(0);
    setTopic(0);
    setSubTopic(0);
    setModuleData(filterModuleDataa);
    setTopicData([]);
    setSubTopicData([]);
  };
  const onChangeModule = (event) => {
    var moduleSelected = event.target.value;
    setModuleId(moduleSelected);
    var filterTopicDataa = TopicData.filter(
      (x) => x.ModuleID === moduleSelected
    );
    setTopicData(filterTopicDataa);
  };
  const onChangeTopic = (event) => {
    var topicSelected = event.target.value;
    setTopic(topicSelected);
    var filterSubTopicDataa = subTopicData.filter(
      (x) => x.TopicID === topicSelected
    );
    setSubTopicData(filterSubTopicDataa);
  };

  console.log(
    isEdit === true
      ? question.CorrectAnswer?.split(",").indexOf("A") > -1
        ? true
        : false
      : null,
    question,
    question.CorrectAnswer
  );

  function hexToBase64(str) {
    return btoa(
      String.fromCharCode.apply(
        null,
        str
          .replace(/\r|\n/g, "")
          .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
          .replace(/ +$/, "")
          .split(" ")
      )
    );
  }
  const onChangeSubTopic = (event) => {
    var inputTopic = event.target.value;
    setSubTopic(inputTopic);
  };
  React.useEffect(() => {
    if (questionImagList?.response !== "") {
      if (
        questionImagList?.isSuccess === true &&
        questionImagList?.isLoaded == true
      ) {
        setQuestionImage(questionImagList.response[0].Question_Image);
        setOptionAImage(questionImagList.response[0].OptionA_Image);
        setOptionBImage(questionImagList.response[0].OptionB_Image);
        setOptionCImage(questionImagList.response[0].OptionB_Image);
        setOptionCImage(questionImagList.response[0].OptionC_Image);
        setOptionDImage(questionImagList.response[0].OptionD_Image);
        setOptionEImage(questionImagList.response[0].OptionE_Image);
      }
    }
  }, [questionImagList]);
  React.useEffect(() => {
    if (flag === "edit") {
      dispatch(questionImagelistslice.actions.request(editRow.QuestionID));
      setIsEdit(true);
      setTechnologyId(editRow.TechnologyID);
      //setTopic(editRow.TopicName);
      var filterModuleDataa = ModuleData.filter(
        (x) => x.TechnologyID === editRow.TechnologyID
      );
      setModuleData(filterModuleDataa);
      setModuleId(editRow.ModuleID);
      var filterTopicDataDataa = TopicData.filter(
        (x) => x.ModuleID === editRow.ModuleID
      );
      setTopicData(filterTopicDataDataa);
      setTopic(editRow.TopicID);
      setSubTopic(editRow.SubTopicID);
      setHeaderTitle("Edit");
      setQuestion({
        QuestionID: editRow.QuestionID,
        Question: editRow.Question,
        difficultyLevelID: editRow.DifficultyLevelID,
        OptionA: editRow.OptionA,
        OptionB: editRow.OptionB,
        OptionC: editRow.OptionC,
        OptionD: editRow.OptionD,
        OptionE: editRow.OptionE,
        CorrectAnswer: editRow.CorrectAnswer,
        //  Question_Image:editRow.Question_Image,
        //  OptionA_Image:editRow.OptionA_Image,
        //OptionB_Image:editRow.OptionB_Image,
        //OptionC_Image:editRow.OptionC_Image,
        // OptionD_Image:editRow.OptionD_Image,
      });

      setCheckedAnswers(editRow.CorrectAnswer?.split(","));
    } else {
      setIsEdit(false);
      setHeaderTitle("Create");
      // setTechnologyId(0);
      // setModuleId(0);
      // setTopic(0);
      // setSubTopic(0);
      setQuestion({
        QuestionID: "",
        Question: "",
        difficultyLevelID: 1,
        OptionA: "",
        OptionB: "",
        OptionC: "",
        OptionD: "",
        OptionE: "",
        CorrectAnswer: "",
      });
      setQuestionImage("");
      setOptionAImage("");
      setOptionBImage("");
      setOptionCImage("");
      setOptionDImage("");
      setOptionEImage("");
    }
  }, []);

  useEffect(() => {
    setQuestion((prev) => ({ ...prev, CorrectAnswer: "" }));
  }, [optionBool.display]);

  const readFileAsBinary = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const binaryData = reader.result
          .toString("base64")
          .replace(/^data:image\/\w+;base64,/, ""); //reader.result;

        resolve(binaryData);
      };

      reader.onerror = () => {
        reject(reader.error);
      };

      reader.readAsBinaryString(file);
    });
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    const selectedFiles = event.target.files;
    // Convert the FileList object to an array
    const filesArray = Array.from(selectedFiles);
    // Update the state with the selected files
    setFiles(filesArray);

    try {
      const binaryData = await readFileAsBinary(file);
      //setQuestionBinryData(binaryData);
    } catch (error) {}
  };
  const handleFileChange_Option1 = async (event) => {
    const file = event.target.files[0];

    try {
      const binaryData = await readFileAsBinary(file);
      //setOptionOneBinryData(binaryData);
    } catch (error) {}
  };
  const handleFileChange_Option2 = async (event) => {
    const file = event.target.files[0];
    const selectedFiles = event.target.files;
    // Convert the FileList object to an array
    const filesArray = Array.from(selectedFiles);
    // Update the state with the selected files
    setFiles(filesArray);
    try {
      const binaryData = await readFileAsBinary(file);
      //setOptionTwoBinryData(binaryData);
    } catch (error) {}
  };
  const handleFileChange_Option3 = async (event) => {
    const file = event.target.files[0];
    const selectedFiles = event.target.files;
    // Convert the FileList object to an array
    const filesArray = Array.from(selectedFiles);
    // Update the state with the selected files
    setFiles(filesArray);
    try {
      const binaryData = await readFileAsBinary(file);
      //setOptionThreeBinryData(binaryData);
    } catch (error) {}
  };
  const handleFileChange_Option4 = async (event) => {
    const file = event.target.files[0];
    const selectedFiles = event.target.files;
    // Convert the FileList object to an array
    const filesArray = Array.from(selectedFiles);
    // Update the state with the selected files
    setFiles(filesArray);
    try {
      const binaryData = await readFileAsBinary(file);
      //setOptionFourBinryData(binaryData);
    } catch (error) {}
  };

  // For tabs
  const handleTabChange = (event, newValue) => {
    setOptionBool((prev) => ({ ...prev, display: newValue === 0 }));
  };

  /**
   * Handles the change event for boolean option.
   *
   * @param {Object} value - The Value of the selected radio button.
   */
  const onBooleanChange = (e) => {
    setOptionBool((prev) => ({ ...prev, value: e.target.value }));

    setQuestion((prev) => ({ ...prev, CorrectAnswer: String(e.target.value) }));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Dialog fullWidth maxWidth="lg" open={open}>
        <DialogTitle>
          {headerTitle} Questionnaire
          <IconButton onClick={handleClose} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <div style={{ width: 700, verticalAlign: "center" }}>
          <DialogContent>
            {/* <Grid container spacing={2}>
  <Grid xs={10} md={12}>
    <Item>
        
    </Item>
  </Grid>
 
  </Grid> */}
            <Stack>
              <FormControl>
                <h1>Technologies</h1>
                <Select
                  value={technologyid}
                  onChange={(event) => {
                    onChangeTechnology(event);
                  }}
                  fullWidth
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value={0}>
                    <em>None</em>
                  </MenuItem>
                  {technologyData?.map((rec) => {
                    return (
                      <MenuItem value={rec.TechnologyID}>
                        {rec.TechnologyName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl>
                <h1>Modules</h1>
                <Select
                  value={moduleId}
                  onChange={(event) => {
                    onChangeModule(event);
                  }}
                  disabled={technologyid === 0}
                  // onChange={onChangeModule}
                  fullWidth
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="0">
                    <em>None</em>
                  </MenuItem>
                  {modulefilterData?.map((rec) => {
                    return (
                      <MenuItem value={rec.ModuleID}>{rec.ModuleName}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 0.5, minWidth: 100 }}>
                <h1>Topic</h1>
                <Select
                  value={topic}
                  disabled={moduleId === 0}
                  onChange={(event) => {
                    onChangeTopic(event);
                  }}
                  // onChange={onChangeModule}
                  fullWidth
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="0">
                    <em>None</em>
                  </MenuItem>
                  {topicfilterData?.map((rec) => {
                    return (
                      <MenuItem value={rec.TopicID}>{rec.TopicName}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl sx={{ m: 0.5, minWidth: 100 }}>
                <h1>SubTopic</h1>
                <Select
                  value={subtopic}
                  disabled={topic === 0}
                  onChange={(event) => {
                    setSubTopic(event.target.value);
                  }}
                  // onChange={onChangeModule}
                  fullWidth
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="0">
                    <em>None</em>
                  </MenuItem>
                  {subTopicfilterData?.map((rec) => {
                    return (
                      <MenuItem value={rec.SubTopicID}>
                        {rec.SubTopicName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl>
                <h1>Difficulty</h1>
                <Select
                  value={question.difficultyLevelID}
                  onChange={(e) => {
                    setQuestion({
                      ...question,
                      difficultyLevelID: e.target.value,
                    });
                  }}
                  fullWidth
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="1">
                    <em>1</em>
                  </MenuItem>
                  <MenuItem value="2">
                    <em>2</em>
                  </MenuItem>
                  <MenuItem value="3">
                    <em>3</em>
                  </MenuItem>
                </Select>
                {/* <select
              value={question.Difficulty}
              onChange={(e) =>
                {

                let questionobj=question;
                questionobj.Difficulty=e.target.value;
                setQuestion(questionobj);
                }
              }
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select> */}
              </FormControl>

              <FormControl sx={{ m: 0.5 }}>
                <section className="font-medium text-xl">
                  <article className="">
                    <h2 className="text-lg font-semibold mb-2 ">Question:</h2>
                    <p className="mb-4 pl-3 w-auto">
                      <TextField
                        multiline
                        rows={4}
                        color="secondary"
                        onChange={(e) => {
                          setQuestion({
                            ...question,
                            Question: e.target.value,
                          });
                        }}
                        value={question.Question}
                        fullWidth
                      />
                      <Button
                        component="label"
                        role={undefined}
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                      >
                        <VisuallyHiddenInput
                          type="file"
                          id="questionImage"
                          name="questionImage"
                          accept="image/*"
                          onChange={handleFileUpload}
                        />
                      </Button>

                      {questionImage && (
                        <img
                          style={{ maxWidth: "100%", height: "auto" }}
                          src={`data:image/png;base64,` + questionImage}
                        />
                      )}
                      {/* <textarea
            className="w-full border border-black text-[.98rem] p-1 rounded"
            placeholder="Your Question"
            value={question.Question}
            onChange={(e) =>
                {
                let questionobj=question;
                questionobj.Question=e.target.value;
                setQuestion(questionobj);
                }
            }
          /> */}
                    </p>
                  </article>

                  <div>
                    <Tabs
                      value={optionBool.display ? 0 : 1}
                      onChange={handleTabChange}
                      aria-label="boolean option tabs"
                    >
                      <Tab label="Boolean Option" />
                      <Tab label="Options List" />
                    </Tabs>

                    <Box sx={{ p: 3 }}>
                      {optionBool.display ? (
                        <div className="mt-2 pl-3 mb-2">
                          <BooleanOption
                            options={[
                              { id: 1, value: 1, label: "True" },
                              { id: 0, value: 0, label: "False" },
                            ]}
                            title="True or False:"
                            onChange={onBooleanChange}
                            defaultValue={0}
                          />
                        </div>
                      ) : (
                        <article className="mt-2">
                          <h2 className="text-lg font-semibold mb-2">
                            Options: { isEdit && `Correct Answer:${editRow.CorrectAnswer}`}
                          </h2>
                          <ul className="pl-3 text-lg">
                            <li className="flex mt-2">
                              <input
                                type="checkbox"
                                name="option"
                                disabled={question.OptionA === ""}
                                //checked={question.CorrectAnswer?.split(',').indexOf(question.OptionA)>-1?false:true}
                                // checked={question.OptionA===question.CorrectAnswer?true:false}
                                checked={
                                  isEdit === true
                                    ? question.CorrectAnswer?.split(
                                        ","
                                      ).indexOf("A") > -1
                                      ? true
                                      : false
                                    : question.CorrectAnswer === "A"
                                }
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    if (!checkedAnswers.includes("A")) {
                                      checkedAnswers.push("A");
                                  }       
                                  console.log(question);                           
                                    setQuestion({
                                      ...question,
                                      CorrectAnswer: checkedAnswers
                                        .sort()
                                        .join(","),

                                      //question.CorrectAnswer===""? question.CorrectAnswer.concat('A'):question.CorrectAnswer.concat(',','A')
                                    });

                                    setCheckedAnswers(checkedAnswers);
                                  } else {
                                    setCheckedAnswers(
                                      checkedAnswers.filter((x) => x !== "A")
                                    );
                                    setQuestion({
                                      ...question,
                                      // question.CorrectAnswer.split(',').remove('A')
                                      CorrectAnswer: checkedAnswers
                                        .filter((x) => x !== "A")
                                        .sort()
                                        .join(","),
                                      // question.CorrectAnswer.replace('A,','').replace('A','')
                                    });
                                  }
                                }}
                              />

                              <label className="ms-3 w-full">
                                <textarea
                                  className="w-full border border-black text-[.98rem] p-1 rounded"
                                  type="text"
                                  placeholder="Option A"
                                  value={question.OptionA}
                                  onChange={(e) =>
                                    setQuestion({
                                      ...question,
                                      OptionA: e.target.value,
                                    })
                                  }
                                />
                              </label>
                              <Button
                                component="label"
                                role={undefined}
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                              >
                                <VisuallyHiddenInput
                                  type="file"
                                  id="optionAImage"
                                  name="optionAImage"
                                  accept="image/*"
                                  onChange={handleFileUpload}
                                />
                              </Button>
                              {optionAImage && (
                                <img
                                  style={{ maxWidth: "100%", height: "auto" }}
                                  src={`data:image/png;base64,` + optionAImage}
                                />
                              )}
                            </li>
                            <li className="flex mt-2">
                              <input
                                type="checkbox"
                                name="option"
                                disabled={question.OptionB === ""}
                                checked={
                                  isEdit === true
                                    ? question.CorrectAnswer?.split(
                                        ","
                                      ).indexOf("B") > -1
                                      ? true
                                      : false
                                    : null
                                }
                                // checked={question.CorrectAnswer?.split(',').indexOf(question.OptionB)>-1?false:true}
                                // checked={question.OptionB===question.CorrectAnswer?true:false}
                                onChange={
                                  (e) => {
                                    if (e.target.checked) {
                                      checkedAnswers.push("B");
                                      setQuestion({
                                        ...question,
                                        CorrectAnswer: checkedAnswers
                                          .sort()
                                          .join(","),
                                      });
                                      // setQuestion({ ...question, CorrectAnswer:

                                      //     question.CorrectAnswer===""? question.CorrectAnswer.concat('B'):question.CorrectAnswer.concat(',','B')

                                      // })
                                    } else {
                                      setCheckedAnswers(
                                        checkedAnswers.filter((x) => x !== "B")
                                      );
                                      setQuestion({
                                        ...question,
                                        // question.CorrectAnswer.split(',').remove('A')
                                        CorrectAnswer: checkedAnswers
                                          .filter((x) => x !== "B")
                                          .sort()
                                          .join(","),
                                        // question.CorrectAnswer.replace('A,','').replace('A','')
                                      });

                                      // setQuestion({ ...question, CorrectAnswer:
                                      //    // question.CorrectAnswer.split(',').remove('B')
                                      //    // question.CorrectAnswer.replace('B','').trim()
                                      //    question.CorrectAnswer.replace('B,','').replace('B','')
                                      // })
                                    }
                                  }
                                  // setQuestion({ ...question, CorrectAnswer:   question.CorrectAnswer===""? question.CorrectAnswer.concat(question.OptionB):question.CorrectAnswer.concat(',',question.OptionB)})
                                  // setQuestion({ ...question, CorrectAnswer:question.CorrectAnswer+','+ question.OptionB })
                                }
                              />
                              <label className="ms-3 w-full">
                                <textarea
                                  className="w-full border border-black text-[.98rem] p-1 rounded"
                                  type="text"
                                  placeholder="Option B"
                                  value={question.OptionB}
                                  onChange={(e) =>
                                    setQuestion({
                                      ...question,
                                      OptionB: e.target.value,
                                    })
                                  }
                                />
                              </label>

                              <Button
                                component="label"
                                role={undefined}
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                              >
                                <VisuallyHiddenInput
                                  type="file"
                                  id="optionBImage"
                                  name="optionBImage"
                                  accept="image/*"
                                  onChange={handleFileUpload}
                                />
                              </Button>
                              {optionBImage && (
                                <img
                                  style={{ maxWidth: "100%", height: "auto" }}
                                  src={`data:image/png;base64,` + optionBImage}
                                />
                              )}
                            </li>
                            <li className="flex mt-2">
                              <input
                                type="checkbox"
                                disabled={question.OptionC === ""}
                                name="option"
                                checked={
                                  isEdit === true
                                    ? question.CorrectAnswer?.split(
                                        ","
                                      ).indexOf("C") > -1
                                      ? true
                                      : false
                                    : null
                                }
                                // checked= {question.CorrectAnswer?.split(',').indexOf(question.OptionC)>-1?false:true}
                                // checked={question.OptionC===question.CorrectAnswer?true:false}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    checkedAnswers.push("C");
                                    setQuestion({
                                      ...question,
                                      CorrectAnswer: checkedAnswers
                                        .sort()
                                        .join(","),

                                      //question.CorrectAnswer===""? question.CorrectAnswer.concat('A'):question.CorrectAnswer.concat(',','A')
                                    });

                                    setCheckedAnswers(checkedAnswers);
                                  } else {
                                    setCheckedAnswers(
                                      checkedAnswers.filter((x) => x !== "C")
                                    );
                                    setQuestion({
                                      ...question,
                                      // question.CorrectAnswer.split(',').remove('A')
                                      CorrectAnswer: checkedAnswers
                                        .filter((x) => x !== "C")
                                        .sort()
                                        .join(","),
                                      // question.CorrectAnswer.replace('A,','').replace('A','')
                                    });
                                  }
                                }}
                              />
                              <label className="ms-3 w-full">
                                <textarea
                                  className="w-full border border-black text-[.98rem] p-1 rounded"
                                  type="text"
                                  placeholder="Option C"
                                  value={question.OptionC}
                                  onChange={(e) =>
                                    setQuestion({
                                      ...question,
                                      OptionC: e.target.value,
                                    })
                                  }
                                />
                              </label>
                              <Button
                                component="label"
                                role={undefined}
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                              >
                                <VisuallyHiddenInput
                                  type="file"
                                  id="optionCImage"
                                  name="optionCImage"
                                  accept="image/*"
                                  onChange={handleFileUpload}
                                />
                              </Button>
                              {optionCImage && (
                                <img
                                  style={{ maxWidth: "100%", height: "auto" }}
                                  src={`data:image/png;base64,` + optionCImage}
                                />
                              )}
                            </li>
                            <li className="flex mt-2">
                              <input
                                type="checkbox"
                                name="option"
                                disabled={question.OptionD === ""}
                                // checked= {question.CorrectAnswer?.split(',').indexOf(question.OptionD)>-1?false:true}
                                // checked={question.OptionD===question.CorrectAnswer?true:false}
                                checked={
                                  isEdit === true
                                    ? question.CorrectAnswer?.split(
                                        ","
                                      ).indexOf("D") > -1
                                      ? true
                                      : false
                                    : null
                                }
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    checkedAnswers.push("D");
                                    setQuestion({
                                      ...question,
                                      CorrectAnswer: checkedAnswers
                                        .sort()
                                        .join(","),

                                      //question.CorrectAnswer===""? question.CorrectAnswer.concat('A'):question.CorrectAnswer.concat(',','A')
                                    });

                                    setCheckedAnswers(checkedAnswers);
                                  } else {
                                    setCheckedAnswers(
                                      checkedAnswers.filter((x) => x !== "D")
                                    );
                                    setQuestion({
                                      ...question,
                                      // question.CorrectAnswer.split(',').remove('A')
                                      CorrectAnswer: checkedAnswers
                                        .filter((x) => x !== "D")
                                        .sort()
                                        .join(","),
                                      // question.CorrectAnswer.replace('A,','').replace('A','')
                                    });
                                  }
                                }} // setQuestion({ ...question, CorrectAnswer:question.CorrectAnswer+','+ question.OptionD })
                                // }
                              />
                              <label className="ms-3 w-full">
                                <textarea
                                  className="w-full border border-black text-[.98rem] p-1 rounded"
                                  type="text"
                                  placeholder="Option D"
                                  value={question.OptionD}
                                  onChange={(e) =>
                                    setQuestion({
                                      ...question,
                                      OptionD: e.target.value,
                                    })
                                  }
                                />
                              </label>
                              <Button
                                component="label"
                                role={undefined}
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                              >
                                <VisuallyHiddenInput
                                  type="file"
                                  id="optionDImage"
                                  name="optionDImage"
                                  accept="image/*"
                                  onChange={handleFileUpload}
                                />
                              </Button>
                              {optionDImage && (
                                <img
                                  style={{ maxWidth: "100%", height: "auto" }}
                                  src={`data:image/png;base64,` + optionDImage}
                                />
                              )}
                            </li>
                            <li className="flex mt-2">
                              <input
                                type="checkbox"
                                name="option"
                                disabled={question.OptionE === ""}
                                // checked= {question.CorrectAnswer?.split(',').indexOf(question.OptionE)>-1?false:true}
                                // checked={question.OptionE===question.CorrectAnswer?true:false}
                                checked={
                                  isEdit === true
                                    ? question.CorrectAnswer?.split(
                                        ","
                                      ).indexOf("D") > -1
                                      ? true
                                      : false
                                    : null
                                }
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    checkedAnswers.push("E");
                                    setQuestion({
                                      ...question,
                                      CorrectAnswer: checkedAnswers
                                        .sort()
                                        .join(","),

                                      //question.CorrectAnswer===""? question.CorrectAnswer.concat('A'):question.CorrectAnswer.concat(',','A')
                                    });

                                    setCheckedAnswers(checkedAnswers);
                                  } else {
                                    setCheckedAnswers(
                                      checkedAnswers.filter((x) => x !== "E")
                                    );
                                    setQuestion({
                                      ...question,
                                      // question.CorrectAnswer.split(',').remove('A')
                                      CorrectAnswer: checkedAnswers
                                        .filter((x) => x !== "E")
                                        .sort()
                                        .join(","),
                                      // question.CorrectAnswer.replace('A,','').replace('A','')
                                    });
                                  }
                                }} // setQuestion({ ...question, CorrectAnswer:question.CorrectAnswer+','+ question.OptionE })
                                // }
                              />
                              <label className="ms-3 w-full">
                                <textarea
                                  className="w-full border border-black text-[.98rem] p-1 rounded"
                                  type="text"
                                  placeholder="Option E"
                                  value={question.OptionE}
                                  onChange={(e) =>
                                    setQuestion({
                                      ...question,
                                      OptionE: e.target.value,
                                    })
                                  }
                                />
                              </label>
                              <Button
                                component="label"
                                role={undefined}
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                              >
                                <VisuallyHiddenInput
                                  type="file"
                                  id="optionEImage"
                                  name="optionEImage"
                                  accept="image/*"
                                  onChange={handleFileUpload}
                                />
                              </Button>
                              {optionEImage && (
                                <img
                                  style={{ maxWidth: "100%", height: "auto" }}
                                  src={`data:image/png;base64,` + optionEImage}
                                />
                              )}
                            </li>
                          </ul>
                        </article>
                      )}
                    </Box>
                  </div>

                  <article className="mt-8">
                    <h2 className="text-lg font-semibold mb-2">Answer:</h2>
                    <p className="pl-3 text-lg">
                      {question.CorrectAnswer || "Select One Option"}
                    </p>
                  </article>
                </section>
              </FormControl>

              <FormControl>
                {flag !== "edit" ? (
                  <Button
                    disabled={
                      technologyid === 0 ||
                      moduleId === 0 ||
                      topic === 0 ||
                      subtopic === 0 ||
                      question.Question === "" ||
                      question.difficultyLevelID === 0 ||
                      question.CorrectAnswer === "" ||
                      optionBool.display
                        ? false
                        : question.OptionA === "" ||
                          question.OptionB === "" ||
                          question.OptionC === "" ||
                          question.OptionD === ""
                    }
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={() => {
                      const images = [];
                      const formData = new FormData();

                      if (typeof questionFile != "undefined")
                        formData.append(
                          "images",
                          questionFile,
                          "questionImage"
                        );
                      if (typeof optionAFile != "undefined")
                        formData.append("images", optionAFile, "optionAImage");
                      if (typeof optionBFile != "undefined")
                        formData.append("images", optionBFile, "optionBImage");
                      if (typeof optionCFile != "undefined")
                        formData.append("images", optionCFile, "optionCImage");
                      if (typeof optionDFile != "undefined")
                        formData.append("images", optionDFile, "optionDImage");
                      if (typeof optionEFile != "undefined")
                        formData.append("images", optionEFile, "optionEImage");

                      formData.append("SubTopicID", subtopic);
                      formData.append("QuestionID", 0);
                      formData.append("Question", question.Question);

                      if (optionBool.display) {
                        formData.append("type", "bit");
                        formData.append("bit", optionBool.value);
                      } else {
                        formData.append("type", "options");
                        formData.append("OptionA", question.OptionA);
                        formData.append("OptionB", question.OptionB);
                        formData.append("OptionC", question.OptionC);
                        formData.append("OptionD", question.OptionD);
                        formData.append("OptionE", question.OptionE);
                      }

                      formData.append("CorrectAnswer", question.CorrectAnswer);
                      formData.append(
                        "DifficultyLevelID",
                        question.difficultyLevelID
                      );
                      formData.append("Query", "1");
                      addClick(formData);
                    }}
                  >
                    Add
                  </Button>
                ) : (
                  <Button
                    disabled={
                      technologyid === 0 ||
                      moduleId === 0 ||
                      topic === 0 ||
                      subtopic === "" ||
                      question.Question === "" ||
                      question.difficultyLevelID === 0 ||
                      question.CorrectAnswer === "" ||
                      question.OptionA === "" ||
                      question.OptionB === "" ||
                      question.OptionC === "" ||
                      question.OptionD === "" ||
                      question.OptionE === ""
                    }
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={() => {
                      const images = [];
                      const formData = new FormData();
                      debugger;
                      if (typeof questionFile != "undefined") {
                        formData.append(
                          "images",
                          questionFile,
                          "questionImage"
                        );
                      }
                      if (typeof optionAFile != "undefined") {
                        formData.append("images", optionAFile, "optionAImage");
                      }

                      if (typeof optionBFile != "undefined") {
                        formData.append("images", optionBFile, "optionBImage");
                      }

                      if (typeof optionCFile != "undefined") {
                        formData.append("images", optionCFile, "optionCImage");
                      }

                      if (typeof optionDFile != "undefined") {
                        formData.append("images", optionDFile, "optionDImage");
                      }

                      if (typeof optionEFile != "undefined") {
                        formData.append("images", optionEFile, "optionEImage");
                      }

                      formData.append("SubTopicID", subtopic);
                      formData.append("QuestionID", question.QuestionID);
                      formData.append("Question", question.Question);
                      formData.append("OptionA", question.OptionA);
                      formData.append("OptionB", question.OptionB);
                      formData.append("OptionC", question.OptionC);
                      formData.append("OptionD", question.OptionD);
                      formData.append("OptionE", question.OptionE);
                      formData.append("CorrectAnswer", question.CorrectAnswer);
                      formData.append(
                        "DifficultyLevelID",
                        question.difficultyLevelID
                      );
                      formData.append("Query", "2");
                      addClick(formData);
                    }}
                  >
                    Edit
                  </Button>
                )}
              </FormControl>
            </Stack>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}

export default QuestionViewMuiModel;
