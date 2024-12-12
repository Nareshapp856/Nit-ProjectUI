import { React, useEffect, useState } from "react";
import { saveAs } from "file-saver";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import {
  topicsListSlice,
  selectedtechnologySlice,
  subTopicListSlice,
  modulesListSlice,
  technologiesListSliceDB,
  excelSubTopicSlice,
  deleteSubTopicSlice,
  editSubTopicSlice,
  createSubTopicSlice,
} from "../../../store/QuestionDB/root.slice";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // T
import { AgGridReact } from "ag-grid-react";

import "../../../index.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import SubTopicModal from "../../../ui/QuestionDB/SubTopicModal";
import ModalUi from "../../../ui/QuestionDB/ModalUi";
import { useNavigate, useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Modal, TextField, IconButton, Card } from "@mui/material";
import * as XLSX from "xlsx";
import axios from "axios";
import { Close, SignalCellularNullRounded } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  FormLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import SubTopicMUIModle from "../../../ui/QuestionDB/SubTopicMUIModle";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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
function Subtopics() {
  const { TopicID } = useParams();
  const navigate = useNavigate();
  var dispatch = useDispatch();
  const [items, setItems] = useState([]);
  //excel file funcitoality
  const [open, setOpen] = useState(false);
  const [openexcel, setExcelOpen] = useState(false);
  const [file, setSelectedFile] = useState(null);
  const [action, setAction] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [moduleDataTemp, setModuleDataTemp] = useState([]);
  const [topicDataTemp, setTopicDataTemp] = useState([]);
  const [isCrudPopUp, setIsCrudPopup] = useState(false);
  const [subTopicsData, setSubTopicData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState(null);
  const [topicData, setTopicData] = useState([]);
  const [technologiesList, setTechnologiesList] = useState([]);
  const [modulesList, setModulesList] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([""]);
  const [selectedTechId, setSelectedTechId] = useState("");
  const [selectedId_Query, setselectedId_Query] = useState(0);
  const [selectedModuleId_Query, setselectedModuleId_Query] = useState(0);
  const [selectedTopic_Query, setselectedTopic_Query] = useState(0);
  const [deleteditem, setdeletedItems] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState("");
  // create new topic modal
  const [showModal, setShowModal] = useState(false);
  // responsible for storing data required by the modal
  const [modalData, setModalData] = useState(false);
  const excelSubTopicsDataSelector = useSelector(
    (state) => state?.excelSubTopicReducer
  );
  const technologyDataSelector = useSelector(
    (state) => state?.technologiesListReducerDB
  );
  const moduleDataSelector = useSelector((state) => state?.modulesListReduer);
  const topicDataSelector = useSelector((state) => state?.topicsListReducer);
  const subTopicsDataSelector = useSelector(
    (state) => state?.subtopicsListReducer
  );
  const selectedTechnologySelector = useSelector(
    (state) => state?.selectedTechnologyReducer
  );
  const createSubTopicsDataSelector = useSelector(
    (state) => state?.createSubTopicReducer
  );

  const ediSubTopicsDataSelector = useSelector(
    (state) => state?.editSubTopicReducer
  );

  const deleteSubTopicsDataSelector = useSelector(
    (state) => state?.deleteSubTopicReducer
  );
  function isEmpty(value) {
    return (
      value == null || (typeof value === "string" && value.trim().length === 0)
    );
  }
  // useEffect(() => {
  //   if (subTopicsDataSelector.isSuccess === true && subTopicsDataSelector.isLoaded == true) {

  //   setSubTopicData(subTopicsDataSelector?.response);
  //   setRowData(subTopicsDataSelector?.response);
  //   }
  // }, [subTopicsDataSelector]);

  useEffect(() => {
    if (excelSubTopicsDataSelector?.response !== "") {
      if (
        excelSubTopicsDataSelector?.isSuccess === true &&
        excelSubTopicsDataSelector?.isLoaded == true
      ) {
        //alert('entered..');
        const worksheet = XLSX.utils.json_to_sheet(
          excelSubTopicsDataSelector?.response
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

        saveAs(blob, "SubTopicdata.xlsx");
        // dispatch(exceltopi.actions.reset());
        //  dispatch(subTopicListSlice.actions.request())
        //setTopicData(topicDataSelector.response);
        // setTopicDataTemp(topicDataSelector.response);
        dispatch(subTopicListSlice.actions.request());
        // setTopicData(topicDataSelector.response);
        dispatch(excelSubTopicSlice.actions.reset());
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
  }, [excelSubTopicsDataSelector]);

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
        //  alert('entered true')
        technologyDataSelector.response?.forEach((x) => {
          // alert('enter1')
          setselectedModuleId_Query(
            selectedTechnologySelector?.response?.moduleid
          );
          setselectedTopic_Query(selectedTechnologySelector?.response?.topicid);
          //alert(selectedTechnologySelector?.response?.technologyid);
          if (
            x.TechnologyID ===
            selectedTechnologySelector?.response?.technologyid
          ) {
            // alert(x.TechnologyID);
            setSelectedTechId(x?.TechnologyName);
            setselectedId_Query(x.TechnologyID);
            //setSelectedModuleId();
            // dispatch(modulesListSlice.actions.request())
            //setSelectedId(x.TechnologyID);
          }
        });
      } else {
        //alert('entered false')
        //setModulesList([]);
        //setTopicData([])
        setSelectedTechId("");
        setselectedId_Query(0);
      }
    }
  }, [technologyDataSelector]);

  useEffect(() => {
    if (
      topicDataSelector.isSuccess === true &&
      topicDataSelector.isLoaded === true
    ) {
      setTopicDataTemp(topicDataSelector.response);
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
        setSelectedTopicId("");
        setselectedTopic_Query(0);
      }
    }
  }, [topicDataSelector]);

  useEffect(() => {
    if (
      subTopicsDataSelector.isSuccess === true &&
      subTopicsDataSelector.isLoaded === true
    ) {
      if (
        selectedTechnologySelector?.response?.topicid !== "" &&
        selectedTechnologySelector?.response?.topicid !== undefined
      ) {
        var filteredResult = subTopicsDataSelector?.response?.filter(
          (x) => x.TopicID === selectedTechnologySelector?.response?.topicid
        );
        setSubTopicData(filteredResult);
        setRowData(filteredResult);
      } else {
        setSubTopicData(subTopicsDataSelector?.response);
        setRowData(subTopicsDataSelector?.response);
      }
    }
  }, [subTopicsDataSelector]);

  function technology_selectchange(technologyid) {
    if (technologyid !== 0) {
      setSelectedModuleId("");
      setSelectedTopicId("");
      var moduleFilters = moduleDataSelector.response.filter(
        (x) => x.TechnologyID === technologyid
      );
      setModulesList(moduleFilters);
      setTopicData([]);

      // setSelectedModuleId('');
    } else {
      //setTopicData(topicDataSelector.response);
      //setRowData(topicDataSelector.response);
      //setModulesList([]);
      // setModulesList(moduleDataSelector.response);
      // setTopicData(topicDataSelector.response);
      // setSubTopicData(subTopicsDataSelector.response);
      // setRowData(subTopicsDataSelector.response);
      // setSelectedModuleId(0);
      // setSelectedTopicId(0);
    }
  }

  useEffect(() => {
    if (
      ediSubTopicsDataSelector.isSuccess === true &&
      ediSubTopicsDataSelector.isLoaded == true
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
      dispatch(editSubTopicSlice.actions.reset());
      dispatch(subTopicListSlice.actions.request());
    }
  }, [ediSubTopicsDataSelector]);
  useEffect(() => {
    if (
      createSubTopicsDataSelector.isSuccess === true &&
      createSubTopicsDataSelector.isLoaded == true
    ) {
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
      dispatch(createSubTopicSlice.actions.reset());
      dispatch(subTopicListSlice.actions.request());
    }
  }, [createSubTopicsDataSelector]);
  useEffect(() => {
    if (
      deleteSubTopicsDataSelector.isSuccess === true &&
      deleteSubTopicsDataSelector.isLoaded == true
    ) {
      dispatch(deleteSubTopicSlice.actions.reset());
      dispatch(subTopicListSlice.actions.request());
    }
  }, [deleteSubTopicsDataSelector]);

  // const subTopicFetchHanlder = async () => {
  //   const res = await axios.get(
  //     `https://www.nareshit.net/fetchSubTopics/${TopicID}`
  //   );
  //   setModalData(res.data);
  // };

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
        setModalData(moduleDataSelector?.response);
      }
    }
    //  }

    // if (selectedTechnologySelector?.response?.technologyid !== 0) {
    //   var filteredList = [];
    //   setModuleDataTemp(moduleDataSelector.response);
    //   moduleDataSelector.response.map((x) => {
    //     if (x.TechnologyID === selectedTechnologySelector?.response?.technologyid
    //     ) {
    //      // alert(selectedModuleId_Query)
    //       if (x.ModuleID === selectedTechnologySelector?.response?.moduleid) {
    //        // setselectedTopic_Query(selectedTechnologySelector?.response?.topicid);
    //         //alert(x?.ModuleName)
    //         setselectedModuleId_Query(x?.ModuleID);
    //         setSelectedModuleId(x?.ModuleName);

    //       }
    //       filteredList.push(x);
    //     }

    //   })
    //   setModulesList(filteredList);
    //  // module_selectchange(selectedModuleId_Query);
    // }
    // else {
    //   setModulesList(moduleDataSelector.response)
    // }
  }, [moduleDataSelector]);

  useEffect(() => {
    dispatch(excelSubTopicSlice.actions.reset());
    //dispatch(sel.actions.request())
    dispatch(technologiesListSliceDB.actions.request());
    dispatch(modulesListSlice.actions.request());
    dispatch(topicsListSlice.actions.request());

    //setTechnologiesList(technologyDataSelector.response);
    //setSelectedTechnologies(selectedTechnologySelector.response);
    //setSelectedTechId(selectedTechnologySelector.response?.technologyid);
    dispatch(subTopicListSlice.actions.request());
    //dispatch(modulesListSlice.actions.request())
    // // dispatch(modulesListSlice.actions.request(selectedTechnologySelector.response?.technologyid))
    // if (selectedTechnologySelector.response?.technologyid != '' && selectedTechnologySelector.response?.moduleid != '') {
    //   setSelectedModuleId(selectedTechnologySelector.response?.moduleid);
    //   dispatch(modulesListSlice.actions.request(selectedTechnologySelector.response?.technologyid))

    // }

    // subTopicFetchHanlder();
  }, []);

  // useEffect(() => {
  //   setModulesList(moduleDataSelector.response)
  //   setSelectedModuleId(moduleDataSelector.response[0]?.ModuleID);
  //    dispatch(modulesListSlice.actions.request(selectedTechId))
  //   setModulesList(moduleDataSelector.response)
  //   setSelectedModuleId(moduleDataSelector.response[0]?.ModuleID);

  // }, [moduleDataSelector.response]);
  // useEffect(() => {
  //   dispatch(topicsListSlice.actions.request())
  //   setTopicData([]);
  //   setTopicData(topicDataSelector.response);
  //   setSelectedTopicId(0);
  //   // setSelectedTopicId(topicDataSelector.response[0]?.TopicID)
  //   //sett(moduleDataSelector.response)
  //   //setSelectedModuleId(moduleDataSelector.response[0]?.ModuleID);

  // }, [moduleDataSelector.response]);

  const cellClickHandler = async (e) => {
    if (e.colDef.field !== "Action") {
      dispatch(
        selectedtechnologySlice.actions.request({
          technologyid: e.data.TechnologyID,
          moduleid: e.data.ModuleID,
          topicid: e.data.TopicID,
          subtopicid: e.data.SubTopicID,
        })
      );
      navigate(`/question-view/${e.data.SubTopicID}`);
    }
  };

  // Delete Option from the Table
  const handleDelete = (rowData) => {
    setDeleteRow(rowData);
    setOpen(true);
  };

  // Edit Option from the Table
  const handleEdit = (rowData) => {
    setModalData(rowData);
    // setIsCrudPopup()
    // setShowModal({ type: "edit", from: "subTopic" });
  };

  const onGridReady = (params) => {
    let arr = [];
    Object.keys(subTopicsData)?.forEach((item, i) => {
      let obj = {
        SubTopicID: subTopicsDataSelector.response[item].SubTopicID,
        TechnologyID: subTopicsDataSelector.response[item].TechnologyID,
        ModuleID: subTopicsDataSelector.response[item].ModuleID,
        TopicID: subTopicsDataSelector.response[item].TopicID,
        SubTopicName: subTopicsDataSelector.response[item].SubTopicName,
        QuestionsCount: subTopicsDataSelector.response[item].QuestionsCount,
      };
      arr.push(obj);
    });
    setColumnDefs([
      // {
      //   field: "SubTopicID",
      //   headerName: "SubTopicID",
      //   width: 300,
      //   // fontfamily:'',
      //   checkboxSelection: false,
      //   headerCheckboxSelection: false,
      //   cellStyle: () => {
      //     return {
      //       fontfamily: "Roboto",
      //       fontSize: "14px",
      //       color: "#636363",
      //       fontStyle: "normal",
      //     };
      //   },
      // },
      {
        field: "SubTopicName",
        headerName: "SubTopicName",
        width: 300,
        // fontfamily:'',
        checkboxSelection: false,
        headerCheckboxSelection: false,
        filter: true,
        floatingFilter: true,
        cellStyle: () => {
          return {
            fontfamily: "Roboto",
            fontSize: "14px",
            color: "#636363",
            fontStyle: "normal",
          };
        },
      },
      {
        field: "QuestionsCount",
        headerName: "QuestionsCount",
        width: 200,
        // fontfamily:'',
        checkboxSelection: false,
        headerCheckboxSelection: false,
        filter: true,
        floatingFilter: true,
        cellStyle: () => {
          return {
            fontfamily: "Roboto",
            fontSize: "14px",
            color: "#636363",
            fontStyle: "normal",
          };
        },
      },
      {
        field: "Action",
        width: 100,
        headerName: "Action",
        //  fontfamily:'',
        checkboxSelection: false,
        headerCheckboxSelection: false,
        cellStyle: () => {
          return {
            fontfamily: "Roboto",
            fontSize: "14px",
            color: "#636363",
            fontStyle: "normal",
          };
        },
        cellRenderer: (parames) => {
          const { data } = parames;

          return (
            <div>
              <DeleteOutlineIcon
                style={{ color: "Red" }}
                onClick={() => handleDelete(data)}
              ></DeleteOutlineIcon>{" "}
              <EditIcon
                style={{ color: "blue" }}
                onClick={() => {
                  setAction("edit");
                  setIsCrudPopup(true);
                  handleEdit(data);
                }}
              ></EditIcon>
            </div>
          );
        },
      },
    ]);
    setRowData(arr);
  };
  const subTopicFetchHandler = async () => {
    //  dispatch(subTopicListSlice.actions.request(selectedTopicId));
    // const res = await axios.get(
    //   `https://www.naresh\it.net/fetchModules/${selectedTechId}`
    // );
    // setTopicData([]);
  };

  // Column Definitions: Defines & controls grid columns.
  // const [colDefs, setColDefs] = useState([
  //   { field: 'ModuleName' },
  //   { field: 'ModuleID' },
  //   { field: 'TechnologyID' },
  //   { field: 'CreatedBy' }
  // ]);

  // Called from SubTopicModal
  function subTopicModalSubmitHandler(id, topicName, subTopicName) {}
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

  const onAddSubmit = (topicobj) => {
    if (action === "edit") {
      dispatch(editSubTopicSlice.actions.request(topicobj));
    } else {
      dispatch(createSubTopicSlice.actions.request(topicobj));
    }

    setIsCrudPopup(false);
  };
  function module_selectchange(moduleId) {
    if (moduleId !== 0) {
      var topicFilters = topicDataSelector.response.filter(
        (x) => x.ModuleID === moduleId
      );
      setTopicData(topicFilters);
      //setRowData(topicFilters);
    } else {
      setTopicData(topicDataSelector.response);
      // setRowData(topicDataSelector.response);
    }
  }
  function topic_selectchange(topicId) {
    if (subTopicsDataSelector.response !== null) {
      if (topicId !== "0") {
        var subtopicFilters = subTopicsDataSelector.response.filter(
          (x) => x.TopicID === topicId
        );
        setSubTopicData(subtopicFilters);
        setRowData(subtopicFilters);
      } else {
        setSubTopicData(subTopicsDataSelector.response);
        setRowData(subTopicsDataSelector.response);
      }
    }
  }
  const getFilterValues = () => {
    //alert(selectedId_Query);
    var selectedFilter = {
      technologyid: selectedId_Query,
      moduleid: selectedModuleId_Query,
      topicid: selectedTopic_Query,
    };
    return selectedFilter;
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        {isCrudPopUp && (
          <SubTopicMUIModle
            flag={action}
            editRow={modalData}
            technologyData={technologiesList}
            ModuleData={moduleDataTemp}
            TopicData={topicDataTemp}
            addClick={onAddSubmit}
            popupclose={(value) => {
              setIsCrudPopup(value);
            }}
            selectedFilters={getFilterValues()}
          ></SubTopicMUIModle>

          // <SubTopicMUIModle
          //   flag={action}
          //   editRow={modalData}
          //   technologyData={technologyDataSelector.response}
          //   ModuleData={moduleDataSelector.response}
          //   TopicData={topicDataSelector.response}
          //   addClick={onAddSubmit}
          //   popupclose={(value) => { setIsCrudPopup(value) }}
          //   selectedFilters={getFilterValues()}
          // ></SubTopicMUIModle>

          // <SubTopicHandler
          //   flag={showModal}
          //   modalData={modalData}
          //   modalSubmitHandler={subTopicModalSubmitHandler}
          //   modalCancelHandler={setShowModal}
          // />
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
                Sub Topics
              </Typography>
            </div>
            <Divider />
            <div style={{ marginTop: "30px", marginBottom: "5px" }}>
              <Grid container spacing={1} marginTop={2} marginBottom={2}>
                <Grid justifyContent="left" alignItems="left">
                  <FormControl sx={{ m: 1, minWidth: 220 }}>
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
                          setSelectedTechId("");
                          setselectedId_Query(0);
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
                    {/* <h1>Technologies</h1> */}
                    {/* <Select

                    onChange={(e)=>{

                       setSelectedTechId(e.target.value);
                       technology_selectchange(e.target.value)
                     }}
                    fullWidth
                    value={selectedTechId }
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    <MenuItem value={0}>
                      <em>None</em>
                    </MenuItem>
                    {technologiesList?.map((rec) => {
                    return <MenuItem   value={rec.TechnologyID}>{rec.TechnologyName}</MenuItem>;
                  })}
                  </Select> */}
                  </FormControl>
                  <FormControl sx={{ m: 0.5, minWidth: 220 }}>
                    {/* <h1>Modules</h1> */}
                    {/* <Select
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
                  </FormControl>
                  <FormControl
                    sx={{
                      width: 200,
                      marginLeft: "10px",
                    }}
                  >
                    {/* <FormLabel>Topics</FormLabel> */}
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={topicData?.map((rec) => {
                        return { label: rec.TopicName, id: rec.TopicID };
                      })}
                      value={selectedTopicId}
                      onChange={(event, value) => {
                        if (value !== null) {
                          setselectedTopic_Query(value.id);
                          setSelectedTopicId(value.label);
                          topic_selectchange(value.id);
                        } else {
                          setSelectedTopicId("");
                          setselectedTopic_Query(0);
                          setSubTopicData(subTopicsDataSelector.response);
                          setRowData(subTopicsDataSelector.response);
                        }
                      }}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Topic" />
                      )}
                    />

                    {/* <Select
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
                </Grid>
                {/* <Grid justifyContent="left" alignItems="left" margin={4} >
                  <Button variant="contained" startIcon={<SearchIcon />}
                    onClick={() => subTopicFetchHandler()}>
                    Search
                  </Button>
                </Grid> */}
              </Grid>
              <Button
                onClick={() => {
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
                <IconButton component="label">
                  {/* <FileUploadOutlined />
            <input
              styles={{display:"none"}}
              type="file"
              hidden
              onChange={(e) => {
                const file = e.target.files[0];
                readExcel(file);
              }}

            /> */}
                </IconButton>
              </Button>
            </div>
            {subTopicsDataSelector?.response?.length > 0 ? (
              <AgGridReact
                rowData={rowData}
                onGridReady={onGridReady}
                columnDefs={columnDefs}
                onCellClicked={cellClickHandler}
              />
            ) : (
              <div>No Reocrds Found</div>
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
              <Typography>
                {deleteRow?.QuestionsCount > 0
                  ? "This Subtopic is part of a Questions. To delete this Subtopic, please delete the associated Questions first."
                  : "Are you sure you want to delete?"}
              </Typography>
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
                    subTopicID: deleteRow.SubTopicID,
                  };

                  dispatch(deleteSubTopicSlice.actions.request(iteminner));
                  handleClose();
                }}
                disabled={deleteRow?.QuestionsCount > 0}
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
                    Import SubTopic{" "}
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
                      };
                      itemstemp.push(iteminner);
                    });
                    dispatch(excelSubTopicSlice.actions.request(itemstemp));
                    setItems([]);
                    setExcelOpen(false);
                    window.location.reload();
                  }}
                >
                  Import Bulk
                </Button>

                <a
                  style={{ marginLeft: "5px", color: "blue" }}
                  href="/SubTopics_Template.xlsx"
                  download={"SubTopics_Template.xlsx"}
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

export default Subtopics;

function SubTopicHandler({
  modalData,
  flag,
  modalSubmitHandler,
  modalCancelHandler,
}) {
  return (
    <ModalUi
      ModalParam={SubTopicModal}
      modalData={modalData}
      flag={flag}
      modalSubmitHandler={modalSubmitHandler}
      modalCancelHandler={modalCancelHandler}
    />
  );
}
