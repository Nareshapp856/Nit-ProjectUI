import React, { useEffect, useState } from "react";

function DateDropDown({ dispatcher }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    // updates technologyData in TechnologySelector.js
    dispatcher({ type: "startDate", payload: new Date(startDate) });
  }, [startDate]);

  useEffect(() => {
    // updates technologyData in TechnologySelector.js
    dispatcher({ type: "endDate", payload: new Date(endDate) });
  }, [endDate]);

  return (
    <aside>
      <DateRenderer
        title="Start Date"
        setter={setStartDate}
        value={startDate}
      />

      <DateRenderer title="End Date" setter={setEndDate} value={endDate} />
    </aside>
  );
}

export default DateDropDown;

function DateRenderer({ title, value, setter }) {
  const changeHandler = (e) => {
    setter(e.target.value);
  };

  return (
    <label>
      {title}
      <input onChange={changeHandler} type="date" value={value} />
    </label>
  );
}
