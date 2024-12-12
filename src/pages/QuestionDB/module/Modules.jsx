import { React, useEffect, useState, useCallback, useRef } from "react";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import * as XLSX from "xlsx";
import {
  modulesListSlice,
  createModuleSlice,
  deleteModuleSlice,
  editModuleSlice,
  excelModuleSlice,
  selectedtechnologySlice,
  technologiesListSliceDB,
  moduleTechIdSlice,
} from "../../../store/QuestionDB/root.slice";
import Autocomplete from "@mui/material/Autocomplete";
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
import ModalUi from "../../../ui/QuestionDB/ModalUi";
import ModuleModal from "../../../ui/QuestionDB/ModuleModal";
import { experimentalStyled as styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import { Modal, TextField, IconButton, Card, InputLabel } from "@mui/material";
import {
  Close,
  EnergySavingsLeafSharp,
  Troubleshoot,
  X,
} from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import CloseIcon from "@mui/icons-material/Close";
import ModuleMUIModel from "../../../ui/QuestionDB/ModuleMUIModel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveAs } from "file-saver";
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
function Modules() {
  const gridRef = useRef();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [openexcel, setExcelOpen] = useState(false);
  const [file, setSelectedFile] = useState(null);
  const [action, setAction] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);

  const [isCrudPopUp, setIsCrudPopup] = useState(false);
  const [crudAction, setCrudAction] = useState("");

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const { TechnologyID } = useParams();
  const navigate = useNavigate();
  var dispatch = useDispatch();
  const [selectedTechnologies, setSelectedTechnologies] = useState([""]);
  const [selectedTechId, setSelectedTechId] = useState("");
  const [selectedId, setSelectedId] = useState(0);
  const [firstload, setFirstLoad] = useState(true);
  const [moduleData, setModuleData] = useState([]);
  const [moduleDataTemp, setModuleDataTemp] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState(null);
  const [technologiesList, setTechnologiesList] = useState([]);
  // create new module modal
  const [showModal, setShowModal] = useState(false);
  // responsible for storing data required by the modal
  const [modalData, setModalData] = useState(false);
  const [deleteditem, setdeletedItems] = useState(false);

  console.log(rowData);
  const handleClose = () => {
    setOpen(false);
  };

  function isEmpty(value) {
    return (
      value == null || (typeof value === "string" && value.trim().length === 0)
    );
  }

  const modulesDataSelector = useSelector((state) => state?.modulesListReduer);

  const selectedTechnologySelector = useSelector(
    (state) => state?.selectedTechnologyReducer
  );
  console.log("selected technology data selector:", selectedTechnologySelector);
  const technologyDataSelector = useSelector(
    (state) => state?.technologiesListReducerDB
  );

  const excelDataSelector = useSelector((state) => state?.excelModuleReducer);
  const deleteDataSelector = useSelector((state) => state?.deleteModuleReducer);
  const createDataSelector = useSelector(
    (state) => state?.createNewModuleReducer
  );
  const editDataSelector = useSelector((state) => state?.editModuleReducer);

  useEffect(() => {}, [selectedTechnologySelector]);

  const filterData = (technologyId) => {
    // alert(technologyId);

    var filteredList = modulesDataSelector?.response?.filter(
      (x) => x.TechnologyID === technologyId
    );
    setRowData(filteredList);
  };

  useEffect(() => {
    if (
      deleteDataSelector.isSuccess === true &&
      deleteDataSelector.isLoaded === true
    ) {
      dispatch(modulesListSlice.actions.request());
      dispatch(deleteModuleSlice.actions.reset());
    }
  }, [deleteDataSelector]);

  useEffect(() => {
    if (
      technologyDataSelector.isSuccess === true &&
      technologyDataSelector.isLoaded == true
    ) {
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
        setSelectedId(filteredResult[0]?.TechnologyID);
      } else {
        setSelectedTechId("");
        setSelectedId(0);
      }
      setTechnologiesList(technologyDataSelector?.response);
    }
  }, [technologyDataSelector]);

  useEffect(() => {
    // dispatch(modulesListSlice.actions.request())
    if (
      modulesDataSelector.isSuccess === true &&
      modulesDataSelector.isLoaded == true
    ) {
      //   setModuleData(modulesDataSelector.response);
      setModuleDataTemp(modulesDataSelector.response);
      //alert(selectedId)
      //setRowData(modulesDataSelector.response);
      // alert(selectedTechnologySelector?.response?.technologyid );
      if (
        selectedTechnologySelector?.response?.technologyid !== "" &&
        selectedTechnologySelector?.response?.technologyid !== 0
      ) {
        var filteredList = modulesDataSelector.response.filter(
          (x) =>
            x.TechnologyID ===
            parseInt(selectedTechnologySelector?.response?.technologyid)
        );
        console.log("filetered list data:", filteredList);
        if (filteredList.length > 0) {
          setModuleData(filteredList);
          setRowData(filteredList);
        } else {
          setModuleData(modulesDataSelector.response);
          setRowData(modulesDataSelector.response);
        }
      } else {
        setModuleData(modulesDataSelector.response);
        setRowData(modulesDataSelector.response);
      }

      //  if (selectedTechnologySelector?.response?.technologyid !== "0" ) {
      //    //setFirstLoad(false);
      //   alert(selectedTechnologySelector?.response?.technologyid);

      //  }
      // else{
      //   setSelectedTechId("");
      // }

      //setRowData(modulesDataSelector.response);
    }
  }, [modulesDataSelector]);

  // useEffect(() => {
  //   if (modulesDataSelector.isSuccess === true && modulesDataSelector.isLoaded == true) {
  //     setModuleData(modulesDataSelector.response);
  //      // dispatch(modulesListSlice.actions.request())

  //   }
  // }, [modulesDataSelector]);

  useEffect(() => {
    // dispatch(technologiesListSlice.actions.reset());
    // dispatch(modulesListSlice.actions.reset());
    // dispatch(excelModuleSlice.actions.reset());
    // dispatch(createModuleSlice.actions.reset());
    // dispatch(editModuleSlice.actions.reset());
    // dispatch(deleteModuleSlice.actions.reset());

    dispatch(technologiesListSliceDB.actions.request());
    dispatch(modulesListSlice.actions.request());
  }, []);

  useEffect(() => {
    if (
      editDataSelector.isSuccess === true &&
      editDataSelector.isLoaded == true
    ) {
      dispatch(editModuleSlice.actions.reset());
      dispatch(modulesListSlice.actions.request());
      setModuleData(modulesDataSelector.response);
      setModuleDataTemp(modulesDataSelector.response);
      setRowData(modulesDataSelector.response);
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
  }, [editDataSelector]);

  useEffect(() => {
    if (
      createDataSelector.isSuccess === true &&
      createDataSelector.isLoaded == true
    ) {
      // alert('success')

      dispatch(modulesListSlice.actions.request());
      dispatch(createModuleSlice.actions.reset());
      toast.success("Created Succesfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });

      // setModuleData(modulesDataSelector.response);
      //      setModuleDataTemp(modulesDataSelector.response);
      //      setRowData(modulesDataSelector.response);
      //      filterData(selectedId);
      // setSelectedTechId()
    }
  }, [createDataSelector]);

  useEffect(() => {
    if (
      excelDataSelector.isSuccess === true &&
      excelDataSelector.isLoaded == true
    ) {
      const worksheet = XLSX.utils.json_to_sheet(excelDataSelector.response);
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

      saveAs(blob, "moduleData.xlsx");
      dispatch(excelModuleSlice.actions.reset());
      dispatch(modulesListSlice.actions.request());
      setModuleData(modulesDataSelector.response);
      setModuleDataTemp(modulesDataSelector.response);

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
  }, [excelDataSelector.response]);

  const cellClickHandler = (e) => {
    if (e.colDef.field !== "Action") {
      var filters = selectedTechnologies;
      dispatch(
        selectedtechnologySlice.actions.request({
          technologyid: e.data.TechnologyID,
          moduleid: e.data.ModuleID,
          topicid: "",
          subtopicid: "",
        })
      );
      // dispatch(selectedtechnologySlice.actions.request({ ...selectedTechnologies, moduleid: e.data.ModuleID }))
      navigate(`/topics/${e.data.ModuleID}`);
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
    setShowModal({ type: "edit", from: "module" });
  };

  const onGridReady = (params) => {
    let arr = [];
    Object.keys(moduleData)?.forEach((item, i) => {
      let obj = {
        ModuleID: moduleData[item].ModuleID,
        TopicsCount: moduleData[item].TopicsCount,
        // "Description":moduleData[item].Description,
        TechnologyID: moduleData[item].TechnologyID,
        ModuleName: moduleData[item].ModuleName,
        Description: moduleData[item].Description,
      };
      arr.push(obj);
    });

    setColumnDefs([
      // {
      //   field: "ModuleID",
      //   headerName: "ModuleID",
      //   width: 300,
      //   // fontfamily:'',
      //   checkboxSelection: false,
      //   headerCheckboxSelection: false, filter: true, floatingFilter: true,
      //   cellStyle: () => {
      //     return {
      //       fontfamily: "Roboto",
      //       fontSize: "14px",
      //       color: "#636363",
      //       fontStyle: "normal",
      //     };
      //   },
      // },
      // {
      //   field: "TechnologyID",
      //   headerName: "TechnologyID",
      //   width: 300,
      //   // fontfamily:'',
      //   checkboxSelection: false,
      //   headerCheckboxSelection: false, filter: true, floatingFilter: true,
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
        field: "ModuleName",
        headerName: "ModuleName",
        width: 500,
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
        field: "TopicsCount",
        headerName: "TopicsCount",
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

  // Called from ModuleModal
  function moduleModalSubmitHandler(id, technologyName, moduleName) {
    var technologyIdObj = technologiesList?.find(
      (x) => x.TechnologyName === technologyName
    );
    if (action === "new") {
      dispatch(
        createModuleSlice.actions.request({
          ModuleID: id,
          TechnologyID: technologyIdObj.TechnologyID,
          ModuleName: moduleName,
        })
      );
    }
    if (action === "edit") {
      dispatch(
        editModuleSlice.actions.request({
          ModuleID: id,
          TechnologyID: technologyIdObj.TechnologyID,
          ModuleName: moduleName,
        })
      );
    }
  }
  const redrawAllRows = useCallback(() => {
    gridRef.current.api.redrawRows();
  }, []);
  function technologyModalcancelHandler() {
    setShowModal(false);
    setModalData(false);
  }
  function searchHandler() {
    //moduleFetchHandler();
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
      dispatch(editModuleSlice.actions.request(topicobj));
    } else {
      dispatch(createModuleSlice.actions.request(topicobj));
    }

    setIsCrudPopup(false);
  };
  const getFilterValues = () => {
    var selectedFilter = { technologyid: selectedId };
    return selectedFilter;
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        {isCrudPopUp && (
          <ModuleMUIModel
            key={Math.random()}
            flag={action}
            editRow={modalData}
            addClick={onAddSubmit}
            technologyData={technologiesList}
            selectedFilters={getFilterValues()}
            // iscrudpopup={isCrudPopUp}
            popupclose={(value) => {
              setIsCrudPopup(value);
            }}
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
                Modules
              </Typography>
            </div>
            <Divider />

            <div style={{ marginTop: "30px", marginBottom: "5px" }}>
              <Grid container spacing={1} marginTop={2} marginBottom={2}>
                <Grid justifyContent="left" alignItems="left">
                  <FormControl
                    sx={{
                      width: 200,
                    }}
                  >
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                    >
                      {/* <InputLabel id="demo-simple-select-standard-label">Technology</InputLabel> */}

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
                          if (value === null) {
                            setSelectedTechId("");
                            setSelectedId(0);
                            setModuleData(moduleDataTemp);
                            setRowData(moduleDataTemp);
                            // dispatch(selectedtechnologySlice.actions.request(...selectedTechnologies,{ technologyid: 0 }))
                            dispatch(
                              selectedtechnologySlice.actions.request({
                                technologyid: 0,
                                moduleid: selectedTechnologies.moduleid,
                                topicid: selectedTechnologies.topicid,
                                subtopicid: selectedTechnologies.subtopicid,
                              })
                            );
                          } else {
                            dispatch(
                              selectedtechnologySlice.actions.request({
                                technologyid: value.id,
                                moduleid: selectedTechnologies.moduleid,
                                topicid: selectedTechnologies.topicid,
                                subtopicid: selectedTechnologies.subtopicid,
                              })
                            );
                            setSelectedId(value.id);
                            setSelectedTechId(value.label);
                            filterData(value.id);
                          }
                        }}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Technology" />
                        )}
                      />
                    </FormControl>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                onClick={() => {
                  setIsCrudPopup(true);
                  setAction("");
                  setAction("new");
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
            {/* {moduleData.length > 0 ? ( */}
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              onGridReady={onGridReady}
              columnDefs={columnDefs}
              onCellClicked={cellClickHandler}
            />
            {/* ) : (
              null
            )} */}
          </div>

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
                    Import Module{" "}
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
              <div style={{ margin: "20px" }}>
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
                    items?.map((item) => {
                      var iteminner = {
                        Technology: isEmpty(item.Technology)
                          ? ""
                          : item.Technology,
                        Module: isEmpty(item.Module) ? "" : item.Module,
                        Description: isEmpty(item.Description)
                          ? ""
                          : item.Description,
                      };
                      itemstemp.push(iteminner);
                    });
                    dispatch(excelModuleSlice.actions.request(itemstemp));
                    setItems([]);
                    setExcelOpen(false);
                    window.location.reload();

                  }}
                >
                  Import Bulk
                </Button>
                <a
                  style={{ marginLeft: "5px", color: "blue" }}
                  href="/Modules_Template.xlsx"
                  download={"Modules_Template.xlsx"}
                >
                  Download Template
                </a>
              </div>
            </Box>
          </Modal>

          <Dialog open={open} maxWidth="sm" fullWidth>
            <DialogTitle>Confirm Delete</DialogTitle>
            <Box position="absolute" top={0} right={0}>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Box>
            <DialogContent>
              <Typography>
                {deleteRow?.TopicsCount > 0
                  ? "This Modules includes Topics. To delete this Modules, please delete its associated Topics first."
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
                  dispatch(
                    deleteModuleSlice.actions.request({
                      ModuleID: deleteRow.ModuleID,
                      ModuleName: deleteRow.ModuleName,
                      TechnologyId: deleteRow.TechnologyID,
                    })
                  );
                  handleClose();
                }}
                disabled={deleteRow?.TopicsCount > 0}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
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
        </Box>
      </Box>
    </>
  );
}

export default Modules;
