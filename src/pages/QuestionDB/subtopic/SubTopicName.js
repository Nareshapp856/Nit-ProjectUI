import React, { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useDropDown from "../../../hooks/useDropDown";

function SubTopicName({ flag, modalData }, ref) {
  const modulesDataSelector = useSelector(
    (state) => state?.subtopicsListReducer
  );

  const [subTopicName, setSubTopicName] = useState(
    modalData?.SubTopicName || ""
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

  function dropBoxHandler(subTopicName) {
    setSubTopicName(subTopicName);
    setDropDown(false);
  }

  // filter the dropDown
  const [includedDropDownItems, dropDownChangeHandler] = useDropDown({
    key: "SubTopicName",
  });
  useEffect(() => {
    dropDownChangeHandler(subTopicName, modulesDataSelector?.response);
  }, [modulesDataSelector, subTopicName]);

  return (
    <div className="technologyModal-form-input">
      <label>SubTopic Name</label>
      <div className="input-wrapper">
        {/* Technology Name Input element */}
        <input
          ref={ref}
          type="text"
          placeholder="language interoperability"
          value={subTopicName}
          onChange={(e) => setSubTopicName(e.target.value)}
        />
        {/* Caret symbol to open and close dropbox */}
        {(flag?.type === "edit" || flag?.from !== "subTopic") && (
          <motion.span onClick={() => setDropDown((prev) => !prev)}>
            <motion.div
              animate={{ rotate: dropDown ? 180 : 0 }}
              className="pointer"
            >
              &#9650;
            </motion.div>
          </motion.span>
        )}

        {/*   DropDown for the Technology Name   */}
        {dropDown && (
          <div className="technologyModal-dropbox subTopic-dropbox">
            {includedDropDownItems?.map((item) => {
              if (item.SubTopicName)
                return (
                  <p
                    key={item.SubTopicID}
                    onClick={() => dropBoxHandler(item.SubTopicName)}
                  >
                    {item.SubTopicName}
                  </p>
                );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default forwardRef(SubTopicName);
