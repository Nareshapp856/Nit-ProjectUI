import {
  Autocomplete,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import { Snackbar, Alert } from "@mui/material";

import axios from "axios";
import { useEffect, useState } from "react";
import { fetchApprovedCurriculumListAPI } from "../../store/Faculty/api";
import { connect } from "react-redux";

const fetchCurriculumList = async (payload, setter) => {
  try {
    const res = await axios.get(
      `http://49.207.10.13:4017/api/fetchBatchIdByFacultyId?facultyId=${payload.userId}`
    );
    setter(res.data || []);
  } catch (error) {
    console.error(error);
  }
};

function AssignFormComponent({
  labels,
  onDateTimeChange,
  selectedCurriculum,
  onCurriculumChange,
  userId,
  courseCurriculumList,
  
}) {
  const [curriculumList, setCurriculumList] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    fetchCurriculumList({ userId }, setCurriculumList);
    handleTimeSlotChange();
  }, [userId]);


  const handleTimeSlotChange = async () => {
    const res = await axios.get(
      "http://49.207.10.13:4017/api/retrieveAvailableSlots"
    );
    setTimeSlots(res.data);
  };

  
  const formatDate = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const uniqueCurriculumData = curriculumList.length > 1 
    ? curriculumList.reduce((acc, current) => {
        const x = acc.find(
          (batch) => batch.courseCurriculam_Name === current.courseCurriculam_Name
        );
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []) 
    : curriculumList;
    
    const today = new Date().toISOString().split("T")[0];

    function formatTimeToAMPM(timeString) {
      const timeParts = timeString.split(':'); // Splitting hours, minutes, seconds
      let hours = parseInt(timeParts[0], 10); // Get the hours
      const minutes = timeParts[1]; // Get the minutes
      const period = hours >= 12 ? 'PM' : 'AM'; // Determine AM/PM
      
      // Convert hours to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // The hour '0' should be '12'
    
      return `${hours}:${minutes} ${period}`; // Return formatted time
    }

  return (
    <div className="p-4 pt-2">

      {/* Curriculum Section */}
      <Grid container spacing={3} marginTop={2}>
        <Grid
          item
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Typography sx={{ width: 190 }}>My Approved Curriculum:</Typography>
          </Grid>

          <Grid item>
            <Autocomplete
              sx={{ width: 400 }}
              disablePortal
              options={courseCurriculumList || []}
              disabled={!labels}
              value={
                selectedCurriculum
                  ? courseCurriculumList.find(
                      (curriculum) =>
                        // console.log(curriculum, selectedCurriculum),
                        curriculum.curriculamId === selectedCurriculum 
                        // || labels ? labels.curriculam_Id : ''
                    )
                  : null
              }
              getOptionLabel={(option) => option.courseCurriculam_Name}
              onChange={(e, newValue) =>{
                onCurriculumChange(
                  newValue ? newValue.curriculamId : null
                );

              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select A Curriculum"
                  variant="outlined"
                />
              )}
            />
          </Grid>
        </Grid>
      </Grid>

      {/* First Row: Batch Name and Technology */}
      {/* <Grid container spacing={3}> */}
      {/* <Grid item xs={12} md={6}>
          <TextField
            label="Batch Name"
            disabled={!labels}
            value={labels?.name || ""}
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{
              shrink: labels?.name,
            }}
            sx={{
              "& .MuiOutlinedInput-root.Mui-disabled": {
                color: "rgba(0, 0, 0, 0.6)",
              },
            }}
          />
        </Grid> */}
      {/* <Grid item xs={12} md={6}>
          <TextField
            label="Test Description"
            disabled={!labels}
            value={labels?.technologyName || ""}
            variant="outlined"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{
              shrink: labels?.technologyName,
            }}
            sx={{
              "& .MuiOutlinedInput-root.Mui-disabled": {
                color: "rgba(0, 0, 0, 0.6)",
              },
            }}
          />
        </Grid> */}
      {/* </Grid> */}

      {/* Second Row: Time and Date */}
      <Grid container spacing={3} marginTop={2}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Start Date"
            // disabled={labels.startDate ? true: false}
            value={labels?.startDate ? labels.startDate : ""}
            onChange={onDateTimeChange}
            variant="outlined"
            name="startDate"
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              "& .MuiOutlinedInput-root.Mui-disabled": {
                color: "rgba(0, 0, 0, 0.6)",
              },
            }}
            inputProps={{
              min: today, // Disable all previous dates
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="End Date"
            disabled={labels.endDate ? true: false}
            value={labels?.endDate ? labels.endDate : ""}
            onChange={onDateTimeChange}
            variant="outlined"
            name="endDate"
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              "& .MuiOutlinedInput-root.Mui-disabled": {
                color: "rgba(0, 0, 0, 0.6)",
              },
            }}
            inputProps={{
              min: today, // Disable all previous dates
            }}
          />
        </Grid>
      </Grid>

      {/* Third Row: Start Time and End Time */}
      <Grid container spacing={3} marginTop={2}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined" disabled={!labels}>
                <InputLabel>Start Time</InputLabel>
                <Select
                  value={labels.startTime? labels.startTime : ''}
                  onChange={(e) => onDateTimeChange(e)}
                  label={`Start Time`}
                  name="startTime"
                >
                  {timeSlots.map((timeSlot, index) => (
                    <MenuItem key={index} value={timeSlot.teststarttime}>
                      { formatTimeToAMPM(timeSlot.teststarttime)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="outlined" disabled={!labels}>
                <InputLabel>End Time</InputLabel>
                <Select
                  value={labels.endTime ? labels.endTime : ''}
                  onChange={(e) =>{ 
                    const endH=e.target.value.split(':')[0];
                    const startH=labels.startTime.split(':')[0];
                    if(endH > startH){
                      onDateTimeChange(e)
                    }
                    else{
                      alert("please select Correct EndTime");
                    }
                    
                  }}
                  label="End Time"
                  name="endTime"
                >
                  {timeSlots.map(
                    (timeSlot, index) => (
                      (
                        <MenuItem key={index} value={timeSlot.testEndTime}>
                          { formatTimeToAMPM(timeSlot.testEndTime)}
                        </MenuItem>
                      )
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      
    </div>
  );
}

const mapState = (state) => ({
  userId: JSON.parse(localStorage.getItem("auth")).userId,
});

const AssignForm = connect(mapState)(AssignFormComponent);

export default AssignForm;
