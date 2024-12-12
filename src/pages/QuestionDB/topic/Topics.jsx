import { React, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import {
  topicsListSlice,
  modulesListSlice,
  selectedtechnologySlice,
  createTopicSlice,
  deleteTopicSlice,
  editTopicSlice,
  excelTopicSlice,
  technologiesListSliceDB,
} from "../../../store/QuestionDB/root.slice";
import { saveAs } from "file-saver";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // T
import { AgGridReact } from "ag-grid-react";
import "../../../index.css";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Modal, TextField, IconButton, Card } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import ModalUi from "../../../ui/QuestionDB/ModalUi";
import TopicModal from "../../../ui/QuestionDB/TopicModal";
import TopicMuiModel_New from "../../../ui/QuestionDB/TopicMuiModel_New";
import { useNavigate, useParams } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import * as XLSX from "xlsx";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import {
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  FormLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid";
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
function Topics() {
  const [items, setItems] = useState([]);
  const { ModuleID } = useParams();
  const navigate = useNavigate();
  var dispatch = useDispatch();
  const [topicData, setTopicData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState(null);
  const [technologiesList, setTechnologiesList] = useState([]);
  const [modulesList, setModulesList] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([""]);
  const [selectedTechId, setSelectedTechId] = useState("");
  const [selectedId_Query, setselectedId_Query] = useState(0);
  const [selectedModuleId_Query, setselectedModuleId_Query] = useState(0);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [isCrudPopUp, setIsCrudPopup] = useState(false);
  const [crudAction, setCrudAction] = useState("");
  const [moduleDataTemp, setModuleDataTemp] = useState([]);
  const [deleteditem, setdeletedItems] = useState(false);
  //excel file funcitoality
  const [open, setOpen] = useState(false);
  const [openexcel, setExcelOpen] = useState(false);
  const [file, setSelectedFile] = useState(null);
  const [action, setAction] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function isEmpty(value) {
    return (
      value == null || (typeof value === "string" && value.trim().length === 0)
    );
  }
  const [deleteRow, setDeleteRow] = useState(null);
  const excelTopicDataSelector = useSelector(
    (state) => state?.excelTopicReducer
  );
  const technologyDataSelector = useSelector(
    (state) => state?.technologiesListReducerDB
  );
  const moduleDataSelector = useSelector((state) => state?.modulesListReduer);
  const topicDataSelector = useSelector((state) => state?.topicsListReducer);
  const createTopicDataSelector = useSelector(
    (state) => state?.createTopicReducer
  );
  const editTopicDataSelector = useSelector((state) => state?.editTopicReducer);
  const deleteTopicDataSelector = useSelector(
    (state) => state?.deleteTopicReducer
  );
  const selectedTechnologySelector = useSelector(
    (state) => state?.selectedTechnologyReducer
  );

  useEffect(() => {
    if (
      excelTopicDataSelector.isSuccess === true &&
      excelTopicDataSelector.isLoaded == true
    ) {
      const worksheet = XLSX.utils.json_to_sheet(
        excelTopicDataSelector.response
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

      saveAs(blob, "topicdata.xlsx");
      // dispatch(exceltopi.actions.reset());
      dispatch(topicsListSlice.actions.request());
      setTopicData(topicDataSelector.response);

      // setTopicDataTemp(topicDataSelector.response);
      dispatch(excelTopicSlice.actions.reset());
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
  }, [excelTopicDataSelector]);

  useEffect(() => {
    // alert(selectedTechnologySelector?.response?.technologyid);

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

        setSelectedTechId(filteredResult[0]?.TechnologyName);
        setselectedId_Query(filteredResult[0].TechnologyID);
        setselectedModuleId_Query(
          selectedTechnologySelector?.response?.moduleid
        );
        //dispatch(modulesListSlice.actions.request());

        // technologyDataSelector.response?.forEach((x) => {
        //   setselectedModuleId_Query(selectedTechnologySelector?.response?.moduleid);
        //   //alert(selectedTechnologySelector?.response?.technologyid);
        //   if (x.TechnologyID === selectedTechnologySelector?.response?.technologyid) {

        //     setSelectedTechId(x?.TechnologyName);
        //     setselectedId_Query(x.TechnologyID);
        //     //setSelectedModuleId();
        //     dispatch(modulesListSlice.actions.request())
        //     //setSelectedId(x.TechnologyID);
        //   }

        // })
      }
      // else{
      //   setSelectedTechId('');
      //   setselectedId_Query(0);
      // }
    }
  }, [technologyDataSelector]);

  useEffect(() => {
    if (
      deleteTopicDataSelector.isSuccess === true &&
      deleteTopicDataSelector.isLoaded == true
    ) {
      // dispatch(deleteTopicDataSelector.actions.reset());
      dispatch(topicsListSlice.actions.request());
    }
  }, [deleteTopicDataSelector]);

  useEffect(() => {
    if (
      editTopicDataSelector.isSuccess === true &&
      editTopicDataSelector.isLoaded == true
    ) {
      toast.success("Updated Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      dispatch(editTopicSlice.actions.reset());
      dispatch(topicsListSlice.actions.request());
    }
  }, [editTopicDataSelector]);

  useEffect(() => {
    if (
      createTopicDataSelector.isSuccess === true &&
      createTopicDataSelector.isLoaded == true
    ) {
      toast.success("Created Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      dispatch(createTopicSlice.actions.reset());
      dispatch(topicsListSlice.actions.request());
    }
  }, [createTopicDataSelector]);
  // create new topic modal
  const [showModal, setShowModal] = useState(false);
  // responsible for storing data required by the moda
  const [modalData, setModalData] = useState(false);

  useEffect(() => {
    if (
      topicDataSelector.isSuccess === true &&
      topicDataSelector.isLoaded == true
    ) {
      setTopicData(topicDataSelector.response);
      setRowData(topicDataSelector.response);

      if (
        selectedTechnologySelector?.response?.moduleid !== "" &&
        selectedTechnologySelector?.response?.moduleid !== undefined
      ) {
        var topicFilters = topicDataSelector?.response?.filter(
          (x) => x.ModuleID === selectedTechnologySelector?.response?.moduleid
        );

        setTopicData(topicFilters);
        setRowData(topicFilters);
      }
    }
  }, [topicDataSelector]);

  useEffect(() => {
    // dispatch(selectedtechnologySlice.actions.request())
    dispatch(technologiesListSliceDB.actions.request());
    dispatch(modulesListSlice.actions.request());
    dispatch(topicsListSlice.actions.request());
  }, []);

  useEffect(() => {
    //alert(selectedId_Query);
    if (
      moduleDataSelector.isSuccess === true &&
      moduleDataSelector.isLoaded == true
    ) {
      setModuleDataTemp(moduleDataSelector?.response);

      //setselectedModuleId_Query(selectedTechnologySelector?.response?.moduleid);
      if (
        selectedTechnologySelector?.response?.technologyid !== "" &&
        selectedTechnologySelector?.response?.technologyid !== undefined
      ) {
        var filteredList = [];

        //  moduleDataSelector.response.map((x) => {
        //   if (x.TechnologyID === selectedId_Query
        //   )
        //   {
        //     if(x.ModuleID===selectedModuleId_Query)
        //     {
        //       //alert(x?.ModuleName)
        //       setselectedModuleId_Query(x?.ModuleID);
        //       setSelectedModuleId(x?.ModuleName);

        //     }
        //     filteredList.push(x) ;
        //   }

        // })

        var filteredResult = moduleDataSelector?.response?.filter(
          (x) =>
            x.TechnologyID ===
            selectedTechnologySelector?.response?.technologyid
        );

        setselectedModuleId_Query(filteredResult[0]?.ModuleID);
        setSelectedModuleId(filteredResult[0]?.ModuleName);

        setModulesList(filteredResult);

        // module_selectchange(selectedModuleId_Query);
      } else {
        setModulesList(moduleDataSelector?.response);
      }
      // else {
      //   //alert('moduleentered')
      //   setModulesList(moduleDataSelector.response)
      // }
    }
  }, [moduleDataSelector]);

  // useEffect(() => {
  //   setTechnologiesList(technologyDataSelector.response)
  // }, [technologyDataSelector]);

  const cellClickHandler = async (e) => {
    if (e.colDef.field !== "Action") {
      dispatch(
        selectedtechnologySlice.actions.request({
          technologyid: e.data.TechnologyID,
          moduleid: e.data.ModuleID,
          topicid: e.data.TopicID,
          subtopicid: "",
        })
      );
      //dispatch(selectedtechnologySlice.actions.request({ ...selectedTechnologies, topicid: e.data.TopicID }))
      navigate(`/subtopics/${e.data.TopicID}`);
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
    setShowModal({ type: "edit", from: "topic" });
  };

  const onGridReady = (params) => {
    let arr = [];
    Object.keys(topicData)?.forEach((item, i) => {
      let obj = {
        TopicID: topicData[item].TopicID,
        SubTopicsCount: topicData[item].SubTopicsCount,
        // "Description":moduleData[item].Description,
        TopicName: topicData[item].TopicName,
        TechnologyID: topicData[item].TechnologyID,
        Description: topicData[item].Description,
        ModuleID: topicData[item].ModuleID,
      };
      arr.push(obj);
    });
    setColumnDefs([
      // {
      //   field: "TopicID",
      //   headerName: "TopicID",
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
        field: "TopicName",
        headerName: "TopicName",
        width: 300,
        filter: true,
        floatingFilter: true,
        // fontfamily:'',
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
      },
      {
        field: "Description",
        headerName: "Description",
        width: 200,
        // fontfamily:'',
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
      },
      {
        field: "SubTopicsCount",
        headerName: "SubTopicsCount",
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

  // Column Definitions: Defines & controls grid columns.
  // const [colDefs, setColDefs] = useState([
  //   { field: 'ModuleName' },
  //   { field: 'Description' },
  //   { field: 'ModuleID' },
  //   { field: 'TechnologyID' },
  //   { field: 'CreatedBy' }
  // ]);

  // Called from topicModal
  function topicModalSubmitHandler(id, topicName, topicDescription) {
    if (action === "new") {
      dispatch(
        createTopicSlice.actions.request({
          topicName: topicName,
          topicID: id,
          description: topicDescription,
        })
      );
    }
    if (action === "edit") {
      dispatch(
        editTopicSlice.actions.request({
          topicName: topicName,
          topicID: id,
          description: topicDescription,
        })
      );
    }
  }
  function module_selectchange(moduleId) {
    //
    //alert(topicDataSelector?.response);

    if (topicDataSelector?.response !== null) {
      if (moduleId !== 0) {
        var topicFilters = topicDataSelector?.response?.filter(
          (x) => x.ModuleID === moduleId
        );
        // alert(topicFilters.length);
        setTopicData(topicFilters);
        setRowData(topicFilters);
        dispatch(
          selectedtechnologySlice.actions.request({
            technologyid: selectedId_Query,
            moduleid: moduleId,
            topicid: "",
            subtopicid: "",
          })
        );
      } else {
        setTopicData(topicDataSelector.response);
        setRowData(topicDataSelector.response);
        dispatch(
          selectedtechnologySlice.actions.request({
            technologyid: selectedId_Query,
            moduleid: moduleId,
            topicid: "",
            subtopicid: "",
          })
        );
      }
    }
  }

  function technology_selectchange(technologyid) {
    if (technologyid !== 0) {
      var moduleFilters = moduleDataSelector.response.filter(
        (x) => x.TechnologyID === technologyid
      );
      setModulesList(moduleFilters);
      setSelectedModuleId("");
      setselectedModuleId_Query(0);
    } else {
      setTopicData(topicDataSelector.response);
      setRowData(topicDataSelector.response);
      setModulesList([]);
    }

    // if (action === 'new') {
    //   dispatch(createTopicSlice.actions.request({ TechnologyName: technologyName, TechnologyID: id, Description: technologyDescription, TechnologyCode: 'NIT0001' }))

    // }
    // if (action === 'edit') {
    //   dispatch(editTopicSlice.actions.request({ TechnologyName: technologyName, TechnologyID: id, Description: technologyDescription, TechnologyCode: 'NIT0002' }))
    // }
  }
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
      dispatch(editTopicSlice.actions.request(topicobj));
    } else {
      dispatch(createTopicSlice.actions.request(topicobj));
    }

    setIsCrudPopup(false);
  };
  const getFilterValues = () => {
    // alert(selectedId_Query);
    var selectedFilter = {
      technologyid: selectedId_Query,
      moduleid: selectedModuleId_Query,
    };
    return selectedFilter;
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        {isCrudPopUp && (
          <TopicMuiModel_New
            flag={action}
            editRow={modalData}
            technologyData={technologiesList}
            ModuleData={moduleDataTemp}
            addClick={onAddSubmit}
            popupclose={(value) => {
              setIsCrudPopup(value);
            }}
            selectedFilters={getFilterValues()}
          ></TopicMuiModel_New>
          // <TopicMuiModel_New
          //   flag={action}
          //   editRow={modalData}
          //   technologyData={technologyDataSelector.response}
          //   ModuleData={moduleDataSelector.response}
          //   addClick={onAddSubmit}
          //   popupclose={(value) => { setIsCrudPopup(value) }}
          //   selectedFilters={getFilterValues()}
          // ></TopicMuiModel_New>
          // <TopicHandler
          //   flag={showModal}
          //   modalData={modalData}
          //   modalSubmitHandler={topicModalSubmitHandler}
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
                Topics
              </Typography>
            </div>
            <Divider />
            <div style={{ marginTop: "30px", marginBottom: "5px" }}>
              <Grid container spacing={1} marginTop={2} marginBottom={2}>
                <Grid justifyContent="left" alignItems="left">
                  {/* <FormControl
               sx={{
                width:200
               }}
              > */}
                  <FormControl sx={{ m: 1, minWidth: 220 }}>
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
                  </FormControl>
                  {/* <FormLabel>Technologies</FormLabel>
                <Select
                  labelId="simple-select-label" 
                  onChange={(e)=>{
                    setSelectedTechId(e.target.value);
                    technology_selectchange(e.target.value)
                  }}
                 value={selectedTechId ||""}
                  display
                >
                  {technologiesList?.length>0&& technologiesList?.map((rec) => {
                    return <MenuItem selected={selectedTechnologies?.TechnologyID ||""} value={rec.TechnologyID}>{rec.TechnologyName}</MenuItem>;
                  })}
                 
                 { selectedTechnologies?.TechnologyID ?"":<MenuItem>select </MenuItem>}
                </Select>
              
              </FormControl> */}
                  {/* <FormControl
               sx={{
                width:200,
                marginLeft:'10px'
               }}
              >
                <FormLabel>Modules</FormLabel>
                <Select
                  labelId="simple-select-label" 
                  onChange={(e)=>{                   
                    setSelectedModuleId(e.target.value);

                  }}
                  value={selectedModuleId}
                  display
                >
               
                  {modulesList.length>0&&
                  
                    modulesList?.map((rec) => {
                    return <MenuItem  value={rec.ModuleID}>{rec.ModuleName}</MenuItem>;
                  })
                }
                 
                </Select>
              
              </FormControl> */}

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
                          module_selectchange(value.id);
                          setselectedModuleId_Query(value.id);
                        } else {
                          setSelectedModuleId("");
                          setselectedModuleId_Query(0);
                          var topicFilters =
                            topicDataSelector?.response?.filter(
                              (x) => x.TechnologyID === selectedId_Query
                            );
                          setTopicData(topicFilters);
                          setRowData(topicFilters);
                          // setModulesList(moduleDataTemp);
                          // setTopicData(topicDataSelector.response)
                          //setRowData(topicDataSelector.response);
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
                        <TextField {...params} label="modules" />
                      )}
                    />
                  </FormControl>
                </Grid>
                {/* <Grid justifyContent="left" alignItems="left" margin={4} >
  <Button variant="contained" startIcon={<SearchIcon/>} 
  onClick={()=>topicFetchHandler()}>
        Search
      </Button>
    </Grid> */}
              </Grid>
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
            {topicData ? (
              <AgGridReact
                rowData={rowData}
                onGridReady={onGridReady}
                columnDefs={columnDefs}
                onCellClicked={cellClickHandler}
              />
            ) : (
              <div>loading</div>
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
                {deleteRow?.SubTopicsCount > 0
                  ? "This Topic includes  Subtopics . To delete this Topic, please delete its associated Subtopics first."
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
                    TopicID: deleteRow.TopicID,
                    TechnologyID: null,
                    moduleID: null,
                    Topic: null,
                    Description: null,
                  };

                  dispatch(deleteTopicSlice.actions.request(iteminner));
                  handleClose();
                }}
                disabled={deleteRow?.SubTopicsCount > 0}
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
                    Import Topic{" "}
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
                        Description: isEmpty(item.Description)
                          ? ""
                          : item.Description,
                      };
                      itemstemp.push(iteminner);
                    });
                    dispatch(excelTopicSlice.actions.request(itemstemp));
                    setItems([]);
                   
                    setExcelOpen(false);
                    window.location.reload();

                  }}
                >
                  Import Bulk
                </Button>

                <a
                  style={{ marginLeft: "5px", color: "blue" }}
                  href={process.env.PUBLIC_URL + "/Topics_Template.xlsx"}
                  download={"Topics_Template.xlsx"}
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

export default Topics;

function TopicHandler({
  flag,
  modalData,
  modalSubmitHandler,
  modalCancelHandler,
}) {
  return (
    <ModalUi
      ModalParam={TopicModal}
      flag={flag}
      modalData={modalData}
      modalSubmitHandler={modalSubmitHandler}
      modalCancelHandler={modalCancelHandler}
    />
  );
}
