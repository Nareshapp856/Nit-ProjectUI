import { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { FormControl, Grid } from "@mui/material";

import {
  fetchModuleDispatch,
  fetchSubTopicDispatch,
  fetchTopicDispatch,
} from "../../../store/types";
import {
  resetModulesSlice,
  resetSubTopicsSlice,
  resetTechnologySlice,
  resetTopicsSlice,
} from "../../../store/slices/programView";

import TopicSelector from "./filter/TopicSelector";
import SubTopicSelector from "./filter/SubTopicSelector";
import TechnologySelector from "./filter/TechnologySelector";
import ModuleSelectorComponent from "./filter/ModuleSelector";

function FilterComponent({
  fetchModules,
  fetchTopics,
  fetchSubTopics,
  //
  selectedTopic,
  setSelectedTopic,
  selectedModule,
  setSelectedModule,
  selectedSubTopic,
  setSelectedSubTopic,
  selectedTechnology,
  setSelectedTechnology,
  //
  resetModule,
  resetTopic,
  resetSubTopic,
  //
  technologyData,
  moduleData,
  topicData,
  subTopicData,
}) {
  useEffect(() => {
    if (selectedTechnology) {
      fetchModules({ technologyId: selectedTechnology });
    }
  }, [selectedTechnology, fetchModules]);

  useEffect(() => {
    if (selectedModule) {
      fetchTopics({ moduleId: selectedModule });
    }
  }, [selectedModule, fetchTopics]);

  useEffect(() => {
    if (selectedTopic) {
      fetchSubTopics({ topicId: selectedTopic });
    }
  }, [selectedTopic, fetchSubTopics]);

  useEffect(() => {
    resetModule();
    setSelectedModule("");
  }, [selectedTechnology, resetModule]);

  useEffect(() => {
    resetTopic();
    setSelectedTopic("");
  }, [selectedModule, resetTopic]);

  useEffect(() => {
    resetSubTopic();
    setSelectedSubTopic("");
  }, [selectedTopic, resetSubTopic]);

  return (
    <Grid container spacing={1} marginTop={2} marginBottom={2}>
      <Grid width="100%" display="flex" flexWrap="wrap">
        <FormControl
          sx={{
            m: 1,
            width: "300px",
            display: "flex",
          }}
        >
          <TechnologySelector
            technologyData={technologyData}
            selectedTechnology={selectedTechnology}
            setSelectedTechnology={setSelectedTechnology}
          />
        </FormControl>

        <FormControl
          sx={{
            m: 1,
            width: "300px",
            display: "flex",
          }}
        >
          <ModuleSelectorComponent
            moduleData={moduleData}
            selectedModule={selectedModule}
            setSelectedModule={setSelectedModule}
          />
        </FormControl>

        <FormControl
          sx={{
            m: 1,
            width: "300px",
            display: "flex",
          }}
        >
          <TopicSelector
            topicData={topicData}
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
          />
        </FormControl>

        <FormControl
          sx={{
            m: 1,
            width: "300px",
            display: "flex",
          }}
        >
          <SubTopicSelector
            subTopicData={subTopicData}
            selectedSubTopic={selectedSubTopic}
            setSelectedSubTopic={setSelectedSubTopic}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  technologyState: state.p_technology,
  moduleState: state.p_module,
  topicState: state.p_topics,
  subTopicState: state.p_subTopics,
  //
  technologyData: state.p_technology.data,
  moduleData: state.p_modules.data,
  topicData: state.p_topics.data,
  subTopicData: state.p_subtopics.data,
});

const mapDispatch = {
  fetchModules: fetchModuleDispatch,
  fetchTopics: fetchTopicDispatch,
  fetchSubTopics: fetchSubTopicDispatch,
  resetTechnologies: resetTechnologySlice,
  resetModule: resetModulesSlice,
  resetTopic: resetTopicsSlice,
  resetSubTopic: resetSubTopicsSlice,
};

const Filter = connect(mapStateToProps, mapDispatch)(FilterComponent);

export default Filter;
