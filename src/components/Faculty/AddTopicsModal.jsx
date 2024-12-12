import {
  Box,
  Modal,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { addTopicAPI } from "../../store/Faculty/api";
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

const AddTopicsModal = ({
  showTopicModel,
  setShowTopicModel,
  selectedModule,
}) => {
  console.log("module id:", selectedModule);
  const [topic, setTopic] = useState("");
  const [topicError, setTopicError] = useState("");

  const { fetchTopics } = useTopicsList();

  const handleAddTopic = async () => {
    if (!topic.trim()) {
      setTopicError("Topic name is required");
      return;
    } else {
      setTopicError("");
    }

    try {
      if (
        selectedModule === "" ||
        selectedModule === undefined ||
        selectedModule === null
      ) {
        alert("Module is not selected");
        return;
      }
      const res = await addTopicAPI({
        moduleId: selectedModule,
        topicName: topic,
      });
      console.log("add topic response:", res);
      if (res.status === 201) {
        setTopic("");
        setShowTopicModel(false);
        fetchTopics({ ModuleID: selectedModule });
      }
    } catch (error) {
      console.error("An error occurred while adding the topic:", error);
      if (error.response.status === 409) {
        setTopicError("This topic already exists.");
        return;
      }
      setTopicError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <Modal open={showTopicModel} onClose={() => setShowTopicModel(false)}>
      <Box sx={style}>
        <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
          Add New Topic
        </Typography>
        {/* <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Module Name: <strong>{selectedModule && selectedModule.moduleName}</strong>
        </Typography> */}
        <TextField
          label="Enter Topic Name"
          variant="outlined"
          fullWidth
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          error={Boolean(topicError)}
          helperText={topicError}
          sx={{ mb: 3 }}
        />
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={() => setShowTopicModel(false)}
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
            Add Topic
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddTopicsModal;
