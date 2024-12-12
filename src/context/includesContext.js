import { createContext, useState } from "react";

const IncludesContext = createContext({
  includes: { includes: 0, excludes: 0 },
  setIncludes: () => {},
});

export function IncludesContextProvider({ children }) {
  const [includes, setIncludes] = useState({ includes: 0, excludes: 0 });

  return (
    <IncludesContext.Provider value={{ includes: includes, setIncludes }}>
      {children}
    </IncludesContext.Provider>
  );
}

export default IncludesContext;
