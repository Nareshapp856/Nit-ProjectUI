import { React, useEffect, useState } from "react";
import Sidenav from "../../../components/Sidenav";
import Box from "@mui/material/Box";
import { saveAs } from "file-saver";
import { useSelector, useDispatch } from "../../../redux/hooks.helper";
import {
  technologiesListSlice,
  modulesListSlice,
  subTopicListSlice,
  topicsListSlice,
  questionListSlice,
  excelQuestionSlice,
  createQuestionlice,
  editQuestionSlice,
  deleteQuestionSlice,
  editQuestionFormDataSlice,
  createQuestionFormDataSlice,
} from "../../../redux/root.slice";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // T
import { AgGridReact } from "ag-grid-react";
import "../../../index.css";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import { Modal } from "@mui/material";
import ModalUi from "../../../ui/ModalUi";
import axios from "axios";
import QuestionViewMuiModel from "../../../ui/QuestionViewMuiModel";
import { useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { Close } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Autocomplete from "@mui/material/Autocomplete";
import * as XLSX from "xlsx";
import {
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  FormLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { TextField, IconButton, Card } from "@mui/material";
import ModuleName from "../module/ModuleName";
// to get selected question data

function getQuestionData(questionID, arr) {
  return arr.find((ele) => ele.QuestionID == questionID);
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
function QuestionView() {
  var dispatch = useDispatch();
  const { SubTopicID } = useParams();
  const [moduleData, setModuleData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [deleteRow, setDeleteRow] = useState(null);
  const [items, setItems] = useState([]);
  const [modulesList, setModulesList] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [selectedTechId, setSelectedTechId] = useState("");
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState("");
  const [selectedSubTopicId, setSelectedSubTopicId] = useState("");

  const [selectedId_Query, setselectedId_Query] = useState(0);
  const [selectedModuleId_Query, setselectedModuleId_Query] = useState(0);
  const [selectedTopic_Query, setselectedTopic_Query] = useState(0);
  const [selectedSubTopic_Query, setselectedSubTopic_Query] = useState(0);
  const [deleteditem, setdeletedItems] = useState(false);
  const [technologiesList, setTechnologiesList] = useState([]);
  const [topicData, setTopicData] = useState([]);
  const [subTopicsData, setSubTopicData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openexcel, setExcelOpen] = useState(false);
  const [file, setSelectedFile] = useState(null);
  const [action, setAction] = useState(null);
  const [isCrudPopUp, setIsCrudPopup] = useState(false);
  const [editRow, setEditRow] = useState(null);

  const [moduleDataTemp, setModuleDataTemp] = useState([]);
  const [topicDataTemp, setTopicDataTemp] = useState([]);
  const [subTtopicDataTemp, setSubTopicDataTemp] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const subTopicFetchHandler = async () => {
    dispatch(subTopicListSlice.actions.request(selectedTopicId));
    // const res = await axios.get(
    //   `https://www.naresh\it.net/fetchModules/${selectedTechId}`
    // );
    // setTopicData([]);
  };
  const excelSQuestionViewDataSelector = useSelector(
    (state) => state?.excelQuestionReducer
  );
  const technologyDataSelector = useSelector(
    (state) => state?.technologiesListReducer
  );
  const moduleDataSelector = useSelector((state) => state?.modulesListReduer);
  const topicDataSelector = useSelector((state) => state?.topicsListReducer);

  const selectedTechnologySelector = useSelector(
    (state) => state?.selectedTechnologyReducer
  );
  const subTopicsDataSelector = useSelector(
    (state) => state?.subtopicsListReducer
  );
  const questionDataSelector = useSelector(
    (state) => state?.QuestionListReducer
  );

  const questionCreateDataSelector = useSelector(
    (state) => state?.createQuestionReducer
  );
  const questionEDitDataSelector = useSelector(
    (state) => state?.editQuestionReducer
  );
  const questionDeleteDataSelector = useSelector(
    (state) => state?.deleteQuestionReducer
  );
  const questionexcelQuestionDataSelector = useSelector(
    (state) => state?.excelQuestionReducer
  );
  const createQuestionFormDatareducer = useSelector(
    (state) => state?.createQuestionFormDataReducer
  );
  const editquestionFormDataReducer = useSelector(
    (state) => state?.editQuestionFormDataReducer
  );

  function isEmpty(value) {
    return (
      value == null || (typeof value === "string" && value.trim().length === 0)
    );
  }
  useEffect(() => {
    if (excelSQuestionViewDataSelector?.response !== "") {
      if (
        excelSQuestionViewDataSelector?.isSuccess === true &&
        excelSQuestionViewDataSelector?.isLoaded == true
      ) {
        //alert('entered..');
        const worksheet = XLSX.utils.json_to_sheet(
          excelSQuestionViewDataSelector?.response
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Buffer to store the generated Excel file
        const excelBuffer = XLSX.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });
        const blob = new Blob([excelBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        });

        saveAs(blob, "questiondata.xlsx");
        // dispatch(exceltopi.actions.reset());
        //  dispatch(subTopicListSlice.actions.request())
        //setTopicData(topicDataSelector.response);
        // setTopicDataTemp(topicDataSelector.response);
        //  dispatch(excelSubTopicSlice.actions.reset())
        toast.success("Updated Successfully", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  }, [excelSQuestionViewDataSelector]);

  useEffect(() => {
    setModalData(questionDataSelector.response);
  }, [questionDataSelector]);

  useEffect(() => {
    if (
      technologyDataSelector.isSuccess === true &&
      technologyDataSelector.isLoaded == true
    ) {
      setTechnologiesList(technologyDataSelector?.response);

      if (
        selectedTechnologySelector?.response?.technologyid !== "" &&
        selectedTechnologySelector?.response?.technologyid !== undefined
      ) {
        var filteredResult = technologyDataSelector?.response?.filter(
          (x) =>
            x.TechnologyID ===
            selectedTechnologySelector?.response?.technologyid
        );
        //  setSubTopicData(filteredResult);
        //alert'mmmmm');
        setselectedId_Query(filteredResult[0]?.TechnologyID);
        setSelectedTechId(filteredResult[0]?.TechnologyName);
      }
    }
  }, [technologyDataSelector]);

  useEffect(() => {
    // alert(selectedTechnologySelector?.response?.topicid);
    if (
      subTopicsDataSelector.isSuccess === true &&
      subTopicsDataSelector.isLoaded == true
    ) {
      setSubTopicDataTemp(subTopicsDataSelector?.response);
      if (
        selectedTechnologySelector?.response?.topicid !== "" &&
        selectedTechnologySelector?.response?.topicid !== undefined
      ) {
        var filteredResult = subTopicsDataSelector?.response?.filter(
          (x) => x.TopicID === selectedTechnologySelector?.response?.topicid
        );

        setSelectedSubTopicId(filteredResult[0]?.SubTopicName);
        setselectedSubTopic_Query(filteredResult[0]?.SubTopicID);
        setSubTopicData(filteredResult);

        //subTopic_selectchange(filteredResult[0]?.SubTopicID);
      } else {
        //setTopicData([]);
      }
    }
  }, [subTopicsDataSelector]);

  useEffect(() => {
    if (
      questionDataSelector.isSuccess === true &&
      questionDataSelector.isLoaded == true
    ) {
      //alert(selectedTechnologySelector?.response?.subtopicid );
      if (
        selectedTechnologySelector?.response?.subtopicid !== "" &&
        selectedTechnologySelector?.response?.subtopicid !== undefined
      ) {
        var filteredResult = questionDataSelector?.response?.filter(
          (x) =>
            x.SubTopicID === selectedTechnologySelector?.response?.subtopicid
        );
        setModalData(filteredResult);
        setRowData(filteredResult);
        //setSelectedSubTopicId(filteredResult[0]?.SubTopicName);
        // setselectedTopic_Query(filteredResult[0]?.TopicID);
        //subTopic_selectchange(filteredResult[0]?.SubTopicID);
      } else {
        setModalData(questionDataSelector.response);
        setRowData(questionDataSelector.response);
      }
    }
  }, [questionDataSelector]);

  useEffect(() => {
    if (
      topicDataSelector.isSuccess === true &&
      topicDataSelector.isLoaded == true
    ) {
      setTopicDataTemp(topicDataSelector?.response);
      if (
        selectedTechnologySelector?.response?.moduleid !== "" &&
        selectedTechnologySelector?.response?.moduleid !== undefined
      ) {
        var filteredResult = topicDataSelector?.response?.filter(
          (x) => x.ModuleID === selectedTechnologySelector?.response?.moduleid
        );
        setTopicData(filteredResult);
        setSelectedTopicId(filteredResult[0]?.TopicName);
        setselectedTopic_Query(filteredResult[0]?.TopicID);
        // topic_selectchange(filteredResult[0]?.TopicID);
      } else {
        setTopicData(topicDataSelector?.response);
      }
    }
  }, [topicDataSelector]);

  useEffect(() => {
    //alert(selectedId_Query);
    if (
      moduleDataSelector.isSuccess === true &&
      moduleDataSelector.isLoaded == true
    ) {
      setModuleDataTemp(moduleDataSelector?.response);
      if (
        selectedTechnologySelector?.response?.technologyid !== "" &&
        selectedTechnologySelector?.response?.technologyid !== undefined
      ) {
        var filteredResult = moduleDataSelector?.response?.filter(
          (x) =>
            x.TechnologyID ===
            selectedTechnologySelector?.response?.technologyid
        );

        setselectedModuleId_Query(filteredResult[0]?.ModuleID);
        setSelectedModuleId(filteredResult[0]?.ModuleName);
        setModulesList(filteredResult);
      } else {
        setModulesList(moduleDataSelector?.response);
      }
    }
  }, [moduleDataSelector]);

  function technology_selectchange(technologyid) {
    if (technologyid !== 0) {
      //setSelectedModuleId(0);
      var moduleFilters = moduleDataSelector.response.filter(
        (x) => x.TechnologyID === technologyid
      );
      setModulesList(moduleFilters);
      setSelectedModuleId("");
      setSelectedTopicId("");
      setSelectedSubTopicId("");
      setselectedModuleId_Query(0);
      setselectedSubTopic_Query(0);
      setselectedTopic_Query(0);
      setTopicData([]);
      setSubTopicData([]);
    } else {
      setModulesList([]);
      setTopicData([]);
      setSubTopicData([]);
      setModalData([]);
      //setRowData(subTopicsDataSelector.response);
      setSelectedModuleId("");
      setSelectedTopicId("");
      setSelectedSubTopicId("");
    }
  }

  useEffect(() => {
    // dispatch(excelQuestionSlice.actions.reset());
    // dispatch(createQuestionlice.actions.reset());
    // dispatch(editQuestionSlice.actions.reset());
    // dispatch(deleteQuestionSlice.actions.reset());

    dispatch(technologiesListSlice.actions.request());
    dispatch(modulesListSlice.actions.request());
    dispatch(topicsListSlice.actions.request());
    dispatch(subTopicListSlice.actions.request());
    dispatch(questionListSlice.actions.request());
  }, []);

  // useEffect(() => {
  //   // async function fetchHandler() {
  //   //   axios
  //   //     .get("https://www.nareshit.net/mcqCheckQuestions")
  //   //     .then((res) => res.data)
  //   //     .then((data) => data.slice(0, 100))
  //   //     .then((data) => {
  //   //       setModuleData(data);
  //   //     });
  //   // }

  // //  fetchHandler();

  // setModuleData(questionDataSelector.reponse);
  // }, [questionDataSelector]);

  // useEffect(() => {
  //   if (questionDataSelector.isSuccess === true && questionDataSelector.isLoaded == true) {

  //    // setModalData(questionDataSelector.response);
  //     setRowData(questionDataSelector.response);

  //   }
  // }, [questionDataSelector]);

  useEffect(() => {
    if (
      createQuestionFormDatareducer.isSuccess === true &&
      createQuestionFormDatareducer.isLoaded == true
    ) {
      //dispatch(createQuestionlice.actions.reset());

      toast.success("Created Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      dispatch(createQuestionFormDataSlice.actions.reset());
      dispatch(questionListSlice.actions.request());
      // setModalData(questionDataSelector.response);
      // setRowData(questionDataSelector.response);
    }
  }, [createQuestionFormDatareducer]);

  useEffect(() => {
    if (
      questionexcelQuestionDataSelector.isSuccess === true &&
      questionexcelQuestionDataSelector.isLoaded == true
    ) {
      dispatch(excelQuestionSlice.actions.reset());
      toast.success("Updated Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      dispatch(questionListSlice.actions.request());

      // setModalData(questionDataSelector.response);
      // setRowData(questionDataSelector.response);
    }
  }, [questionexcelQuestionDataSelector]);

  useEffect(() => {
    if (
      questionDeleteDataSelector.isSuccess === true &&
      questionDeleteDataSelector.isLoaded == true
    ) {
      dispatch(deleteQuestionSlice.actions.reset());

      dispatch(questionListSlice.actions.request());

      // setModalData(questionDataSelector.response);
      // setRowData(questionDataSelector.response);
    }
  }, [questionDeleteDataSelector]);

  useEffect(() => {
    if (
      editquestionFormDataReducer.isSuccess === true &&
      editquestionFormDataReducer.isLoaded == true
    ) {
      toast.success("Updated Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      dispatch(editQuestionFormDataSlice.actions.reset());
      dispatch(questionListSlice.actions.request());
      // setModalData(questionDataSelector.response);
      // setRowData(questionDataSelector.response);
    }
  }, [editquestionFormDataReducer]);

  // useEffect(() => {
  //   if (modalData.length > 0) {
  //     setRowData(
  //       modalData.map((item) => ({
  //         QuestionID: item.QuestionID,
  //         SubTopicID: item.SubTopicID,
  //         Question: item.Question,
  //       }))
  //     );
  //   }
  // }, [moduleData]);
  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };
  const handleCellClick = (e) => {
    if (e?.colDef?.headerName !== "Action") {
      if (!showModal) {
        const selectedQuestion = getQuestionData(e.data.QuestionID, moduleData);

        rowData.question = selectedQuestion;
        rowData.type = "view";

        setModalData(rowData);
        setShowModal({ type: "view", from: "technologies" });
      }
    }
  };

  const handleDelete = (rowData) => {
    setDeleteRow(rowData);
    setOpen(true);
  };
  function module_selectchange(moduleId) {
    if (moduleId !== 0) {
      setSelectedTopicId("");
      var topicFilters = topicDataSelector.response.filter(
        (x) => x.ModuleID === moduleId
      );
      setTopicData(topicFilters);

      setSelectedSubTopicId("");

      setSubTopicData([]);
      //setRowData(topicFilters);
    } else {
      setTopicData([]);
      setSubTopicData([]);
      setModalData(questionDataSelector.response);
      //setRowData(subTopicsDataSelector.response);

      setSelectedTopicId("");
      setSelectedSubTopicId("");
      //setRowData(topicDataSelector.response);
    }
    // setSelectedTopicId('');
  }

  function subTopic_selectchange(subtopicID) {
    if (subtopicID !== "0") {
      var filtereQuestionnaire = questionDataSelector.response.filter(
        (x) => x.SubTopicID === subtopicID
      );
      setModalData(filtereQuestionnaire);
      setRowData(filtereQuestionnaire);
    } else {
      setModalData(questionDataSelector.response);
      setRowData(questionDataSelector.response);
    }
  }

  function topic_selectchange(topicId) {
    if (topicId !== "0") {
      setSelectedSubTopicId("");
      var subtopicFilters = subTopicsDataSelector.response.filter(
        (x) => x.TopicID === topicId
      );
      setSubTopicData(subtopicFilters);

      // setRowData(subtopicFilters);
    } else {
      setSubTopicData([]);
      setModalData(questionDataSelector.response);
      //setRowData(subTopicsDataSelector.response);

      setSelectedSubTopicId("");
      //etRowData(subTopicsDataSelector.response);
    }
    // setSelectedSubTopicId(0);
  }
  const handleEdit = (rowData) => {
    // const selectedQuestion = getQuestionData(rowData.QuestionID, moduleData);

    // rowData.question = selectedQuestion;
    // rowData.type = "edit";
    setEditRow(rowData);
    //setModalData(rowData);
    //setShowModal({ type: "edit", from: "technologies" });
  };

  const onGridReady = (params) => {
    let arr = [];
    Object.keys(modalData)?.forEach((item, i) => {
      let obj = {
        // "Description":moduleData[item].Description,
        SubTopicID: modalData[item].SubTopicID,

        // Description: topicData[item].Description,
        TechnologyID: modalData[item].TechnologyID,
        ModuleID: modalData[item].ModuleID,

        QuestionID: modalData[item].QuestionID,
        Question: modalData[item].Question,
        TopicID: modalData[item].TopicID,
        OptionA: modalData[item].OptionA,
        OptionB: modalData[item].OptionB,
        OptionC: modalData[item].OptionC,
        OptionD: modalData[item].OptionD,
        OptionE: modalData[item].OptionE,
        DifficultyLevelID: modalData[item].DifficultyLevelID,
        CorrectAnswer: modalData[item].CorrectAnswer,
      };
      arr.push(obj);
    });
    setColumnDefs([
      {
        field: "QuestionID",
        headerName: "QuestionID",
        width: 300,
        checkboxSelection: false,
        headerCheckboxSelection: false,
        cellStyle: {
          fontfamily: "Roboto",
          fontSize: "14px",
          color: "#636363",
          fontStyle: "normal",
        },
      },
      // {
      //   field: "SubTopicID",
      //   headerName: "SubTopicID",
      //   width: 500,
      //   checkboxSelection: false,
      //   headerCheckboxSelection: false,
      //   cellStyle: {
      //     fontfamily: "Roboto",
      //     fontSize: "14px",
      //     color: "#636363",
      //     fontStyle: "normal",
      //   },
      // },
      {
        field: "Question",
        headerName: "Question",
        width: 300,
        checkboxSelection: false,
        headerCheckboxSelection: false,
        cellStyle: {
          fontfamily: "Roboto",
          fontSize: "14px",
          color: "#636363",
          fontStyle: "normal",
        },
      },
      {
        field: "Action",
        headerName: "Action",
        width: 100,
        checkboxSelection: false,
        headerCheckboxSelection: false,
        cellStyle: {
          fontfamily: "Roboto",
          fontSize: "14px",
          color: "#636363",
          fontStyle: "normal",
        },
        cellRenderer: (parames) => {
          const { data } = parames;

          return (
            <div>
              <DeleteOutlineIcon
                style={{ color: "Red" }}
                onClick={() => handleDelete(data)}
              />
              <EditIcon
                style={{ color: "blue" }}
                onClick={(e) => {
                  setAction("edit");
                  setIsCrudPopup(true);
                  handleEdit(data);
                }}
              />
            </div>
          );
        },
      },
    ]);

    setRowData(arr);
  };

  function questionModalSubmitHandler(questionData) {
    setShowModal(false);
    setModalData({});
  }

  function questionModalcancelHandler() {
    setShowModal(false);
    setModalData({});
  }

  const onAddSubmit = (formData) => {
    if (action === "edit") {
      dispatch(editQuestionFormDataSlice.actions.request(formData));
    } else {
      dispatch(createQuestionFormDataSlice.actions.request(formData));
    }

    setIsCrudPopup(false);
  };
  const getFilterValues = () => {
    //alert(selectedId_Query);
    var selectedFilter = {
      technologyid: selectedId_Query,
      moduleid: selectedModuleId_Query,
      topicid: selectedTopic_Query,
      subtopicid: selectedSubTopic_Query,
    };
    return selectedFilter;
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidenav></Sidenav>
        {isCrudPopUp && (
          <QuestionViewMuiModel
            flag={action}
            editRow={editRow}
            technologyData={technologiesList}
            ModuleData={moduleDataTemp}
            TopicData={topicDataTemp}
            subTopicData={subTtopicDataTemp}
            addClick={onAddSubmit}
            popupclose={(value) => {
              setIsCrudPopup(value);
            }}
            selectedFilters={getFilterValues()}
          />
        )}
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3 }}
          style={{ margin: "5px", paddingTop: "0px" }}
        >
          <div
            className="ag-theme-quartz"
            style={{ width: "100%", height: "500px", margin: "10px" }}
          >
            <div style={{ marginBottom: "5px" }}>
              <Typography variant="h5" gutterBottom>
                Question View
              </Typography>
            </div>
            <Divider />

            <div style={{ marginTop: "30px", marginBottom: "5px" }}>
              <Grid container spacing={1} marginTop={2} marginBottom={2}>
                <Grid justifyContent="left" alignItems="left">
                  <FormControl
                  // sx={{
                  //   width: 200
                  // }}
                  >
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={technologiesList?.map((rec) => {
                        return {
                          label: rec.TechnologyName,
                          id: rec.TechnologyID,
                        };
                      })}
                      value={selectedTechId}
                      onChange={(event, value) => {
                        if (value !== null) {
                          setSelectedTechId(value.label);
                          setselectedId_Query(value.id);
                          technology_selectchange(value.id);
                        } else {
                          setselectedId_Query(0);
                          setSelectedTechId("");
                        }

                        // if (value === null) {

                        //   setSelectedTechId('');
                        //   setSelectedId(0);
                        //   setModuleData(moduleDataTemp);
                        //   setRowData(moduleDataTemp);
                        //   // dispatch(selectedtechnologySlice.actions.request(...selectedTechnologies,{ technologyid: 0 }))
                        //   dispatch(selectedtechnologySlice.actions.request({ technologyid: 0, moduleid: selectedTechnologies.moduleid, topicid: selectedTechnologies.topicid, subtopicid: selectedTechnologies.subtopicid }))

                        // }
                        // else {
                        //   setSelectedId(value.id);
                        //   setSelectedTechId(value.label);
                        //   filterData(value.id);
                        //   dispatch(selectedtechnologySlice.actions.request({ technologyid: value.id, moduleid: selectedTechnologies.moduleid, topicid: selectedTechnologies.topicid, subtopicid: selectedTechnologies.subtopicid }))
                        //   // dispatch(selectedtechnologySlice.actions.request(...selectedTechnologies,{ technologyid: value.id }))

                        // }
                      }}
                      // onChange={(event, value) => {
                      //    if (value?.props.value != "All") {
                      //      setSelectedTechId(value?.props.value);
                      //      filterData(value?.props.value);
                      //    }
                      //    else {

                      //      setSelectedTechId("All");

                      //      setModuleData(moduleDataTemp);
                      //      setRowData(moduleDataTemp);
                      //     //  dispatch(modulesListSlice.actions.request())
                      //     //  setModuleData(modulesDataSelector.response);
                      //    }
                      //  }

                      //  }
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Technology" />
                      )}
                    />
                    {/* <FormLabel>Technologies</FormLabel> */}
                    {/* <Select

                      onChange={(e) => {
                    
                        setSelectedTechId(e.target.value);
                        technology_selectchange(e.target.value)
                      }}
                      fullWidth
                      value={selectedTechId}
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value={0}>
                        <em>None</em>
                      </MenuItem>
                      {technologyDataSelector?.response?.map((rec) => {
                        return <MenuItem value={rec.TechnologyID}>{rec.TechnologyName}</MenuItem>;
                      })}
                    </Select> */}
                  </FormControl>
                  <FormControl
                  // sx={{
                  //   width: 200,
                  //   marginLeft: '10px'
                  // }}
                  >
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={modulesList?.map((rec) => {
                        return { label: rec.ModuleName, id: rec.ModuleID };
                      })}
                      value={selectedModuleId}
                      onChange={(event, value) => {
                        if (value !== null) {
                          setSelectedModuleId(value.label);
                          setselectedModuleId_Query(value.id);
                          module_selectchange(value.id);
                        } else {
                          setSelectedModuleId("");
                          setselectedModuleId_Query(0);
                        }
                      }}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label="modules" />
                      )}
                    />
                    {/* <FormLabel>Modules</FormLabel>
                    <Select
                      disabled={selectedTechId === 0}
                      value={selectedModuleId}
                      onChange={(e) => {
                        setSelectedModuleId(e.target.value);
                        module_selectchange(e.target.value);

                      }}
                      // onChange={onChangeModule}
                      fullWidth

                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem value="0">
                        <em>None</em>
                      </MenuItem>
                      {modulesList?.map((rec) => {
                        return <MenuItem value={rec.ModuleID}>{rec.ModuleName}</MenuItem>;
                      })}
                    </Select> */}
                  </FormControl>
                  <FormControl
                  // sx={{
                  //   width: 200,
                  //   marginLeft: '10px'
                  // }}
                  >
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={topicData?.map((rec) => {
                        return { label: rec.TopicName, id: rec.TopicID };
                      })}
                      value={selectedTopicId}
                      onChange={(event, value) => {
                        if (value !== null) {
                          setSelectedTopicId(value.label);
                          setselectedTopic_Query(value.id);
                          topic_selectchange(value.id);
                        } else {
                          //(0)
                          setSelectedTopicId("");
                          setselectedTopic_Query(0);
                          //setSubTopicData(subTopicsDataSelector.response)
                          //setRowData(subTopicsDataSelector.response);
                        }
                      }}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Topic" />
                      )}
                    />
                    {/* <FormLabel>Topics</FormLabel>
                    <Select
                      labelId="simple-select-label"
                      onChange={(e) => {
                        setSelectedTopicId(e.target.value);
                        topic_selectchange(e.target.value);
                      }}
                      value={selectedTopicId}
                      disabled={selectedModuleId === 0}
                      display
                    >
                      <MenuItem value="0">
                        <em>None</em>
                      </MenuItem>
                      {topicData?.map((rec) => {
                        return <MenuItem value={rec.TopicID}>{rec.TopicName}</MenuItem>;
                      })}



                    </Select> */}
                  </FormControl>
                  <FormControl
                  // sx={{
                  //   width: 200,
                  //   marginLeft: '10px'
                  // }}
                  >
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={subTopicsData?.map((rec) => {
                        return { label: rec.SubTopicName, id: rec.SubTopicID };
                      })}
                      value={selectedSubTopicId}
                      onChange={(event, value) => {
                        if (value !== null) {
                          setSelectedSubTopicId(value.label);
                          setselectedSubTopic_Query(value.id);
                          subTopic_selectchange(value.id);
                        } else {
                          // alert('vvvvv')
                          setSelectedSubTopicId("");
                          setselectedSubTopic_Query(0);
                          setModalData(questionDataSelector.response);
                          setRowData(questionDataSelector.response);
                        }
                      }}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Sub Topic" />
                      )}
                    />
                    {/* <FormLabel>Sub Topic</FormLabel> */}
                    {/* <Select
                      labelId="simple-select-label"
                      onChange={(e) => {
                        setSelectedSubTopicId(e.target.value);
                        subTopic_selectchange(e.target.value);
                      }}
                      value={selectedSubTopicId}
                      disabled={selectedTopicId === 0}
                      display
                    >
                      <MenuItem value="0">
                        <em>None</em>
                      </MenuItem>
                      {subTopicsData?.map((rec) => {
                        return <MenuItem value={rec.SubTopicID}>{rec.SubTopicName}</MenuItem>;
                      })}



                    </Select> */}
                  </FormControl>
                </Grid>
                {/* <Grid justifyContent="left" alignItems="left" margin={4} >
                  <Button variant="contained" startIcon={<SearchIcon />}
                    onClick={() => subTopicFetchHandler()}>
                    Search
                  </Button>
                </Grid> */}
              </Grid>

              {/* Create New Technology */}
              <Button
                onClick={() => {
                  setAction("");
                  setAction("new");

                  setIsCrudPopup(true);
                  setShowModal({ type: "create", from: "topic" });
                }}
                variant="outlined"
                startIcon={<AddIcon />}
              >
                New
              </Button>
              <Button
                variant="contained"
                style={{ marginLeft: 10 }}
                onClick={() => {
                  setExcelOpen(true);
                }}
              >
                Create Bulk
                <IconButton component="label"></IconButton>
              </Button>
            </div>
            {modalData.length > 0 ? (
              <AgGridReact
                rowData={rowData}
                onGridReady={onGridReady}
                columnDefs={columnDefs}
                onCellClicked={handleCellClick}
              />
            ) : (
              <div>No Records Found</div>
            )}
          </div>

          <Dialog open={open} maxWidth="sm" fullWidth>
            <DialogTitle>Confirm Delete</DialogTitle>
            <Box position="absolute" top={0} right={0}>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Box>
            <DialogContent>
              <Typography>Are you sure want to delete.</Typography>
            </DialogContent>
            <DialogActions>
              <Button color="primary" variant="contained" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  var iteminner = {
                    questionID: deleteRow.QuestionID,
                    query: 3,
                  };

                  dispatch(deleteQuestionSlice.actions.request(iteminner));
                  handleClose();
                }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <Modal
            open={openexcel}
            onClose={() => {
              setExcelOpen(false);
            }}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box
              sx={{ ...style, width: 500, height: 200, margin: 0, padding: 0 }}
            >
              <div style={{ height: "40px", backgroundColor: "#1976d2" }}>
                <div style={{ float: "left" }}>
                  <Typography
                    style={{
                      padding: "5px",
                      color: "white",
                      marginLeft: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Import MCQ Questions{" "}
                  </Typography>
                </div>
                <div
                  style={{ float: "right", padding: "5px", cursor: "pointer" }}
                >
                  <CloseIcon
                    style={{ backgroundColor: "white" }}
                    onClick={() => {
                      setExcelOpen(false);
                    }}
                  ></CloseIcon>
                </div>
              </div>
              <div style={{ margin: "10px" }}>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    readExcel(file);
                  }}
                  // onChange={(e) => {
                  //   const file = e.target.files[0];
                  //   setSelectedFile(file);
                  // }}
                />
                <Button
                  variant="contained"
                  disabled={items.length == 0}
                  onClick={() => {
                    var itemstemp = [];
                    items.map((item) => {
                      var iteminner = {
                        Technology: isEmpty(item.Technology)
                          ? ""
                          : item.Technology,
                        Module: isEmpty(item.Module) ? "" : item.Module,
                        Topic: isEmpty(item.Topic) ? "" : item.Topic,
                        SubTopic: isEmpty(item.SubTopic) ? "" : item.SubTopic,
                        QuestionDescription: isEmpty(item.QuestionDescription)
                          ? ""
                          : item.QuestionDescription,
                        OptionA: isEmpty(item.OptionA) ? "" : item.OptionA,
                        OptionB: isEmpty(item.OptionB) ? "" : item.OptionB,
                        OptionC: isEmpty(item.OptionC) ? "" : item.OptionC,
                        OptionD: isEmpty(item.OptionD) ? "" : item.OptionD,
                        OptionE: isEmpty(item.OptionE) ? "" : item.OptionE,
                        CorrectAnswer: isEmpty(item.CorrectAnswer)
                          ? ""
                          : item.CorrectAnswer,
                        DifficultyLevel: isEmpty(item.DifficultyLevel)
                          ? ""
                          : item.DifficultyLevel,
                        Description: "",
                      };
                      itemstemp.push(iteminner);
                    });
                    dispatch(excelQuestionSlice.actions.request(itemstemp));
                    setItems([]);
                    setExcelOpen(false);
                  }}
                >
                  Import Bulk
                </Button>

                <a
                  style={{ marginLeft: "5px", color: "blue" }}
                  href={
                    process.env.PUBLIC_URL + "/MCQQuestionsALL_Template.xlsx"
                  }
                  download={"MCQQuestionsALL_Template.xlsx"}
                >
                  Download Template
                </a>
              </div>
            </Box>
          </Modal>
        </Box>
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="colored"
      ></ToastContainer>
    </>
  );
}

export default QuestionView;

// function ModalHandler({
//   flag,
//   modalData,
//   modalSubmitHandler,
//   modalCancelHandler,
// }) {
//   return (
//     <ModalUi
//       flag={flag}
//       ModalParam={QuestionViewModal}
//       modalData={modalData}
//       modalSubmitHandler={modalSubmitHandler}
//       modalCancelHandler={modalCancelHandler}
//     />
//   );
// }
