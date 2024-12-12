import { useState } from "react";

export function useInput() {
  const [data, setData] = useState(0);
  const [count, setCount] = useState(0);

  return { data, setDatap };
}
