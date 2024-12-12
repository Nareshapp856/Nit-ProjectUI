import React, { createContext, useCallback, useContext, useState } from "react";
import { useEffect } from "react";
import { fc_fetchSubTopics, fc_fetchTopics } from "../../store/Faculty/api";

const TopicsListContext = createContext();

export const useTopicsList = () => useContext(TopicsListContext);

export const TopicsListProvider = ({ children }) => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [topicsList, setTopicsList] = useState([]);
  const [subTopicsList, setSubTopicsList] = useState([]);

  const fetchTopics = useCallback(async () => {
    try {
      const { data, status } = await fc_fetchTopics({
        ModuleID: selectedModule,
      });

      setTopicsList(data);
    } catch (error) {
      console.log("error");
    }
  });

  const fetchSubTopics = async (topicId) => {
    console.log("context in topic id:",topicId);
    try {
      const { data, status } = await fc_fetchSubTopics({ topicId });

      setSubTopicsList(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedModule) {
      if (selectedModule) fetchTopics();
      else {
        setTopicsList([]);
      }
    }
  }, [selectedModule]);

  return (
    <TopicsListContext.Provider
      value={{
        selectedModule,
        topicsList,
        setSelectedModule,
        setTopicsList,
        fetchTopics,
        setSubTopicsList,
        subTopicsList,
        fetchSubTopics,
      }}
    >
      {children}
    </TopicsListContext.Provider>
  );
};
