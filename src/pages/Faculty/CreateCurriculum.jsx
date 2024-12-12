import clsx from "clsx";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  TextField,
  Button,
  Checkbox,
  FormGroup,
  Snackbar,
  Alert,
  FormControlLabel,
  Stack,
} from "@mui/material";
import { connect } from "react-redux";

import FileUpload from "../../components/Faculty/FileUpload";
import TableofApproval from "../../components/Faculty/TableOfApproval";
import {
  ac_curriculumByIDApi,
  getModulesByFacultyId,
} from "../../store/Faculty/api";
import { useCourseCurriculumFeatureFlags } from "../../context/Faculty/courseCurriculumFlagContext";
import AddTopicsModal from "../../components/Faculty/AddTopicsModal";
import AddSubTopicsModal from "../../components/Faculty/AddSubTopicsModal";
import { useTopicsList } from "../../context/Faculty/topicsListContext";
import { useNavLinkState } from "../../context/Faculty/navLinksContext";

const insertCurriculamApi = async (
  facultyId,
  sessionName,
  tableData,
  useMasterDB,
  moduleId
) => {
  await axios.post(
    `${process.env.REACT_APP_FACULTY_API}facultycurriculam/insertfacultycurriculam`,
    {
      facultyId: facultyId,
      courseCurriculam_Name: sessionName,
      mappingId: 0,
      status: "pending",
      curriculam_Id: null,
      useMasterDB,
      moduleId,
      facultyCourseMapping: tableData.map((combo) => ({
        topicName:
          typeof combo.topics === "object"
            ? combo.topics?.join(", ") || ""
            : combo.topics,
        subtopicName:
          typeof combo.subTopics === "object"
            ? combo.subTopics?.join(", ") || ""
            : combo.subTopics,
        sessionId: combo.sessionNumber,
      })),
    }
  );
};

const updateCurriculamApi = async (
  facultyId,
  sessionName,
  tableData,
  mappingId,
  curriculumId,
  useMasterDB,
  status,
  deletedRecords
) => {
  const res = await axios.post(
    "http://49.207.10.13:6011/api/facultycurriculam/updatefacultycurriculum",
    {
      deletedRecords,
      facultyId: facultyId,
      courseCurriculam_Name: sessionName,
      mappingId: mappingId,
      status: status,
      curriculam_Id: curriculumId,
      useMasterDB,
      facultyCourseMapping: tableData.map((combo) => ({
        topicName:
          typeof combo.topics === "object"
            ? combo.topics?.join(", ") || ""
            : combo.topics,
        subtopicName:
          typeof combo.subTopics === "object"
            ? combo.subTopics?.join(", ") || ""
            : combo.subTopics,
        sessionId: combo.sessionNumber,
      })),
    }
  );
  return res;
};

