import { createContext, useState } from "react";

import _debounce from "lodash/debounce";

const QuestionViewCtx = createContext({
  data: {},
  setData: () => {},
});

export function QuestionViewProvider({ children }) {
  const [data, setData] = useState();

  return (
    <QuestionViewCtx.Provider value={{ data, setData }}>
      {children}
    </QuestionViewCtx.Provider>
  );
}

export default QuestionViewCtx;
