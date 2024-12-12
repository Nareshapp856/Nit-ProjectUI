import { createContext, useState } from "react";
import { LocalStorage } from "../services/LocalStorage";

import _debounce from "lodash/debounce";

const UpdateQuestions = createContext({
  questions: [],
  setQuestions: () => {},
});

export function UpdateQuestionsProvider({ children }) {
  const [questions, setQuestions] = useState();

  return (
    <UpdateQuestions.Provider value={{ questions, setQuestions }}>
      {children}
    </UpdateQuestions.Provider>
  );
}

export default UpdateQuestions;
