import React, { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useDropDown from "../../../hooks/useDropDown";

function TechnologyName(
  { technologyName: technologyNameParam, technologyId, flag, textchange },
  ref
) {
  const modulesDataSelector = useSelector(
    (state) => state?.technologiesListReducer
  );

  // Find Default technology value
  let defaultTechnologyName = "";
  // need to use it outside because of async
  (() => {
    if (!defaultTechnologyName)
      if (technologyId) {
        defaultTechnologyName = modulesDataSelector?.response?.find((item) => {
          return item.TechnologyID === technologyId;
        })?.TechnologyName;
      }
  })();

  // 2 way binding
  const [technologyName, setTechnologyName] = useState(
    defaultTechnologyName || technologyNameParam || ""
  );

  const [dropDown, setDropDown] = useState(false);

  // filter the dropDown
  const [includedDropDownItems, dropDownChangeHandler] = useDropDown({
    key: "TechnologyName",
  });
  useEffect(() => {
    dropDownChangeHandler(technologyName, modulesDataSelector?.response);
  }, [modulesDataSelector, technologyName]);

  // To close window when dropBox is open
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

  function dropBoxHandler(TechnologyName) {
    setTechnologyName(TechnologyName);
    textchange(TechnologyName);
    setDropDown(false);
  }

  function inputChangeHandler(e) {
    setTechnologyName(e.target.value);
    textchange(e.target.value);
  }

  return (
    <div className="technologyModal-form-input">
      <label>Technology Name</label>
      <div className="input-wrapper">
        {/* Technology Name Input element */}
        <input
          ref={ref}
          type="text"
          placeholder="React"
          value={technologyName}
          onChange={inputChangeHandler}
        />
        {/* Caret symbol to open and close dropbox */}
        {(flag?.type === "edit" || flag?.from !== "technologies") && (
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
          <div className="technologyModal-dropbox">
            {includedDropDownItems?.map((item) => {
              if (item.TechnologyName)
                return (
                  <p
                    key={item.TechnologyID}
                    onClick={() => dropBoxHandler(item.TechnologyName)}
                  >
                    {item.TechnologyName}
                  </p>
                );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default forwardRef(TechnologyName);
