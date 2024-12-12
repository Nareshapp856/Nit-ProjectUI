import React from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from "@mui/material";

const ModuleSelection3 = ({ modules, onModuleChange }) => {
  return (
    <Box mb={4}>
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend" className="block text-gray-700">
          Module
        </FormLabel>
        <RadioGroup row aria-label="module" name="module">
          {Array.isArray(modules) &&
            modules.length > 0 &&
            modules.map((mod, index) => (
              <FormControlLabel
                key={index}
                value={mod.id}
                control={<Radio />}
                label={mod.moduleName}
                onChange={() => onModuleChange(mod.id)}
              />
            ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default ModuleSelection3;
