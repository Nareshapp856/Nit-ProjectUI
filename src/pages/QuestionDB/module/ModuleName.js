import React, { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import useDropDown from "../../../hooks/useDropDown";

function ModuleName({ modalData, flag }, ref) {
  const modulesDataSelector = useSelector((state) => state?.modulesListReduer);

  const [moduleName, setModuleName] = useState(modalData.ModuleName);
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

  function dropBoxHandler(ModuleName) {
    setModuleName(ModuleName);
    setDropDown(false);
  }

  // filter DropDown
  const [includedDropDownItems, dropDownChangeHandler] = useDropDown({
    key: "ModuleName",
  });

  useEffect(() => {
    dropDownChangeHandler(moduleName, modulesDataSelector?.response);
  }, [moduleName, modulesDataSelector]);

  return (
    <div className="technologyModal-form-input">
      <label>Module Name</label>
      <div className="input-wrapper">
        {/* Module Name Input element */}
        <input
          ref={ref}
          type="text"
          placeholder="windows programming"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
        />
        {/* Caret symbol to open and close dropbox */}
        {(flag?.type === "edit" || flag?.from !== "module") && (
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
              if (item.ModuleName)
                return (
                  <p
                     key={item.ModuleName}
                    onClick={() => {
                      dropBoxHandler(item.ModuleName);
                    }}
                  >
                    {item.ModuleName}
                  </p>
                );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default forwardRef(ModuleName);
