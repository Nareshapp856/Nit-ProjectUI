import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getModuleNames,
  getSubTopicNames,
  getTopicNames,
  queryClient,
} from "../../util/http";
import BuilderService from "../../services/builder";
import { LocalStorage } from "../../services/LocalStorage";
import TopicsContext, {
  TopicsContextProvider,
} from "../../context/topicsContext";
import QuestionViewHandler from "../../ui/QuestionViewHandler";
import axios from "axios";

function QusetionViewTechnlogy({
  selectedModule,
  setSelectedModule,
  selectedTopic,
  setSelectedTopic,
  selectedSubTopic,
  setSelectedSubTopic,
  questionView,
  setQuestionView,
}) {
  useEffect(() => {}, [selectedModule]);
  useEffect(() => {}, [selectedTopic]);
  useEffect(() => {}, [selectedSubTopic]);

  return (
    <>
      <section className="flex justify-between w-full">
        <TopicsContextProvider>
          <ModuleDataLoader
            selectedModule={selectedModule}
            setSelectedModule={setSelectedModule}
          />
          {selectedModule && (
            <TopicDataLoader
              selectedModule={selectedModule}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
            />
          )}
          {selectedTopic &&
          LocalStorage.topicData &&
          LocalStorage._getTopicDataById() ? (
            <SubTopicDataLoader
              selectedTopic={setSelectedTopic}
              selectedSubTopic={selectedSubTopic}
              setSelectedSubTopic={setSelectedSubTopic}
              questionView={questionView}
              setQuestionView={setQuestionView}
            />
          ) : (
            <div className="max-w-[30%] overflow-hidden flex flex-col">
              <span>
                <label htmlFor="subtopicName">Sub Topic Name:</label>
              </span>
              <select id="subtopicName" name="subtopicName" className="">
                <option value="selectsubtopic">Select A Subtopic</option>
              </select>
            </div>
          )}
        </TopicsContextProvider>
      </section>
    </>
  );
}

export default QusetionViewTechnlogy;

function ModuleDataLoader({ selectedModule, setSelectedModule }) {
  const { data: moduleData } = useQuery({
    queryKey: ["QuestionView", "ModuleNames"],
    queryFn: getModuleNames,
  });

  if (moduleData && typeof moduleData === "object") {
    return (
      <ModuleName
        moduledata={moduleData.moduleNames}
        selectedModule={selectedModule}
        setSelectedTechnology={setSelectedModule}
      />
    );
  }
  return <h1>loading</h1>;
}

function ModuleName({ setSelectedTechnology, moduledata }) {
  const moduleNames = moduledata.map((element) => ({
    moduleName: element.ModuleName,
    moduleId: element.ModuleID,
    technologyId: element.TechnologyID,
    description: element.Description,
    topicCount: element.TopicsCount,
    isActive: element.IsActive,
    createdAt: element.CreatedAt,
    modifiedAt: element.ModifiedAt,
    modifiedBy: element.ModifiedBy,
    createdBy: element.CreatedBy,
  }));

  const [selectedModule, setSelectedModule] = useState();

  useEffect(() => {
    setSelectedTechnology((prev) => {
      return { ...prev, module: selectedModule };
    });
    LocalStorage.moduleData = selectedModule;
    BuilderService.questionService.selectedTechnology.module = selectedModule;
    localStorage.removeItem("technology");
    localStorage.removeItem("subTopicData");
  }, [setSelectedTechnology, selectedModule]);

  const handleModuleChange = (event) => {
    const selectedModuleName = event.target.value;
    const selectedModule = moduleNames.find(
      (module) => module?.moduleName === selectedModuleName
    );
    setSelectedModule(selectedModule);
  };

  return (
    <>
      <Form className="max-w-[20%] flex flex-col me-6">
        <label htmlFor="moduleName">
          Module Name:
          <select
            id="moduleName"
            name="moduleName"
            value={selectedModule?.moduleName}
            onChange={handleModuleChange}
          >
            <option value={"Select A Module"}>Select A Module</option>
            {moduleNames.map((element, index) => (
              <option
                key={(element.moduleId, index)}
                value={element.moduleName}
              >
                {element.moduleName}
              </option>
            ))}
          </select>
        </label>
      </Form>
    </>
  );
}

function TopicDataLoader({ selectedTopic, setSelectedTopic, selectedModule }) {
  const { data } = useQuery({
    queryKey: ["QuestionView", "TopicNames"],
    queryFn: getTopicNames,
  });

  let updatedData = data;

  useEffect(() => {
    if (data) setSelectedTopic(data[0]);
    if (data) LocalStorage.topicData = data[0];
  }, [data]);
  if (data) {
    let placeHolder = { ...data[0] };
    if (!placeHolder) placeHolder = {};
    placeHolder.TopicName = "Select A Topic";
    placeHolder.TopicID = -1;

    updatedData = [...data];
  }
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["QuestionView", "TopicNames"],
      exact: true,
    });
  }, [selectedModule]);

  if (data && typeof data === "object") {
    return (
      <TopicName
        data={updatedData}
        selectedTopic={selectedTopic}
        setSelectedTechnology={setSelectedTopic}
      />
    );
  }
  return <h1>loading</h1>;
}

