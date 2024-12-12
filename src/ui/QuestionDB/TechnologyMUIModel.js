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

function TechnologyMUIModel({
  flag,
  addClick,
  editRow,
  programData,
  //   iscrudpopup,
  popupclose,
}) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    popupclose(false);
  };
  const [programcode, setProgramCode] = React.useState(0);
  const [technologyid, setTechnologyId] = React.useState(0);
  const [technology, setTechnology] = React.useState("");
  const [description, setTechnologyDesc] = React.useState("");
  const [headerTitle, setHeaderTitle] = React.useState("");

  // const programCodes=[];
  // programCodes.push({ProgramCode:'NIT0001'});
  // programCodes.push({ProgramCode:'NIT0002'});

  React.useEffect(() => {
    if (flag === "edit") {
      setTechnologyId(editRow.TechnologyID);
      setTechnology(editRow.TechnologyName);
      setTechnologyDesc(editRow.Description);
      setProgramCode(editRow.ProgramCode);
      setHeaderTitle("Edit");
    } else {
      setHeaderTitle("Create");
    }
    setOpen(true);
  }, []);
  //alert(programcode);
  return (
    <div style={{ textAlign: "center" }}>
      <Dialog open={open} fullWidth maxWidth="sm">
        <DialogTitle>
          {headerTitle} Technology
          <IconButton onClick={handleClose} style={{ float: "right" }}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>{" "}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <FormControl sx={{ m: 1, minWidth: 220 }}>
              <h1>Program Code</h1>
              <Select
                value={programcode}
                onChange={(event) => {
                  setProgramCode(event.target.value);
                }}
                fullWidth
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={0}>
                  <em>None</em>
                </MenuItem>
                {programData?.map((rec) => {
                  return (
                    <MenuItem value={rec.ProgramCode}>
                      {rec.ProgramCode}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl>
              <h1>Technology</h1>
              <TextField
                color="secondary"
                onChange={(e) => setTechnology(e.target.value)}
                value={technology}
                fullWidth
                required
              />
            </FormControl>
            <FormControl>
              <h1>Description</h1>
              <TextField
                color="secondary"
                onChange={(e) => setTechnologyDesc(e.target.value)}
                value={description}
                fullWidth
              />
            </FormControl>
            <FormControl>
              {flag !== "edit" ? (
                <Button
                  disabled={technology === "" || programcode === 0}
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={() => {
                    var iteminner = {
                      TechnologyID: null,
                      TechnologyName: technology,
                      Description: description,
                      programCode: programcode,
                      action: flag,
                    };
                    addClick(iteminner);
                  }}
                >
                  Add
                </Button>
              ) : (
                <Button
                  disabled={technology === "" || programcode === 0}
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={() => {
                    var iteminner = {
                      TechnologyID: technologyid,
                      TechnologyName: technology,
                      Description: description,
                      action: flag,
                      programCode: programcode,
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

export default TechnologyMUIModel;
