import React, { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useDropDown from "../../../hooks/useDropDown";

function TopicName({ flag, modalData, topicId }, ref) {
  const modulesDataSelector = useSelector((state) => state?.topicsListReducer);

  // Find Default Topic value
  let defaultTopicName = "";
  // need to use it outside because of async
  (() => {
    if (!defaultTopicName)
      if (topicId) {
        defaultTopicName = modulesDataSelector?.response?.find((item) => {
          return item.TopicID === topicId;
        })?.TopicName;
      }
  })();

  const [topicName, setTopicName] = useState(
    defaultTopicName || modalData?.TopicName || ""
  );
  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && dropDown) {
        setDropDown(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropDown]);

  function dropBoxHandler(topicName) {
    setTopicName(topicName);
    setDropDown(false);
  }

  // filter DropDown
  const [includedDropDownItems, dropDownChangeHandler] = useDropDown({
    key: "TopicName",
  });

  useEffect(() => {
    if (flag?.type === "edit")
      dropDownChangeHandler(topicName, modulesDataSelector?.response);
  }, [modulesDataSelector, topicName]);

  function inputChangeHandler(e) {
    setTopicName(e.target.value);
  }
  return (
    <div className="technologyModal-form-input">
      <label>Topic Name</label>
      <div className="input-wrapper">
        {/* Topic Name Input element */}
        <input
          ref={ref}
          type="text"
          placeholder="React"
          value={topicName}
          onChange={inputChangeHandler}
        />
        {/* Caret symbol to open and close dropbox */}
        {(flag?.type === "edit" || flag?.from !== "topic") && (
          <motion.span onClick={() => setDropDown((prev) => !prev)}>
            <motion.div
              animate={{ rotate: dropDown ? 180 : 0 }}
              className="pointer"
            >
              &#9650;
            </motion.div>
          </motion.span>
        )}

        {/*   DropDown for the Topic Name   */}
        {dropDown && (
          <div className="technologyModal-dropbox">
            {includedDropDownItems?.map((item) => {
              if (item.TopicName)
                return (
                  <p
                    key={item.TopicID}
                    onClick={() => dropBoxHandler(item.TopicName)}
                  >
                    {item.TopicName}
                  </p>
                );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default forwardRef(TopicName);
