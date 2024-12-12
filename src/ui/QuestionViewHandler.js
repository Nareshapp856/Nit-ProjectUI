import React from "react";
import Modal from "./Modal";
import QuestionView from "./QuestionView";
import ProgramView from "./questionview/ProgramView";
import { useLocation } from "react-router";

function QuestionViewHandler({ modalData, setPopup, handler, styles }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const QuestionTypeID = queryParams.get("QuestionTypeID");

  return (
    <Modal
      data={modalData}
      setter={setPopup}
      ModalParam={QuestionView}
      handler={handler}
      styles={styles}
    />
  );
}

export default QuestionViewHandler;
