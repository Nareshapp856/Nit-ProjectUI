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
} from "@mui/material";
import { Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function SubTopicMuiModel({
  flag,
  technologyData,
  ModuleData,
  TopicData,
  addClick,
  editRow,
  popupclose,
  selectedFilters,
}) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    popupclose(false);
  };
  const [headerTitle, setHeaderTitle] = React.useState("");
  const [technologyid, setTechnologyId] = React.useState(0);
  const [moduleId, setModuleId] = React.useState(0);
  const [topic, setTopic] = React.useState(0);
  const [subtopic, setSubTopic] = React.useState("");
  const [topicDesc, setTopicDesc] = React.useState("");
  const [modulefilterData, setModuleData] = React.useState();
  const [topicfilterData, setTopicData] = React.useState();
  const selectedTechnologySelector = useSelector(
    (state) => state?.selectedTechnologyReducer
  );

  const onChangeTechnology = (event) => {
    var technologySelected = event.target.value;
    setTechnologyId(technologySelected);
    setModuleId(0);
    setTopic(0);
    var filterModuleDataa = ModuleData.filter(
      (x) => x.TechnologyID === technologySelected
    );
    setModuleData(filterModuleDataa);
  };
  const onChangeModule = (event) => {
    var moduleSelected = event.target.value;

    setTopic(0);
    setModuleId(moduleSelected);
    var filterTopicDataa = TopicData.filter(
      (x) => x.ModuleID === moduleSelected
    );

    setTopicData(filterTopicDataa);
  };
  const onChangeTopic = (event) => {
    var topicSelected = event.target.value;

    setTopic(topicSelected);
  };

  const onChangeSubTopic = (event) => {
    var inputTopic = event.target.value;
    setSubTopic(inputTopic);
  };
  React.useEffect(() => {
    // alert(selectedTechnologySelector.response?.technologyid)
    if (selectedFilters?.technologyid !== "") {
      setTechnologyId(selectedFilters?.technologyid);
    } else {
      // alert('rrrrr')
      setTechnologyId(0);
    }

    if (selectedFilters?.moduleid !== "") {
      setModuleId(selectedFilters?.moduleid);
      var filterModuleDataa = ModuleData.filter(
        (x) => x.TechnologyID === selectedFilters?.technologyid
      );
      setModuleData(filterModuleDataa);
    } else {
      // alert('rrrrr')
      setModuleId(0);
    }

    if (selectedFilters?.topicid !== "") {
      setTopic(selectedFilters?.topicid);
      var filterModuleDataa = TopicData.filter(
        (x) => x.ModuleID === selectedFilters?.moduleid
      );
      setTopicData(filterModuleDataa);
    } else {
      // alert('rrrrr')
      setTopic(0);
    }
  }, []);
  React.useEffect(() => {
    if (flag === "edit") {
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
      setSubTopic(editRow.SubTopicName);
      setHeaderTitle("Edit");
    } else {
      setHeaderTitle("Create");
      // setTechnologyId(0);
      // setModuleId(0);
      // setTopic(0);
      // setSubTopic('');
    }
  }, []);
  return (
    <div style={{ textAlign: "center" }}>
      <Dialog open={open} fullWidth maxWidth="sm">
        <DialogTitle>
          {headerTitle} Sub Topic
          <IconButton onClick={handleClose} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
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
            <FormControl sx={{ m: 0.5, minWidth: 220 }}>
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

            <FormControl>
              <h1>SubTopic</h1>
              <TextField
                disabled={topic === 0}
                color="secondary"
                onChange={(e) => onChangeSubTopic(e)}
                // onChange={e => setDateOfBirth(e.target.value)}
                value={subtopic}
                fullWidth
                required
              />
            </FormControl>

            <FormControl>
              {flag !== "edit" ? (
                <Button
                  disabled={
                    technologyid === 0 ||
                    moduleId === 0 ||
                    topic === 0 ||
                    subtopic === ""
                  }
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={() => {
                    var subTopic = {
                      topicID: topic,
                      subTopicID: null,
                      subTopicName: subtopic,
                      query: 1,
                    };
                    addClick(subTopic);
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
                    subtopic === ""
                  }
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={() => {
                    var subTopic = {
                      topicID: topic,
                      subTopicID: editRow.SubTopicID,
                      subTopicName: subtopic,
                      query: 2,
                    };
                    addClick(subTopic);
                  }}
                >
                  Edit
                </Button>
              )}
            </FormControl>
          </Stack>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SubTopicMuiModel;
