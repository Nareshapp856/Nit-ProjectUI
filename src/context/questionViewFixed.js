import { createContext, useState } from "react";

import _debounce from "lodash/debounce";

const QuestionViewFixedCtx = createContext({
  questions: [],
  setQuestions: () => {},
});

export function QuestionViewFixedProvider({ children }) {
  const [questions, setQuestions] = useState([]);

  return (
    <QuestionViewFixedCtx.Provider value={{ questions, setQuestions }}>
      {children}
    </QuestionViewFixedCtx.Provider>
  );
}

export default QuestionViewFixedCtx;
