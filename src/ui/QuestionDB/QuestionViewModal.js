import React, { useId, useState } from "react";

import QuestionViewModalView from "../../components/QuestionDB/questionView.js/QuestionViewModalView";

import QuestionViewModalEdit from "../../components/QuestionDB/questionView.js/QuestionViewModalEdit";

function QuestionViewModal({
  modalData,
  modalCancelHandler,
  modalSubmitHandler,
}) {
  const id = useId();

  let content = (
    <QuestionViewModalEdit
      modalData={modalData}
      modalSubmitHandler={modalSubmitHandler}
      modalCancelHandler={modalCancelHandler}
    />
  );

  if (modalData.type === "view")
    content = <QuestionViewModalView modalData={modalData} />;

  return content;
}

export default QuestionViewModal;
