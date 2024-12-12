import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FormControl, Grid } from "@mui/material";

import {
  t_fetchModuleDispatch,
  t_fetchProgramsDispatch,
  t_fetchSubTopicDispatch,
  t_fetchTopicDispatch,
} from "../../../store/types";
import {
  resetModulesSlice,
  resetSubTopicsSlice,
  resetTechnologySlice,
  resetTopicsSlice,
} from "../../../store/slices/testcaseVite";
import TopicSelector from "./filter/TopicSelector";
import SubTopicSelector from "./filter/SubTopicSelector";
import TechnologySelector from "./filter/TechnologySelector";
import ModuleSelectorComponent from "./filter/ModuleSelector";
import ProgramSelector from "./filter/ProgramSelector";

function FilterComponent({
  fetchModules,
  fetchTopics,
  fetchSubTopics,
  fetchPrograms,
  //
  programsData,
  selectedTopic,
  setSelectedTopic,
  selectedModule,
  setSelectedModule,
  selectedProgram,
  setSelectedProgram,
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
  // when user navigated to page first time don't set state to "" instead set them to query data
  const [firstUpdate, setFirstUpdate] = useState({
    module: true,
    topic: true,
    subTopic: true,
    program: true,
  });

  useEffect(() => {
    fetchPrograms({
      technologyId: selectedTechnology,
      moduleId: selectedModule,
      topicId: selectedTopic,
      subTopicId: selectedSubTopic,
    });

    if (firstUpdate.program) {
      setFirstUpdate((prev) => ({ ...prev, program: false }));
    } else {
      setSelectedProgram("");
    }
  }, [selectedTechnology, selectedModule, selectedTopic, selectedSubTopic]);

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

    if (firstUpdate.module) {
      setFirstUpdate((prev) => ({ ...prev, module: false }));
    } else {
      setSelectedModule("");
    }
  }, [selectedTechnology, resetModule]);

  useEffect(() => {
    resetTopic();

    if (firstUpdate.topic) {
      setFirstUpdate((prev) => ({ ...prev, topic: false }));
    } else {
      setSelectedTopic("");
    }
  }, [selectedModule, resetTopic]);

  useEffect(() => {
    resetSubTopic();

    if (firstUpdate.subTopic) {
      setFirstUpdate((prev) => ({ ...prev, subTopic: false }));
    } else {
      setSelectedSubTopic("");
    }
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

        <FormControl
          sx={{
            m: 1,
            width: "300px",
            display: "flex",
          }}
        >
          <ProgramSelector
            programsData={programsData}
            selectedTopic={selectedTopic}
            selectedModule={selectedModule}
            selectedProgram={selectedProgram}
            selectedSubTopic={selectedSubTopic}
            setSelectedProgram={setSelectedProgram}
            selectedTechnology={selectedTechnology}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  technologyData: state.t_technology.data,
  moduleData: state.t_modules.data,
  topicData: state.t_topics.data,
  subTopicData: state.t_subtopics.data,
  programsData: state.t_programs.data,
});

const mapDispatch = {
  fetchModules: t_fetchModuleDispatch,
  fetchTopics: t_fetchTopicDispatch,
  fetchSubTopics: t_fetchSubTopicDispatch,
  fetchPrograms: t_fetchProgramsDispatch,

  resetTechnologies: resetTechnologySlice,
  resetModule: resetModulesSlice,
  resetTopic: resetTopicsSlice,
  resetSubTopic: resetSubTopicsSlice,
};

const Filter = connect(mapStateToProps, mapDispatch)(FilterComponent);

export default Filter;
