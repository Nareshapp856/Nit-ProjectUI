import React from "react";
import { TextField, Grid, Box, Typography } from "@mui/material";

const MarksInput = ({ selectedTopics, marks, setMarks, setMaxMarks }) => {
  const handleMaxMarksChange = (topicId, value) => {
    setMaxMarks((prevMaxMarks) => ({
      ...prevMaxMarks,
      [topicId]: Number(value),
    }));
  };

  return (
    <Box mb={4}>
      <Typography variant="h6" gutterBottom>
        Configure Marks
      </Typography>
      {selectedTopics.map((topic) => (
        <Grid container spacing={2} alignItems="center" key={topic.id}>
          <Grid item xs={6}>
            <Typography>{topic.topicName}</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="number"
              label="Max Marks"
              value={marks[topic.id] || ""}
              onChange={(e) => {
                handleMaxMarksChange(topic.id, e.target.value);
                setMarks(topic.id, e.target.value);
              }}
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default MarksInput;
