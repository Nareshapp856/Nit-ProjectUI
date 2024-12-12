import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchModuleList } from "../../../../store/root.actions"; // Assuming you have a fetchModuleList action
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { setModuleId } from "../../../../store/slice/userManagement.slice";

function ModuleDropDownComponent({
  modules,
  moduleId,
  technologyId,
  isLoading,
  isError,
  dispatchFetch,
  setModuleIdDispatch,
  showWarn,
}) {
  useEffect(() => {
    if (technologyId) dispatchFetch(technologyId);
  }, [technologyId]);

  console.log(modules);
  const handleChange = (event) => {
    setModuleIdDispatch(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel
        id="module-DropDown-label" //error={showWarn && !moduleId}
      >
        Module
      </InputLabel>
      <Select
        labelId="module-DropDown-label"
        id="module-DropDown"
        value={moduleId}
        label="Module"
        onChange={handleChange}
        // error={showWarn && !moduleId}
      >
        <MenuItem value={0}>Select A Module</MenuItem>
        {modules &&
          modules.map((module) => (
            <MenuItem key={module.ModuleID} value={module.ModuleID}>
              {module.ModuleName}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

const mapModuleSlice = (state) => ({
  modules: state.modulesListReducer.data,
  isLoading: state.modulesListReducer.isLoading,
  isError: state.modulesListReducer.isError,
  technologyId: state.userManagementPageReducer.technologyId,
  moduleId: state.userManagementPageReducer.moduleId,
  showWarn: state.userManagementPageReducer.showWarn,
});

const mapDispatch = {
  dispatchFetch: (technologyId) => fetchModuleList(technologyId),
  setModuleIdDispatch: (item) => setModuleId(item),
};

const ModuleDropDown = connect(
  mapModuleSlice,
  mapDispatch
)(ModuleDropDownComponent);

export default ModuleDropDown;
