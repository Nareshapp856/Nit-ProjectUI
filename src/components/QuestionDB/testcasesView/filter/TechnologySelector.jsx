import { connect } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function TechnologySelectorComponent({
  required,
  technologyData,
  selectedTechnology,
  setSelectedTechnology,
  //
}) {
  return (
    <FormControl fullWidth>
      <InputLabel id="technology-label">
        Technology {required && <span style={{ color: "#960000" }}>*</span>}
      </InputLabel>
      <Select
        id="technology-selector"
        label="technology"
        labelId="technology-label"
        value={selectedTechnology}
        fullWidth
        onChange={(e) => setSelectedTechnology(e.target.value)}
      >
        {Array.isArray(technologyData) &&
          technologyData.map((technology) => {
            return (
              <MenuItem
                key={technology.TechnologyID}
                value={technology.TechnologyID}
              >
                {technology.TechnologyName}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
}

const mapState = (state) => ({});

const mapDispatch = {};

const TechnologySelector = connect(
  mapState,
  mapDispatch
)(TechnologySelectorComponent);

export default TechnologySelector;
