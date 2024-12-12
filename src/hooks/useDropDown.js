import { useCallback, useEffect, useMemo, useState } from "react";

function useDropDown({ key }) {
  const [includedDropDownItems, setIncludedDropDownItems] = useState([]);

  const [dataArr, setDataArr] = useState([]);
  const [filterStr, setFilterStr] = useState("");

  useEffect(() => {
    setIncludedDropDownItems(() => {      
      if (filterStr && dataArr) {
        const result = dataArr?.filter((item) => {
          return item[key]?.toLowerCase().includes(filterStr.toLowerCase());
        });

        return result || [];
      } else {
        return dataArr;
      }
    });
  }, [dataArr, filterStr]);

  const dropDownChangeHandler = useCallback((str, arr) => {
    setFilterStr(str);
    setDataArr(arr);
  }, []);

  return [includedDropDownItems, dropDownChangeHandler];
}

export default useDropDown;
