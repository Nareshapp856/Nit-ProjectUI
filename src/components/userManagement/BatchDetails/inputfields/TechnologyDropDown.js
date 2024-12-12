import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchTechnologyList } from "../../../../store/root.actions";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { setTechnologyId } from "../../../../store/slice/userManagement.slice";

function TechnologyDropDownComponent({
  technologies,
  technologyId,
  isLoading,
  isError,
  dispatchFetch,
  setTechnologyIdDispatch,
  showWarn,
}) {
  const handleChange = (event) => {
    setTechnologyIdDispatch(event.target.value);
  };

  useEffect(() => {
    dispatchFetch();
  }, [dispatchFetch]);

  return (
    <FormControl fullWidth required>
      <InputLabel
        id="technology-DropDown-label"
        error={showWarn && !technologyId}
      >
        <span>Technology</span>
      </InputLabel>
      <Select
        labelId="technology-DropDown-label"
        id="technology-DropDown"
        value={technologyId}
        label="Technology"
        onChange={handleChange}
        error={showWarn && !technologyId}
      >
        <MenuItem value={0}>Select A Technology</MenuItem>
        {technologies &&
          technologies?.map((technology) => (
            <MenuItem
              key={technology.TechnologyID}
              value={technology.TechnologyID}
            >
              {technology.TechnologyName}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

const mapTechnologySlice = (state) => ({
  technologies: state.technologiesListReducer.data,
  isLoading: state.technologiesListReducer.isLoading,
  isError: state.technologiesListReducer.isError,
  technologyId: state.userManagementPageReducer.technologyId,
  showWarn: state.userManagementPageReducer.showWarn,
});

const mapDispatch = {
  dispatchFetch: fetchTechnologyList,
  setTechnologyIdDispatch: (item) => setTechnologyId(item),
};

const TechnologyDropDown = connect(
  mapTechnologySlice,
  mapDispatch
)(TechnologyDropDownComponent);

export default TechnologyDropDown;
