import { connect } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function ModuleSelectorComponent({
  required,
  moduleData,
  selectedModule,
  setSelectedModule,
}) {
  return (
    <FormControl fullWidth>
      <InputLabel id="module-selector">
        Module {required && <span style={{ color: "#960000" }}>*</span>}
      </InputLabel>
      <Select
        id="module-selector"
        label="module"
        labelId="module-label"
        value={selectedModule}
        fullWidth
        onChange={(e) => setSelectedModule(e.target.value)}
      >
        {Array.isArray(moduleData) &&
          moduleData.map((module) => {
            return (
              <MenuItem key={module.ModuleID} value={module.ModuleID}>
                {module.ModuleName}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
}

const mapState = (state) => ({});

const ModuleSelector = connect(mapState, null)(ModuleSelectorComponent);

export default ModuleSelector;
