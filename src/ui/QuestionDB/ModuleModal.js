import React, { useId, useRef, useState } from "react";
import { Form } from "react-router-dom";
import TechnologyName from "../../pages/QuestionDB/technology/TechnologyName";
import { useSelector } from "react-redux";
import ModuleName from "../../pages/QuestionDB/module/ModuleName";

function ModuleModal({
  flag,
  modalData,
  modalSubmitHandler,
  modalCancelHandler,
}) {
  const idRef = useRef();
  const technologyRef = useRef();
  const moduleRef = useRef();
  const [technologyValue, SetTechnologyVal] = useState(() => {
    return modalData?.ModulID || modalData?.TechnologyID || "";
  });
  const id = useId();

  function cancelHandler() {
    modalCancelHandler(false);
  }

  function submitHandler() {
    modalSubmitHandler(
      idRef.current.value,
      technologyRef.current.value,
      moduleRef.current.value
    );
    modalCancelHandler(false);
  }
  const textchnges = (input) => {
    SetTechnologyVal(input);
  };
  return (
    <div className="technologyModal">
      <form className="technologyModal-form">
        <fieldset className="technologyModal-form-group">
          <legend>Create New Module</legend>
          <span className="technologyModal-form-id">
            ID
            <input ref={idRef} value={modalData.ModuleID || id} disabled />
          </span>
          <TechnologyName
            ref={technologyRef}
            textchange={textchnges}
            flag={flag}
            technologyId={modalData?.TechnologyID}
          />
          <ModuleName ref={moduleRef} flag={flag} modalData={modalData} />
          <div className="technologyModal-form-button">
            <button
              onClick={cancelHandler}
              className="cancel technologyModal-form-cancel"
            >
              Cancel
            </button>
            <button
              onClick={submitHandler}
              className="add technologyModal-form-submit"
              disabled={technologyValue === ""}
            >
              {modalData?.ModuleID ? "Edit" : "Add"}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default ModuleModal;