function TopicName({ setSelectedTechnology, data }) {
  const topicNames = data.map((element) => ({
    topicName: element.TopicName,
    moduleId: element.ModuleID,
    topicId: element.TopicID,
    parentTopicId: element.ParentTopicID,
    description: element.Description,
    subTopicCount: element.SubTopicCount,
    isActive: element.IsActive,
    createdAt: element.CreatedAt,
    modifiedAt: element.ModifiedAt,
    modifiedBy: element.ModifiedBy,
    createdBy: element.CreatedBy,
  }));

  const [selectedModule, setSelectedModule] = useState();
  const { setShouldLoad } = useContext(TopicsContext);
  useEffect(() => {
    setSelectedTechnology((prev) => {
      return { ...prev, topic: selectedModule };
    });
    setShouldLoad(true);
    LocalStorage.topicData = selectedModule;
    BuilderService.questionService.selectedTechnology.topic = selectedModule;

    localStorage.removeItem("subTopicData");
  }, [setSelectedTechnology, selectedModule]);

  const handleModuleChange = (event) => {
    const selectedModuleName = event.target.value;
    const selectedModule = topicNames.find(
      (module) => module?.topicName === selectedModuleName
    );

    setSelectedModule(selectedModule);
  };
  return (
    <Form className="max-w-[45%] overflow-hidden me-6 flex flex-col">
      <span>
        <label htmlFor="topicName">Topic Name:</label>
      </span>

      <select
        id="topicName"
        name="topicName"
        value={selectedModule?.topicName}
        onChange={handleModuleChange}
      >
        <option value={"Select A Topic"}>Select A Topic</option>
        {topicNames.map((element, index) => (
          <option
            className=""
            key={element.moduleId + index}
            value={element?.topicName || ""}
          >
            {element.topicName}
          </option>
        ))}
      </select>
    </Form>
  );
}

function SubTopicDataLoader({
  setSelectedSubTopic,
  selectedTopic,
  stale,
  questionView,
  setQuestionView,
}) {
  const [data, setData] = useState([
    { subTopicName: "Select A Topic", subTopicId: -1 },
  ]);

  const { shouldLoad, setShouldLoad } = useContext(TopicsContext);

  if (LocalStorage._getTopicDataById && (!data || shouldLoad))
    axios
      .get(
        `https://www.nareshit.net/FetchSubTopics/${LocalStorage._getTopicDataById()}`
      )
      .then((res) => {
        setShouldLoad(false);
        setData([
          { subTopicName: "Select SubTopic", subTopicId: -1 },
          ...res.data,
        ]);
      });

  useEffect(() => {}, [selectedTopic]);

  return (
    <SubTopicName
      data={data}
      setSelectedTechnology={setSelectedSubTopic}
      questionView={setQuestionView}
      setQuestionView={setQuestionView}
    />
  );
}

function SubTopicName({
  setSelectedTechnology,
  data,
  questionView,
  setQuestionView,
}) {
  const subTopicNames = data.map((element) => ({
    subTopicName: element?.SubTopicName,
    moduleId: element.ModuleID,
    subTopicId: element.SubTopicID,
    parentTopicId: element.ParentTopicID,
    MCQCheckCount: element.MCQCheckCount,
    MCQRadioCount: element.MCQRadioCount,
    matchingCount: element.MatchingCount,
    codeCount: element.CodeCount,
    freeTextCount: element.FreeTextCount,
    isActive: element.IsActive,
    createdAt: element.CreatedAt,
    createdBy: element.CreatedBy,
    modifiedAt: element.ModifiedAt,
    modifiedBy: element.ModifiedBy,
  }));

  const [selectedModule, setSelectedModule] = useState();

  useEffect(() => {
    setSelectedTechnology((prev) => {
      return { ...prev, subTopic: selectedModule };
    });

    LocalStorage.subTopicData = selectedModule;
    BuilderService.questionService.selectedTechnology.subTopic = selectedModule;
  }, [setSelectedTechnology, selectedModule]);

  const handleModuleChange = (event) => {
    const selectedModuleName = event.target.value;
    const selectedModule = subTopicNames.find(
      (module) => module?.subTopicName === selectedModuleName
    );

    setSelectedModule(selectedModule);
  };

  return (
    <>
      <Form className="max-w-[30%] overflow-hidden relative">
        <div htmlFor="subtopicName">
          <p>Sub Topic Name:</p>
          <div>
            <select
              id="subtopicName"
              name="subtopicName"
              value={selectedModule?.subTopicName}
              onChange={handleModuleChange}
            >
              {subTopicNames.map((element, index) => (
                <option
                  key={element.moduleId + index}
                  value={element?.subTopicName || ""}
                >
                  {element.subTopicName || "Selecte A SubTopic"}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Form>
    </>
  );
}
