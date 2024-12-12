import React from "react";
import { useLocation } from "react-router";

import QuestionViewEditModal from "./questionViews/QuestionViewEditModal";
import QuestionViewModalView from "./questionViews/QuestionViewModalView";
import ProgramView from "./questionview/ProgramView";

function QuestionView({ data, handler, setter }) {
  let currentCombination;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const QuestionTypeID = queryParams.get("QuestionTypeID");

  if (data?.combination && data?.element?.id) {
    currentCombination = data?.combination[data?.element?.id];
  }

  if (data.popupType === "edit")
    return (
      <QuestionViewEditModal data={data} handler={handler} setter={setter} />
    );
  return QuestionTypeID === "2" ? (
    <ProgramView
      data={data}
      handler={handler}
      setter={setter}
      currentCombination={currentCombination}
    />
  ) : (
    <QuestionViewModalView
      data={data}
      handler={handler}
      setter={setter}
      currentCombination={currentCombination}
    />
  );
}

export default QuestionView;
