import React, { useEffect, useState } from "react";
import ModuleNameRenderer from "./ModuleNameRenderer";
import TopicNameRenderer from "./TopicNameRenderer";
import SubTopicNameRenderer from "./SubTopicNameRenderer";
import axios from "axios";
import { useLocation } from "react-router";
import api from "../../services/api";
import ErrorSaving from "./topics/ErrorSaving";
import SuccessSaving from "./topics/SuccessSaving";

function Topics({ isSavedOnce, setIsSavedOnce, setDataHandler, combination }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const technologyName = queryParams.get("TechnologyName") || 0;
  const technologyId = queryParams.get("TechnologyID") || 0;
  const testID = queryParams.get("TestID") || 0;
  const testDetailsId = queryParams.get("TestDetailsID") || 0;
  const QuestionTypeID = queryParams.get("QuestionTypeID");

  const [modules, setModules] = useState();
  const [topics, setTopics] = useState();
  const [subTopics, setSubTopics] = useState();

  const [saveButtonState, setSaveButtonState] = useState("stale");

  // selected Data
  const [selectedModule, setSelectedModule] = useState("-1");
  const [selectedTopic, setSelectedTopic] = useState("-1");
  const [selectedSubTopic, setSelectedSubTopic] = useState("-1");

  const [warn, setWarn] = useState(false);

  // Modules
  const fetchModules = async () => {
    try {
      const res = await api.get(
        `/fetchModules/${technologyId}?type=${
          QuestionTypeID === "1" ? "MCQ" : "code"
        }`
      );

      setModules(res.data);
    } catch (err) {}
  };

  // Topics
  const fetchTopics = async () => {
    try {
      const res = await api.get(
        `FetchTopics/${selectedModule}?type=${
          QuestionTypeID === "1" ? "MCQ" : "code"
        }`
      );

      setTopics(res.data);
    } catch (err) {}
  };

  // SubTopics
  const fetchSubTopics = async () => {
    try {
      const res = await api.get(
        `FetchSubTopics/${selectedTopic}?type=${
          QuestionTypeID === "1" ? "MCQ" : "code"
        }`
      );

      setSubTopics(res.data);
    } catch (err) {}
  };

  const saveHandler = async () => {
    if (!isSavedOnce) setIsSavedOnce(true);
    let res;

    try {
      setSaveButtonState("request");
      res = await api.post("UpdateCombinations", {
        TestId: testID,
        TestDetailsId: testDetailsId,
        type: QuestionTypeID === "1" ? "MCQ" : "code",
        data: [
          ...Object.values(combination).map((ele) => {
            return {
              EasyCount: ele?.easy || 0,
              MediumCount: ele?.medium || 0,
              HardCount: ele?.hard || 0,
              ModuleId: ele?.ModuleID || null,
              TopicId: ele?.TopicID || null,
              SubtopicId: ele?.SubTopicID || null,
              TechnologyName: technologyName || null,
              TechnologyId: technologyId || null,
              ModuleName: ele?.selectedModule || null,
              TopicName: ele?.selectedTopic || null,
              SubtopicName: ele?.selectedSubTopic || null,
              TestDetailsID: testDetailsId || 0,
              TestID: testID || 0,
            };
          }),
        ],
      });

      setSaveButtonState("reslove");
    } catch (error) {
      setSaveButtonState("reject");
    }
    // Post Combinations to Custome table

    const postCombinations = async () => {
      let res;
      try {
        res = await api.post("Insert_Update_QuestionCombination", {
          TestId: testID,
          TestDetailsId: testDetailsId,
          Combinations: JSON.stringify(combination),
          type: QuestionTypeID === "1" ? "MCQ" : "code",
        });
        return res;
      } catch (err) {}
    };

    let insertRes;

    if (Object.keys(combination).length > 0) insertRes = postCombinations();
  };

  // Modules
  useEffect(() => {
    fetchModules();
  }, []);

  useEffect(() => {
    if (selectedTopic) setSelectedTopic(0);
    if (selectedSubTopic) setSelectedSubTopic(0);
  }, [selectedModule]);

  // Topics
  useEffect(() => {
    if (selectedModule && selectedTopic !== -1 && selectedTopic !== "-1")
      fetchTopics(selectedModule);
  }, [selectedModule]);

  useEffect(() => {
    if (selectedSubTopic) {
      setSelectedSubTopic(0);
    }
  }, [selectedTopic]);

  // SubTopics
  useEffect(() => {
    if (selectedTopic && selectedSubTopic !== -1 && selectedSubTopic !== "-1")
      fetchSubTopics();
  }, [selectedTopic]);

  useEffect(() => {
    setSubTopics([]);
  }, [topics]);

  // disable warn
  useEffect(() => {
    if (selectedModule && selectedModule != -1 && warn) {
      setWarn(false);
    }
  }, [selectedModule]);

  // handler for set Data button
  const onSetData = () => {
    test();
  };

  const test = () => {
    let valid = false;
    const obj = Object.values(combination);

    let Module;
    let Topic;
    let SubTopic;

    let moduleArr = combination;
    moduleArr = Object.values(combination).map((ele) => ele.ModuleID);

    let topicArr = combination;
    topicArr = Object.values(combination).map((ele) => ele.TopicID);

    let subTopicArr = combination;
    subTopicArr = Object.values(combination).map((ele) => ele.SubTopicID);

    if (selectedModule && selectedModule != -1) {
      if (selectedModule)
        Module = modules.find((ele) => ele.ModuleID == selectedModule);

      if (selectedTopic)
        Topic = topics.find((ele) => ele.TopicID == selectedTopic);

      if (selectedSubTopic)
        SubTopic = subTopics.find((ele) => ele.SubTopicID == selectedSubTopic);
    }
    const callModal = () => {
      setDataHandler(selectedModule, selectedTopic, selectedSubTopic, {
        Module,
        Topic,
        SubTopic,
      });
      valid = true;
    };

    if (selectedModule == "-1" || selectedModule == 0) {
      setWarn(true);
    } else {
      if (obj.length == 0) {
        callModal();
      } else {
        obj.forEach((ele) => {
          if (!valid) {
            if (
              selectedModule == ele.ModuleID &&
              selectedTopic == ele.TopicID &&
              selectedSubTopic == ele.SubTopicID
            ) {
              window.alert(
                "A row with this combination already exists in the table, if you wish to edit values go through table."
              );
              valid = true;
              return;
            } else if (
              selectedModule == ele.ModuleID &&
              selectedTopic == ele.TopicID &&
              !subTopicArr.includes(selectedSubTopic)
            ) {
              let userResponse = false;

              if (selectedSubTopic != ele.SubTopicID) {
                userResponse = window.confirm(
                  `Combination with the same topic already exists. still want to create new question template`
                );
                valid = true;
              }
              if (userResponse) {
                callModal();
              }
              return;
            } else if (
              selectedModule == ele.ModuleID &&
              !topicArr.includes(selectedTopic) &&
              (selectedSubTopic == 0 || selectedSubTopic == -1)
            ) {
            } else if (
              selectedModule == ele.ModuleID &&
              !topicArr.includes(selectedTopic) &&
              (selectedTopic != 0 || selectedSubTopic != -1) &&
              (selectedSubTopic == 0 || selectedSubTopic == 1)
            ) {
              callModal();
              valid = true;
              return;
            } else if (
              selectedModule != ele.ModuleID &&
              !moduleArr.includes(selectedModule) &&
              (selectedTopic == 0 || selectedTopic == -1)
            ) {
              callModal();
              valid = true;
              return;
            }
          } else if (
            selectedModule == ele.ModuleID &&
            selectedTopic == ele.TopicID &&
            (selectedSubTopic == 0 || selectedSubTopic == -1) &&
            !valid
          ) {
            callModal();
            return;
          }

          // Ex
          if (!valid) {
            if (
              !topicArr.includes(selectedTopic) &&
              (selectedSubTopic == 0 || selectedSubTopic == -1)
            ) {
              callModal();
              return;
            }

            if (!subTopicArr.includes(selectedSubTopic)) {
              let userResponse = false;

              if (topicArr.includes(selectedTopic)) {
                userResponse = window.confirm(
                  `Combination with the same topic already exists. still want to create new question template`
                );

                if (userResponse) {
                  callModal();
                  return;
                }
                valid = true;
              } else {
                if (!topicArr.includes(selectedTopic)) {
                  callModal();

                  if (!userResponse) {
                    return;
                  } else {
                  }
                }
              }
              if (userResponse) {
              }
            }
          }
        });
      }
    }
  };

  return (
    <>
      {saveButtonState === "reject" && (
        <ErrorSaving handleRetry={saveHandler} />
      )}

      {saveButtonState === "reslove" && (
        <SuccessSaving
          handleClose={() => {
            setSaveButtonState("stale");
          }}
        />
      )}

      {/**  head */}
      <div className="flex justify-between">
        <p className="ms-[20px] pt-5 text-lg font-semibold">
          Selected Technology: {technologyName}
        </p>
        <div className="flex text-center">
          {warn && (
            <p className="animate-pulse grid place-content-center mr-[20px] mt-5 max-h-8 min-h-8 font-semibold">
              Select one module
            </p>
          )}
          <button
            onClick={onSetData}
            className="mr-[20px] w-auto mt-5 px-6 max-h-8 min-h-8 bg-[gray] text-white font-semibold rounded-md shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:bg-gray-500 focus:ring-opacity-50"
          >
            Set Question Template
          </button>
          <button
            onClick={saveHandler}
            className="mr-[20px] w-[118px] mt-5 px-6 max-h-8 min-h-8 bg-[gray] text-white font-semibold rounded-md shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:bg-gray-500 focus:ring-opacity-50"
          >
            {saveButtonState === "reject" ? "retry" : "Save"}
          </button>
        </div>
      </div>
      <div className="flex my-[20px] w-full">
        <div className="flex justify-between w-full">
          {/** Select Module */}
          <ModuleNameRenderer
            modules={modules}
            selectedModule={selectedModule}
            setSelectedModule={setSelectedModule}
          />

          {/** Select Topic */}
          <TopicNameRenderer
            topics={topics}
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
          />

          {/** Select SubTopic */}
          <SubTopicNameRenderer
            subTopics={subTopics}
            selectedSubTopics={selectedSubTopic}
            setSelectedSubTopic={setSelectedSubTopic}
          />
        </div>
      </div>
    </>
  );
}

export default Topics;
