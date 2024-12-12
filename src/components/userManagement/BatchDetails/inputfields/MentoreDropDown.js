import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMentorList } from "../../../../store/root.actions";
import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { setMentorId } from "../../../../store/slice/userManagement.slice";

function MentorDropDown() {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector(
    (store) => store.mentorListReducer
  );
  const { showWarn, mentorId } = useSelector(
    (store) => store.userManagementPageReducer
  );

  const handleChange = (event) => {
    dispatch(setMentorId(event.target.value));
  };

  return (
    <FormControl fullWidth>
      <InputLabel
        id="demo-multiple-checkbox-label"
        // error={showWarn && mentorId.length === 0}
      >
        Mentor
      </InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        // error={showWarn && mentorId.length === 0}
        value={mentorId}
        onChange={handleChange}
        input={<OutlinedInput label="Mentor" />}
        renderValue={(selected) =>
          selected
            .map((mentorId) => {
              const selectedMentor = data?.find(
                (mentor) => mentor.MENTOR_Id === mentorId
              );
              return selectedMentor ? selectedMentor.Mentor_Name : "";
            })
            .join(", ")
        }
      >
        {data &&
          data.map((mentor) => (
            <MenuItem key={mentor.MENTOR_Id} value={mentor.MENTOR_Id}>
              <Checkbox checked={mentorId?.indexOf(mentor.MENTOR_Id) > -1} />
              <ListItemText primary={mentor.Mentor_Name} />
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
}

export default MentorDropDown;
