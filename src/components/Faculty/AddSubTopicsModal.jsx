import {
  Box,
  Modal,
  Stack,
  TextField,
  Typography,
  Button,
  Autocomplete,
} from "@mui/material";
import React, { useState } from "react";
import { addSubTopicAPI } from "../../store/Faculty/api";
import { useTopicsList } from "../../context/Faculty/topicsListContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  outline: "none",
};

const AddSubTopicsModal = ({
  showSubTopicModel,
  setShowSubTopicModel,
  selectedModule,
  selectedTopicValue,
}) => {
  console.log("selected topic value:", selectedTopicValue);
  const [subTopic, setSubTopic] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(selectedTopicValue);
  const [subTopicError, setSubTopicError] = useState("");
  const [selectedTopicError, setSelectedTopicError] = useState("");

  const { topicsList, fetchSubTopics } = useTopicsList();

  const handleAddTopic = async () => {
    console.log("Handling subtopics");
    let valid = true;

    if (!subTopic.trim()) {
      setSubTopicError("SubTopic name is required");
      valid = false;
    } else {
      setSubTopicError("");
    }
    console.log("subtopic name:", subTopic);

    if (!selectedTopic) {
      setSelectedTopicError("Topic selection is required");
      valid = false;
    } else {
      setSelectedTopicError("");
    }
    console.log("topic name:", selectedTopic, selectedTopicValue);
    if (
      selectedModule === "" ||
      selectedModule === null ||
      selectedModule === undefined
    ) {
      alert("Module is not selected");
      return;
    }
    if (!valid) return;

    try {
      const res = await addSubTopicAPI({
        moduleId: selectedModule,
        topicId: selectedTopic.TopicId,
        subTopicName: subTopic,
      });
      console.log("sub topic add res:", res);
      if (res.status === 201) {
        setSubTopic("");
        setSelectedTopic(null);
        setShowSubTopicModel(false);
        fetchSubTopics(selectedTopic.TopicId);
      }
    } catch (error) {
      if (error.response.status === 409) {
        setSubTopicError("This subtopic already exists.");
        return;
      }
      setSubTopicError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <Modal open={showSubTopicModel} onClose={() => setShowSubTopicModel(false)}>
      <Box sx={style}>
        <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
          Add New SubTopic
        </Typography>

        <Autocomplete
          disablePortal
          fullWidth
          options={topicsList}
          value={selectedTopic}
          onChange={(event, newValue) => setSelectedTopic(newValue)}
          getOptionLabel={(option) => option.TopicName}
          isOptionEqualToValue={(option, value) => option.TopicID === value.TopicID} // Custom equality check
          sx={{ mb: 3 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Topic"
              error={Boolean(selectedTopicError)}
              helperText={selectedTopicError}
            />
          )}
          renderOption={(props, option) =>
            topicsList.length === 0 ? (
              <li {...props} style={{ textAlign: "center", color: "#888888" }}>
                No Topics Found
              </li>
            ) : (
              <li {...props}>{option.TopicName}</li>
            )
          }
        />

        <TextField
          label="Enter SubTopic Name"
          variant="outlined"
          fullWidth
          value={subTopic}
          onChange={(e) => setSubTopic(e.target.value)}
          error={Boolean(subTopicError)}
          helperText={subTopicError}
          sx={{ mb: 3 }}
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={() => setShowSubTopicModel(false)}
            sx={{
              textTransform: "none",
              borderColor: "rgba(0, 0, 0, 0.23)",
              "&:hover": {
                borderColor: "rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddTopic}
            sx={{
              textTransform: "none",
              backgroundColor: "#3f51b5",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#303f9f",
              },
            }}
          >
            Add SubTopic
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddSubTopicsModal;
