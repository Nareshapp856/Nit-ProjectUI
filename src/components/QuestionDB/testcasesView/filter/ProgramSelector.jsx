import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function ProgramSelectorComponent({
  error,
  required,
  programsData,
  selectedProgram,
  setSelectedProgram,
}) {
  const [programsList, setProgramsList] = useState([]);

  useEffect(() => {
    if (
      typeof programsData === "object" &&
      programsData !== null &&
      programsData !== undefined
    ) {
      if (Object.keys(programsData).length === 0) setProgramsList([]);
      else if (Object.keys(programsData).length)
        setProgramsList(Object.values(programsData));
      else setProgramsList(programsData);
    }
    if (programsData === null || programsData === undefined)
      setProgramsList([]);
  }, [programsData, setProgramsList]);

  return (
    <FormControl fullWidth>
      <InputLabel id="program-selector">
        Program {required && <span style={{ color: "#960000" }}>*</span>}
      </InputLabel>
      <Select
        id="program-selector"
        label="program"
        labelId="program-label"
        value={selectedProgram}
        error={error}
        fullWidth
        onChange={(e) => setSelectedProgram(e.target.value)}
      >
        {Array.isArray(programsList) &&
          programsList.map((program) => {
            return (
              <MenuItem key={program.ProgramId} value={program.ProgramId}>
                {program.ProgramName}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
}

const mapState = (state) => ({});

const mapDispatch = {};

const ProgramSelector = connect(
  mapState,
  mapDispatch
)(ProgramSelectorComponent);

export default ProgramSelector;
