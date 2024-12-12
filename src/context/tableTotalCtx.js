import { createContext, useState } from "react";

const TableTotalCtx = createContext({
  total: { easy: 0, medium: 0, hard: 0 },
  setEasy: () => {},
});

export function TableTotalCtxProvider({ children }) {
  const [total, setTotal] = useState({ easy: 0, medium: 0, hard: 0 });

  return (
    <TableTotalCtx.Provider value={{ total, setTotal }}>
      {children}
    </TableTotalCtx.Provider>
  );
}

export default TableTotalCtx;
