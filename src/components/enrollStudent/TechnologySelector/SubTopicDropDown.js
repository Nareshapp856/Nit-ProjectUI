import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../../services/api";
import Select from "../../../ui/EnrollStudent/Select";

const fetchHandler = async (setter, id) => {
  const res = await api.get(`/fetchSubTopics/${id}`);

  setter([
    { key: "0", value: "0", option: "Select A SubTopic" },
    ...res.data.map((ele) => {
      return {
        id: ele.SubTopicID,
        value: ele.SubTopicID,
        option: ele.SubTopicName,
      };
    }),
  ]);
};

function SubTopicDropDown({ technologyData, dispatcher }) {
  const [subTopicId, setSubTopicId] = useState("0");

  const [options, setOptions] = useState([
    { key: "0", value: "0", option: "Select A SubTopic" },
  ]);

  useEffect(() => {
    if (technologyData.topicId)
      fetchHandler(setOptions, technologyData.topicId);
  }, [technologyData.topicId]);

  useEffect(() => {
    // updates technologyData in TechnologySelector.js
    dispatcher({ type: "subTopicId", payload: Number(subTopicId) });
  }, [subTopicId]);

  return (
    <Select
      defaultValue={subTopicId}
      setter={setSubTopicId}
      options={options}
    />
  );
}

export default SubTopicDropDown;
