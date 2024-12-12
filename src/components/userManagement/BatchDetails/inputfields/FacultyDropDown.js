import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFacultyList } from "../../../../store/root.actions";
import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { setFaculityId } from "../../../../store/slice/userManagement.slice";

function FacultyDropDown() {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector(
    (store) => store.facultyListReducer
  );
  const { showWarn, facultyId } = useSelector(
    (store) => store.userManagementPageReducer
  );

  const handleChange = (event) => {
    dispatch(setFaculityId(event.target.value));
  };

  return (
    <FormControl fullWidth>
      <InputLabel
        id="demo-multiple-checkbox-label"
        // error={showWarn && facultyId.length === 0}
      >
        Faculty
      </InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        // error={showWarn && facultyId.length === 0}
        multiple
        value={facultyId}
        onChange={handleChange}
        input={<OutlinedInput label="Faculty" />}
        renderValue={(selected) =>
          selected
            .map((facultyId) => {
              const selectedFaculty = data?.find(
                (faculty) => faculty.Facaulty_Id === facultyId
              );
              return selectedFaculty ? selectedFaculty.Facaulty_Name : "";
            })
            .join(", ")
        }
      >
        {data &&
          data.map((faculty) => (
            <MenuItem key={faculty.Facaulty_Id} value={faculty.Facaulty_Id}>
              <Checkbox checked={facultyId?.includes(faculty.Facaulty_Id)} />
              <ListItemText primary={faculty.Facaulty_Name} />
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default FacultyDropDown;
