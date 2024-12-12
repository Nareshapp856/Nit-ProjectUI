import React, { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  setEndDate,
  setStartDate,
} from "../../../../store/slice/userManagement.slice";

function BatchDatePicker() {
  const dispatch = useDispatch();
  const { startDate, endDate } = useSelector(
    (store) => store.userManagementPageReducer
  );
  const [state, setState] = useState([
    {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      key: "selection",
    },
  ]);

  useEffect(() => {
    if (state[0].startDate && state[0].endDate) {
      const formattedStartDate = formatDate(state[0].startDate);
      const formattedEndDate = formatDate(state[0].endDate);
      if (formattedStartDate && formattedEndDate) {
        dispatch(setStartDate(formattedStartDate));
        dispatch(setEndDate(formattedEndDate));
      }
    }
  }, [state]);

  const formatDate = (date) => {
    if (date instanceof Date) {
      return date.toISOString().split("T")[0];
    } else {
      return null;
    }
  };

  return (
    <DateRange
      editableDateInputs={true}
      onChange={(item) => setState([item.selection])}
      moveRangeOnFirstSelection={false}
      ranges={state}
      minDate={new Date()}
    />
  );
}

export default BatchDatePicker;
