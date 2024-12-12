import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  TextField,
  Stack,
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
import CloseIcon from "@mui/icons-material/Close";
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

function ModuleMUIModel({
  flag,
  technologyData,
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

  const [module, setModule] = React.useState("");
  const [moduleId, setModuleId] = React.useState(0);
  const [moduleDesc, setModuleDesc] = React.useState("");
  const [headerTitle, setHeaderTitle] = React.useState("");

  const onChangeTechnology = (event) => {
    var technologySelected = event.target.value;
    setTechnologyId(technologySelected);
  };
  const selectedTechnologySelector = useSelector(
    (state) => state?.selectedTechnologyReducer
  );
  React.useEffect(() => {
    // alert(selectedTechnologySelector.response?.technologyid)
    if (selectedFilters?.technologyid !== "") {
      setTechnologyId(selectedFilters.technologyid);
    } else {
      // alert('rrrrr')
      setTechnologyId(0);
    }
  }, [selectedTechnologySelector]);
  React.useEffect(() => {
    if (flag === "edit") {
      setTechnologyId(editRow.TechnologyID);
      setModule(editRow.ModuleName);
      setModuleId(editRow.ModuleID);
      setModuleDesc(editRow.Description);
      setHeaderTitle("Edit");
    } else {
      setHeaderTitle("Create");
    }
  }, []);
  return (
    <div style={{ textAlign: "center" }}>
      <Dialog open={open} fullWidth maxWidth="sm">
        <DialogTitle>
          {headerTitle} Module
          <IconButton onClick={handleClose} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <FormControl>
              <h1>Technology</h1>
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
              <h1>Module</h1>
              <TextField
                color="secondary"
                onChange={(e) => setModule(e.target.value)}
                value={module}
                fullWidth
              />
            </FormControl>
            <FormControl>
              <h1>Description</h1>
              <TextField
                color="secondary"
                onChange={(e) => setModuleDesc(e.target.value)}
                value={moduleDesc}
                fullWidth
              />
            </FormControl>
            <FormControl>
              {flag !== "edit" ? (
                <Button
                  disabled={technologyid === 0 || module === ""}
                  variant="outlined"
                  color="secondary"
                  type="submit"
                  onClick={() => {
                    var iteminner = {
                      ModuleID: "",
                      TechnologyID: technologyid,
                      ModuleName: module,
                      Description: moduleDesc,
                      action: flag,
                    };
                    addClick(iteminner);
                  }}
                >
                  Add
                </Button>
              ) : (
                <Button
                  disabled={technologyid === 0 || module === ""}
                  variant="outlined"
                  color="secondary"
                  type="submit"
                  onClick={() => {
                    var iteminner = {
                      ModuleID: moduleId,
                      TechnologyID: technologyid,
                      ModuleName: module,
                      Description: moduleDesc,
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

export default ModuleMUIModel;