function CreateCourseCurriculumComponent({ userId }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [flags, setFlag] = useCourseCurriculumFeatureFlags();
  const { useMasterDB } = flags;
  const [isTableDirty, setIsTableDirty] = useState(false);
  const [showTopicModel, setShowTopicModel] = useState(false);
  const [showSubTopicModel, setShowSubTopicModel] = useState(false);
  const [showModules, setShowModules] = useState(true);
  const sessionNameRef = useRef(null);
  // stores all records deleted by the user
  const deletedItemsRef = useRef([]);

  const navHook = useNavLinkState();

  const edit = searchParams.get("e");
  const curriculum_Id = searchParams.get("e");

  const [sessionName, setSessionName] = useState("");
  const [curriculumData, setCurriculumData] = useState({
    mappingId: 0,
    curriculamId: null,
    status: "",
  });
  const [tableData, setTableData] = useState([
    {
      first: true,
      sessionNumber: 1,
      topics: [],
      subTopics: [],
    },
  ]);
  const [nameError, setNameError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [modules, setModues] = useState([]);
  const [disableEdit, setDisableEdit] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [firstUseEffect, setFirstUseEffect] = useState(true);
  const { selectedModule, setSelectedModule } = useTopicsList();
  const [selectedTopic, setSelectedTopic] = useState("");
  const [moduleError, setModuleError] = useState(null);
  const [validateCurriculum,setCurriculumValidate]=('');
  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (!firstUseEffect.current) {
      setFirstUseEffect(false);
      if (isTableDirty)
        navHook.addObserver(
          "navigationchangestart",
          (navigator) => {
            const res = window.confirm(
              "There are unsaved changes, sure you wanna leave?"
            );
            if (res) {
              navHook.removeObserver("navigationchangestart", 0);
              navHook.setNavLinksDisabled(false);

              navigator();
            }
          },
          0
        );

      return () => navHook.removeObserver("navigationchangestart", 0);
    }
  }, [firstUseEffect, isTableDirty]);

  useEffect(() => {
    if (!disableSubmit) {
      if (!navHook.navLinksDisabled) {
        navHook?.setNavLinksDisabled(true);
      }
    } else {
      if (navHook.navLinksDisabled) navHook?.setNavLinksDisabled(false);
    }
  }, [disableSubmit]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await getModulesByFacultyId({ facultyId: userId });
        setModues(res?.data || []);

        // if (res?.data && res.data.length > 0) {
        //   setSelectedModule(res.data[0].id);
        // }
      } catch (error) {
        console.error(error);
      }
    };

    fetchModules();
  }, []);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (tableData.length === 0) {
      setTableData([
        {
          sessionNumber: 1,
          topics: [],
          subTopics: [],
        },
      ]);
    }
  }, [tableData]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (tableData && tableData[0]?.topics?.length) {
      setShowModules(false);
    } else {
      setShowModules(true);
    }
  }, [tableData]);

  useEffect(() => {
    const fetchCurriculumData = async () => {
      try {
        const res = await ac_curriculumByIDApi({
          curriculamId: curriculum_Id,
        });
        console.log("fetch Curriculum Data:", res.data.result.recordset);
        const transformedData = res.data.result.recordset.map((item) => ({
          ...item,
          sessionNumber: item.sessionId,
          topics: item.topicName?.split(", ") || [],
          subTopics: item.subtopicName?.split(", ") || [],

          topicName: undefined,
          subtopicName: undefined,
        }));

        const oneRow = res.data.result.recordset[0];

        if (edit)
          setCurriculumData((prev) => ({
            ...prev,
            mappingId: oneRow?.mapping_Id || 0,
            curriculamId: oneRow?.curriculamId || null,
            status: oneRow?.status || "",
          }));
        setSessionName(res.data.result.recordset[0]?.courseCurriculam_Name);
        setTableData(transformedData);
      } catch (error) {
        console.error(error);
      }
    };

    if (curriculum_Id) fetchCurriculumData();
  }, [curriculum_Id]);

  const updateDeletedItems = (record) => {
    deletedItemsRef.current.push(record.mapping_Id);
  };

  const handleSubmit = async () => {
    if (!sessionName.trim()) {
      setNameError("Course Name is required");
      return;
    }

    if (curriculumData.status === "pending") {
      alert("Your cannot update till admin approved your curriculum.");
      return;
    }

    try {
      if (!edit)
        await insertCurriculamApi(
          userId,
          sessionName,
          tableData,
          useMasterDB,
          selectedModule
        );
      else
        await updateCurriculamApi(
          userId,
          sessionName,
          tableData,
          curriculumData.mappingId,
          curriculum_Id,
          useMasterDB,
          curriculumData.status,
          deletedItemsRef.current
        );

      if (!edit) navigate("/view-course-curriculum");
      else {
        navHook.removeObserver("navigationchangestart", 0);
        alert("curriculum updated sucessfully");
        navHook.setNavLinksDisabled(false);
      }
      setSubmitSuccess(true);
      setIsTableDirty(false);
    } catch (error) {
      if (error.response.status === 409) {
        alert(error.response.data.message);

        sessionNameRef.current && sessionNameRef.current.focus();
      } else alert("Error submitting data");
    }
  };

  const submitForApproval = async () => {
    try {
      const res = await updateCurriculamApi(
        userId,
        sessionName,
        tableData,
        curriculumData.mappingId,
        curriculum_Id,
        useMasterDB,
        "pending",
        deletedItemsRef.current
      );
      setOpenSnackbar(true);
      setSnackbarMessage(res.data.message);
      setSnackbarSeverity("success");

      setIsTableDirty(false);
      setSubmitSuccess(true);
    } catch (error) {
      console.error(error);
      setOpenSnackbar(true);
      setSnackbarMessage("Error submitting data");
      setSnackbarSeverity("error");
    }
  };

  const handleSave = async () => {
    if (!sessionName.trim()) {
      setNameError("Course Name is required");
      return;
    }

    setIsTableDirty(false);
    try {
      await axios.post(
        `http://49.207.10.13:6011/api/facultycurriculam/insertfacultycurriculam`,
        {
          deletedRecords: deletedItemsRef.current,
          facultyId: userId,
          courseCurriculam_Name: sessionName,
          mappingId: edit ? curriculumData?.mappingId : 0,
          status: "draft",
          moduleId: edit ? undefined : selectedModule,
          curriculam_Id: edit ? curriculum_Id : null,
          facultyCourseMapping: tableData.map((combo) => ({
            topicName:
              typeof combo.topics === "object"
                ? combo.topics?.join(", ") || ""
                : combo.topics,
            subtopicName:
              typeof combo.subTopics === "object"
                ? combo.subTopics?.join(", ") || ""
                : combo.subTopics,
            sessionId: combo.sessionNumber,
            moduleId: edit ? undefined : selectedModule,
          })),
        }
      );
      setSubmitSuccess(true);
      setOpenSnackbar(true);
      setSnackbarMessage("Curriculum Added Successfully");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error(error);
      setOpenSnackbar(true);
      setSnackbarMessage("Error submitting data");
      setSnackbarSeverity("error");
    }
  };

  const validateSessionName= async(name)=>{
    console.log("session name:",name);
    const result=await axios.get(`http://49.207.10.13:6011/api/facultycurriculam/validatefacultycurriculum?courseName=${name}`);

    if(result.data.curriculumCount > 0){
      console.log("result:",result.data.curriculumCount);
      setCurriculumValidate(false);
    }
    else{
      console.log("curriculum does not exist:");
      setCurriculumValidate(true);
    }
  }

  const handleApproval = async () => {
    if (!sessionName.trim()) {
      setNameError("Course Name is required");
      return;
    }

    setIsTableDirty(false);
    try {
      await axios.post(
        `http://49.207.10.13:6011/api/facultycurriculam/insertfacultycurriculam`,
        {
          deletedRecords: deletedItemsRef.current,
          facultyId: userId,
          courseCurriculam_Name: sessionName,
          mappingId: edit ? curriculumData?.mappingId : 0,
          status: "pending",
          moduleId: edit ? undefined : selectedModule,
          curriculam_Id: edit ? curriculum_Id : null,
          facultyCourseMapping: tableData.map((combo) => ({
            topicName:
              typeof combo.topics === "object"
                ? combo.topics?.join(", ") || ""
                : combo.topics,
            subtopicName:
              typeof combo.subTopics === "object"
                ? combo.subTopics?.join(", ") || ""
                : combo.subTopics,
            sessionId: combo.sessionNumber,
            moduleId: edit ? undefined : selectedModule,
          })),
        }
      );
      setSubmitSuccess(true);
      setOpenSnackbar(true);
      setSnackbarMessage("Curriculum  Approval Successfully.");
      setSnackbarSeverity("success");
    } catch (error) {
      console.error(error);
      setOpenSnackbar(true);
      setSnackbarMessage("Error submitting data");
      setSnackbarSeverity("error");
    }
  };

  return (
    <div className="px-10" style={{ padding: "10px" }}>
      <div className="flex justify-between items-center  mb-4">
        <h1 className="text-3xl font-semibold text-gray-700">
          Create Course Curriculum
        </h1>
      </div>
      <hr className="mb-6 border-gray-300" />
      {showTopicModel && (
        <AddTopicsModal
          selectedModule={selectedModule}
          showTopicModel={showTopicModel}
          setShowTopicModel={setShowTopicModel}
        />
      )}
      {showSubTopicModel && (
        <AddSubTopicsModal
          selectedModule={selectedModule}
          showSubTopicModel={showSubTopicModel}
          setShowSubTopicModel={setShowSubTopicModel}
          selectedTopicValue={selectedTopic}
        />
      )}
      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="w-[300px]">
            <TextField
              inputRef={sessionNameRef}
              label="Enter Curriculum Name"
              variant="outlined"
              fullWidth
              value={sessionName}
              onChange={(e) => {
                // if (disableSubmit) setDisableSubmit(false);
                setSessionName(e.target.value);
                validateSessionName(e.target.value);
                if (nameError) {
                  setNameError("");
                }
              }}
             
              error={!!nameError}
              helperText={nameError}
              className="bg-white rounded-md"
            />
          </div>

          <div className="flex gap-x-2">
            <Stack spacing={2} sx={{ mb: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                component="span"
                size="large"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#4caf50",
                  "&:hover": {
                    backgroundColor: "#388e3c",
                  },
                }}
                onClick={() => setShowTopicModel(true)}
              >
                Add Topic
              </Button>
            </Stack>
            <Stack spacing={2} sx={{ mb: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                component="span"
                size="large"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#4caf50",
                  "&:hover": {
                    backgroundColor: "#388e3c",
                  },
                }}
                onClick={() => setShowSubTopicModel(true)}
              >
                Add SubTopic
              </Button>
            </Stack>
          </div>
        </div>

        {/* Snackbar Component */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{
            vertical: "top", // Position at the top
            horizontal: "right", // Position on the right
          }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>

        <ul className="flex flex-wrap space-x-4">
          {Array.isArray(modules) && modules.length > 0
            ? modules.map((_module) => (
                <li
                  className="flex items-center space-x-2 my-5"
                  key={_module.id}
                >
                  <input
                    type="radio"
                    name="module"
                    value={_module.id}
                    onChange={(e) => {
                      setSelectedModule(e.target.value);
                      setModuleError(null);
                    }}
                    id={_module.id}
                    // disabled={!showModules || edit}
                  />
                  <label htmlFor={_module.id}>{_module.moduleName}</label>
                </li>
              ))
            : "No Modules Found"}
        </ul>

        {moduleError && (
          <p style={{ color: "red", fontSize: "16px" }}>{moduleError}</p>
        )}
        <div className="w-full overflow-auto">
          <TableofApproval
            updateDeletedItems={updateDeletedItems}
            disableEdit={disableEdit}
            tableData={tableData}
            setTableData={setTableData}
            edit={curriculum_Id}
            setIsTableDirty={setIsTableDirty}
            isTableDirty={isTableDirty}
            selectedModule={selectedModule}
            setDisableSubmit={setDisableSubmit}
            disableSubmit={disableSubmit}
            setSelectedTopic={setSelectedTopic}
            setModuleError={setModuleError}
          />
        </div>

        <div className={clsx("flex", "justify-end gap-x-4")}>
          {curriculumData.status === "draft" && (
            <Button
              disabled={disableSubmit}
              variant="contained"
              color="primary"
              onClick={submitForApproval}
              className={
                "w-[240px] py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
              }
            >
              Submit for Approval
            </Button>
          )}

          {!edit && (
            <Button
              disabled={disableSubmit}
              variant="contained"
              color="primary"
              onClick={handleSave}
              className="w-[200px] py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
            >
              Save As Draft
            </Button>
          )}

          {curriculumData.status === "rejected" && (
            <>
              <Button
                disabled={disableSubmit}
                variant="contained"
                color="secondary"
                onClick={handleSave}
                className="w-[200px] py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
              >
                Save As Draft
              </Button>
              <Button
                disabled={disableSubmit}
                variant="contained"
                color="success"
                onClick={submitForApproval}
                className={
                  "w-[240px] py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
                }
              >
                Submit for Approval
              </Button>
            </>
          )}

          <Button
            disabled={disableSubmit}
            variant="contained"
            color="primary"
            onClick={edit ? handleSubmit : handleApproval}
            className={
              "w-[260px] py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
            }
          >
            {edit ? "Save Changes" : "Submit for Approval"}
          </Button>
        </div>
      </div>
    </div>
  );
}

const mapState = (state) => ({
  userId: JSON.parse(localStorage.getItem("auth")).userId,
});

const mapDispatch = {};

const CreateCourseCurriculum = connect(
  mapState,
  mapDispatch
)(CreateCourseCurriculumComponent);

export default CreateCourseCurriculum;
