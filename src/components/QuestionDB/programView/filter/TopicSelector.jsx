import { connect } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function TopicSelectorComponent({
  required,
  topicData,
  selectedTopic,
  setSelectedTopic,
}) {
  return (
    <FormControl fullWidth>
      <InputLabel id="topic-selector">
        Topic{required && <span style={{ color: "#960000" }}>*</span>}
      </InputLabel>
      <Select
        id="topic-selector"
        label="topic"
        labelId="topic-label"
        value={selectedTopic}
        fullWidth
        onChange={(e) => setSelectedTopic(e.target.value)}
      >
        {Array.isArray(topicData) &&
          topicData.map((topic) => {
            return (
              <MenuItem key={topic.TopicID} value={topic.TopicID}>
                {topic.TopicName}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
}

const mapState = (state) => ({});

const TopicSelector = connect(mapState, null)(TopicSelectorComponent);

export default TopicSelector;
