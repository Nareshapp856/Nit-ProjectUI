import { createContext, useState } from "react";

import _debounce from "lodash/debounce";

const TopicsContext = createContext({
  topics: [],
  setTopics: () => {},
  setShouldLoad: () => {},
});

export function TopicsContextProvider({ children }) {
  const [topics, setTopics] = useState([]);
  const [shouldLoad, setShouldLoad] = useState(true);

  return (
    <TopicsContext.Provider
      value={{ topics, setTopics, shouldLoad, setShouldLoad }}
    >
      {children}
    </TopicsContext.Provider>
  );
}

export default TopicsContext;
