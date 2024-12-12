import React from "react";
import Modal from "./Modal";
import QuestionModal from "./QuestionModal";
import { useLocation } from "react-router";
import ProgramViewModal from "./questionview/programView/ProgramViewModal";

function QuestionModelHandler({ question, setModalData }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const QuestionTypeID = queryParams.get("QuestionTypeID") || "2";

  return (
    <Modal
      data={question}
      setter={setModalData}
      ModalParam={QuestionTypeID === "2" ? ProgramViewModal : QuestionModal}
    />
  );
}

export default QuestionModelHandler;
