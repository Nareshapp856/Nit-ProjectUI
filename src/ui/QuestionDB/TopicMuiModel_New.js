import * as React from "react";
import {
  TextField,
  Stack,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "@mui/material/MenuItem";
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

function TopicMuiModel_New({
  flag,
  technologyData,
  ModuleData,
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

  const [technologyid, setTechnologyId] = React.useState(0);
  const [moduleId, setModuleId] = React.useState(0);
  const [topic, setTopic] = React.useState("");
  const [topicDesc, setTopicDesc] = React.useState("");
  const [modulefilterData, setModuleData] = React.useState([]);
  const [headerTitle, setHeaderTitle] = React.useState("");

  const selectedTechnologySelector = useSelector(
    (state) => state?.selectedTechnologyReducer
  );
  const onChangeTechnology = (event) => {
    var technologySelected = event.target.value;
    setTechnologyId(technologySelected);
    var filterModuleDataa = ModuleData.filter(
      (x) => x.TechnologyID === technologySelected
    );
    setModuleData(filterModuleDataa);
    setModuleId(0);
  };
  const onChangeModule = (event) => {
    var moduleSelected = event.target.value;
    setModuleId(moduleSelected);
  };
  const onChangeTopic = (event) => {
    var inputTopic = event.target.value;
    setTopic(inputTopic);
  };

  React.useEffect(() => {
    // alert(selectedTechnologySelector.response?.technologyid)
    if (selectedFilters?.technologyid !== 0) {
      setTechnologyId(selectedFilters?.technologyid);
    } else {
      // alert('rrrrr')
      setTechnologyId(0);
    }

    if (selectedFilters?.moduleid !== 0) {
      setModuleId(selectedFilters?.moduleid);
      var filterModuleDataa = ModuleData.filter(
        (x) => x.TechnologyID === selectedFilters?.technologyid
      );
      setModuleData(filterModuleDataa);
    } else {
      // alert('rrrrr')
      setModuleId(0);
      setModuleData(ModuleData);
    }
  }, []);
  React.useEffect(() => {
    if (flag === "edit") {
      setTechnologyId(editRow.TechnologyID);
      var filterModuleDataa = ModuleData.filter(
        (x) => x.TechnologyID === editRow.TechnologyID
      );
      setModuleData(filterModuleDataa);
      setModuleId(editRow.ModuleID);
      setTopic(editRow.TopicName);
      setTopicDesc(editRow.Description);
      setHeaderTitle("Edit");
    }
    //   else{
    //      setTechnologyId(0)
    //     setModuleData([]);
    // setModuleId(0);
    // // setTopic('');
    // // setTopicDesc('');
    setHeaderTitle("Create");
    //   }
  }, []);
  return (
    <div style={{ textAlign: "center" }}>
      <Dialog open={open} fullWidth maxWidth="sm">
        <DialogTitle>
          {headerTitle} Topic
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
            <FormControl>
              <h1>Topic</h1>
              <TextField
                color="secondary"
                onChange={(e) => onChangeTopic(e)}
                value={topic}
                fullWidth
                required
              />
            </FormControl>
            <FormControl>
              <h1>Description</h1>
              <TextField
                color="secondary"
                onChange={(e) => setTopicDesc(e.target.value)}
                value={topicDesc}
                fullWidth
              />
            </FormControl>
            <FormControl>
              {flag !== "edit" ? (
                <Button
                  disabled={
                    technologyid === 0 || moduleId === 0 || topic === ""
                  }
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={() => {
                    var iteminner = {
                      TechnologyID: technologyid,
                      moduleID: moduleId,
                      Topic: topic,
                      Description: topicDesc,
                      action: flag,
                    };
                    addClick(iteminner);
                  }}
                >
                  Add
                </Button>
              ) : (
                <Button
                  disabled={
                    technologyid === 0 || moduleId === 0 || topic === ""
                  }
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={() => {
                    var iteminner = {
                      TopicID: editRow.TopicID,
                      TechnologyID: technologyid,
                      moduleID: moduleId,
                      Topic: topic,
                      Description: topicDesc,
                      action: flag,
                    };
                    addClick(iteminner);
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

export default TopicMuiModel_New;
