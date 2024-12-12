import { React, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "../../../store/hooks.helper";

import {
  createTechnologySlice,
  editTechnologySlice,
  excelTechnologySlice,
  deleteTechnologySlice,
  selectedtechnologySlice,
  programcodeListSlice,
  technologiesListSliceDB,
  excelTopicSlice,
} from "../../../store/QuestionDB/root.slice";

import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // T
import { AgGridReact } from "ag-grid-react";
import "../../../index.css";
import Button from "@mui/material/Button";
import TechnologyMUIModel from "../../../ui/QuestionDB/TechnologyMUIModel";
import Autocomplete from "@mui/material/Autocomplete";
import { saveAs } from "file-saver";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Hidden,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import { Modal, TextField, IconButton, Card } from "@mui/material";
import { Description, FileUploadOutlined, Label } from "@mui/icons-material";
import ModalUi from "../../../ui/QuestionDB/ModalUi";
import TechnologyModal from "../../../ui/QuestionDB/TechnologyModal";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

import { Close } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
function Technologies() {
  var dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("iam in technologies page");
  //excel file funcitoality
  const [open, setOpen] = useState(false);
  const [openexcel, setExcelOpen] = useState(false);
  const [deleteditem, setdeletedItems] = useState(false);
  const [action, setAction] = useState(null);
  const [isCrudPopUp, setIsCrudPopup] = useState(false);
  const [items, setItems] = useState([]);
  const [technologyData, setTechnologyData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState(null);
  const [deleteRow, setDeleteRow] = useState(null);
  // create new technology modal
  const [showModal, setShowModal] = useState(false);
  // responsible for storing data required by the modal
  const [modalData, setModalData] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  function isEmpty(value) {
    return (
      value == null || (typeof value === "string" && value.trim().length === 0)
    );
  }

  const technologyDataSelector = useSelector(
    (state) => state?.technologiesListReducerDB
  );
  console.log("technologyDataSelector:", technologyDataSelector);
  console.log(technologyData);

  const excelDataSelector = useSelector(
    (state) => state?.excelTechnologyReducer
  );
  console.log("excel Data Selector:", excelDataSelector);

  const deleteSelector = useSelector((state) => state?.deleteTechnologyReducer);
  console.log("deleteSelector", deleteSelector);

  const createSelector = useSelector(
    (state) => state?.createNewTechnologyReducer
  );
  console.log("createSelector:", createSelector);

  const editSelector = useSelector((state) => state?.editTechnologyReducer);
  console.log("editSelector:", editSelector);

  const programCodeSelector = useSelector(
    (state) => state?.ProgramCodeLisReducer
  );
  console.log("program code selector:", programCodeSelector);

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

      saveAs(blob, "technologydata.xlsx");
      dispatch(technologiesListSliceDB.actions.request());
      dispatch(excelTechnologySlice.actions.reset());

      // setModuleData(modulesDataSelector.response);
      // setModuleDataTemp(modulesDataSelector.response);

      toast.success("Uploaded Succesfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  }, [excelDataSelector.response]);

  const cellClickHandler = (e) => {
    if (e.colDef.field !== "Action") {
      dispatch(
        selectedtechnologySlice.actions.request({
          technologyid: e.data.TechnologyID,
          moduleid: "",
          topicid: "",
          subtopicid: "",
        })
      );
      navigate(`/modules/${e.data.TechnologyID}`);
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
    setShowModal({ type: "edit", from: "technologies" });
  };

  useEffect(() => {
    // dispatch(excelTechnologySlice.actions.reset());
    // dispatch(createTechnologySlice.actions.reset());
    // dispatch(editTechnologySlice.actions.reset());
    // dispatch(deleteTechnologySlice.actions.reset());
    console.log("working in the technology default useeffect:");
    dispatch(programcodeListSlice.actions.request());

    dispatch(
      selectedtechnologySlice.actions.request({
        technologyid: "",
        moduleid: "",
        topicid: "",
        subtopicid: "",
      })
    );

    dispatch(technologiesListSliceDB.actions.request());
  }, []);

  //useEffect(() => {
  //   if (excelDataSelector.isSuccess === true && excelDataSelector.isLoaded == true) {
  //     toast.success('Uploaded Succesfully', {
  //       position: "top-right",
  //       autoClose: 1500,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: false,
  //       draggable: false,
  //       progress: undefined

  //     });
  //     dispatch(technologiesListSlice.actions.request());
  //     dispatch(excelTechnologySlice.actions.reset());
  //   }
  // }, [excelDataSelector]);

  useEffect(() => {
    if (deleteSelector.isSuccess === true && deleteSelector.isLoaded == true) {
      dispatch(technologiesListSliceDB.actions.request());
      dispatch(deleteTechnologySlice.actions.reset());
    }
  }, [deleteSelector]);

  useEffect(() => {
    if (editSelector.isSuccess === true && editSelector.isLoaded == true) {
      toast.success("Updated Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      dispatch(editTechnologySlice.actions.reset());
      dispatch(technologiesListSliceDB.actions.request());
    }
  }, [editSelector]);

  useEffect(() => {
    if (createSelector.isSuccess === true && createSelector.isLoaded == true) {
      toast.success("Created Successfully", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });

      dispatch(createTechnologySlice.actions.reset());
      dispatch(technologiesListSliceDB.actions.request());
    }
  }, [createSelector]);

  useEffect(() => {
    if (
      technologyDataSelector.isSuccess === true &&
      technologyDataSelector.isLoaded == true
    ) {
      setTechnologyData(technologyDataSelector.response);
      setRowData(technologyDataSelector.response);
    }
    // dispatch(technologiesListSlice.actions.reset());
  }, [technologyDataSelector]);

  const onGridReady = (params) => {
    let arr = [];
    Object.keys(technologyData)?.forEach((item, i) => {
      let obj = {
        Description: technologyData[item].Description,
        ProgramCode: technologyData[item].ProgramCode,
        ModulesCount: technologyData[item].ModulesCount,
        TechnologyID: technologyData[item].TechnologyID,
        TechnologyName: technologyData[item].TechnologyName,
      };
      arr.push(obj);
    });
    setColumnDefs([
      // {
      //   field: "TechnologyID",
      //   headerName: "TechnologyID",
      //   width: 300,
      //   filter: true,
      //   floatingFilter: true,
      //   Hidden:true,
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
        field: "ProgramCode",
        headerName: "Program Code",
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
        field: "TechnologyName",
        headerName: "TechnologyName",
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
        field: "ModulesCount",
        headerName: "ModulesCount",
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
              />
              <EditIcon
                style={{ color: "blue" }}
                onClick={() => {
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

  const onAddSubmit = (topicobj) => {
    if (action === "edit") {
      dispatch(editTechnologySlice.actions.request(topicobj));
    } else {
      dispatch(createTechnologySlice.actions.request(topicobj));
    }

    setIsCrudPopup(false);
  };
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
  return (
    <>
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
            <div style={{ marginBottom: "5px" }}>
              <Typography variant="h5" gutterBottom>
                Technologies
              </Typography>
            </div>
            <Divider />

            <div style={{ marginTop: "30px", marginBottom: "5px" }}>
              {/* Create New Technology */}
              <Button
                onClick={() => {
                  setIsCrudPopup("");
                  setIsCrudPopup(true);
                  setAction("");
                  setAction("new");
                }}
                variant="outlined"
                startIcon={<AddIcon />}
              >
                New
              </Button>

              {/* <Button variant="contained" style={{ marginLeft: 10 }} onClick={() => {
                setExcelOpen(true);
              }}>
                Create Bulk
                <IconButton component="label">
                </IconButton>
              </Button> */}

              {isCrudPopUp && (
                <TechnologyMUIModel
                  key={Math.random()}
                  flag={action}
                  editRow={modalData}
                  addClick={onAddSubmit}
                  programData={programCodeSelector.response}
                  // iscrudpopup={isCrudPopUp}
                  popupclose={(value) => {
                    setIsCrudPopup(value);
                  }}
                ></TechnologyMUIModel>
              )}
            </div>
            {
              technologyData.length > 0 ? (
                <AgGridReact
                  rowData={rowData}
                  onGridReady={onGridReady}
                  columnDefs={columnDefs}
                  onCellClicked={cellClickHandler}
                />
              ) : null
              // <div>loading</div>
            }
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
                {deleteRow?.ModulesCount > 0
                  ? "This Technology includes Modules. To delete this Technology, please delete its associated  Modules."
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
                    deleteTechnologySlice.actions.request({
                      TechnologyName: deleteRow.TechnologyName,
                      TechnologyID: deleteRow.TechnologyID,
                      Description: deleteRow.Description,
                    })
                  );
                  handleClose();
                }}
                disabled={deleteRow?.ModulesCount > 0}
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
                    Import Technology{" "}
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
                />
                <Button
                  disabled={items.length == 0}
                  variant="contained"
                  onClick={() => {
                    var itemstemp = [];
                    items.map((item) => {
                      var iteminner = {
                        ProgramCode: isEmpty(item.ProgramCode)
                          ? ""
                          : item.ProgramCode,
                        Technology: isEmpty(item.Technology)
                          ? ""
                          : item.Technology,
                        Description: isEmpty(item.Description)
                          ? ""
                          : item.Description,
                      };
                      itemstemp.push(iteminner);
                    });
                    dispatch(excelTechnologySlice.actions.request(itemstemp));
                    setItems([]);
                    setExcelOpen(false);
                    window.location.reload();

                  }}
                >
                  Import Bulk
                </Button>

                <a
                  style={{ marginLeft: "5px", color: "blue" }}
                  href="/Technologies_Template.xlsx"
                  download={"Technologies_Template.xlsx"}
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

export default Technologies;

// function ModalHandler({
//   flag,
//   modalData,
//   modalSubmitHandler,
//   modalCancelHandler,
// }) {
//   return (
//     <ModalUi
//       flag={flag}
//       ModalParam={TechnologyModal}
//       modalData={modalData}
//       modalSubmitHandler={modalSubmitHandler}
//       modalCancelHandler={modalCancelHandler}
//     />
//   );
// }
