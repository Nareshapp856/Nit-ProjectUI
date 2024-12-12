import { useEffect, useState } from "react";
import axios from "axios";
import Select from "../../../ui/EnrollStudent/Select";
import api from "../../../services/api";

const fetchHandler = async (setter, id) => {
  const res = await api.get(`/fetchTopics/${id}`);

  setter([
    { key: "0", value: "0", option: "Select A Topic" },
    ,
    ...res.data.map((ele) => {
      return {
        id: ele.TopicID,
        value: ele.TopicID,
        option: ele.TopicName,
      };
    }),
  ]);
};

function TopicDropDown({ technologyData, dispatcher }) {
  const [topicId, setTopicId] = useState("0");

  const [options, setOptions] = useState([
    { key: "0", value: "0", option: "Select A Topic" },
  ]);

  useEffect(() => {
    if (technologyData.moduleId)
      fetchHandler(setOptions, technologyData.moduleId);
  }, [technologyData.moduleId]);

  useEffect(() => {
    // updates technologyData in TechnologySelector.js
    dispatcher({ type: "topicId", payload: Number(topicId) });
  }, [topicId]);

  return (
    <Select defaultValue={topicId} setter={setTopicId} options={options} />
  );
}

export default TopicDropDown;
