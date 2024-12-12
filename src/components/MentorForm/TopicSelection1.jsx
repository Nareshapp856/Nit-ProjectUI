import React from "react";
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";

const TopicSelection = ({ topics, selectedTopics, onTopicChange }) => {
  const handleCheckboxChange = (topic) => {
    onTopicChange(topic); // Pass the full topic object back to the parent
  };

  return (
    <Box mb={4}>
      <FormControl component="fieldset" fullWidth>
        <FormLabel component="legend" className="block text-gray-700">
          Topics
        </FormLabel>
        <FormGroup row>
          {topics.length > 0
            ? topics.map((topic) => (
                <FormControlLabel
                  key={topic.id}
                  control={
                    <Checkbox
                      checked={selectedTopics.some(
                        (selected) => selected.id === topic.id
                      )}
                      onChange={() => handleCheckboxChange(topic)}
                    />
                  }
                  label={topic.topicName}
                />
              ))
            : "No Topics available for this module"}
        </FormGroup>
      </FormControl>
    </Box>
  );
};

export default TopicSelection;
