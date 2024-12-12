import React, { useId, useRef, useState } from "react";
import { Form } from "react-router-dom";
import TechnologyName from "../../pages/QuestionDB/technology/TechnologyName";
import { useSelector } from "react-redux";

function TechnologyModal({
  flag,
  modalData,
  modalSubmitHandler,
  modalCancelHandler,
}) {
  const idRef = useRef();
  const technologyNameRef = useRef();
  const descriptionRef = useRef();

  const [technologyValue, SetTechnologyVal] = useState("");
  const id = useId();

  function cancelHandler() {
    modalCancelHandler(false);
  }

  function submitHandler() {
    modalSubmitHandler(
      idRef.current.value,
      technologyNameRef.current.value,
      descriptionRef.current.value
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
          <legend>
            {modalData?.TechnologyID
              ? "Edit Technology"
              : "Create New Technology"}
          </legend>
          <span className="technologyModal-form-id">
            ID
            <input ref={idRef} value={modalData?.TechnologyID || id} disabled />
          </span>
          <TechnologyName
            flag={flag}
            technologyName={modalData?.TechnologyName}
            ref={technologyNameRef}
            textchange={textchnges}
          />
          <div className="technologyModal-form-input">
            <label>Description</label>
            <textarea
              defaultValue={modalData?.Description}
              ref={descriptionRef}
              type="text"
            />
          </div>
          <div className="technologyModal-form-button">
            <button
              onClick={cancelHandler}
              className="technologyModal-form-cancel"
            >
              Cancel
            </button>
            <button
              onClick={submitHandler}
              className="technologyModal-form-submit"
              disabled={technologyValue === ""}
            >
              {modalData?.TechnologyID ? "Edit" : "Add"}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default TechnologyModal;
