import { MenuItem, Select } from "@mui/material";
import React from "react";

function SelectMenu({ defaultValue, options, setter, label, changeHandler }) {
  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={defaultValue}
      label={label}
      onChange={(e) => {
        changeHandler(e.target.value);
        setter(e.target.value);
      }}
      sx={{ textAlign: "start" }}
    >
      <MenuItem key={-1} value={"0"}>
        {`Select a ${label}`}
      </MenuItem>
      {options.map((ele, index) => {
        return (
          <MenuItem key={index} value={ele.value}>
            {ele.option}
          </MenuItem>
        );
      })}
    </Select>
  );
}

export default SelectMenu;
