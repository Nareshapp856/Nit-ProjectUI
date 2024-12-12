import { connect } from "react-redux";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function SubTopicSelectorComponent({
  required,
  subTopicData,
  selectedSubTopic,
  setSelectedSubTopic,
}) {
  return (
    <FormControl fullWidth>
      <InputLabel id="sub-topic-selector">
        SubTopic {required && <span style={{ color: "#960000" }}>*</span>}
      </InputLabel>
      <Select
        id="sub-topic-selector"
        label="sub-topic"
        labelId="sub-topic-label"
        value={selectedSubTopic}
        fullWidth
        onChange={(e) => setSelectedSubTopic(e.target.value)}
      >
        {Array.isArray(subTopicData) &&
          subTopicData.map((subTopic) => {
            return (
              <MenuItem key={subTopic.SubTopicID} value={subTopic.SubTopicID}>
                {subTopic.SubTopicName}
              </MenuItem>
            );
          })}
      </Select>
    </FormControl>
  );
}

const mapState = (state) => ({});

const SubTopicSelector = connect(mapState, null)(SubTopicSelectorComponent);

export default SubTopicSelector;
