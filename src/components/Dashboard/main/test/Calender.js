import React, { useState } from "react";
import Calendar from "@demark-pro/react-booking-calendar";
import { isToday } from "date-fns";

const reserved = [
  {
    startDate: new Date(2023, 3, 22),
    endDate: new Date(2016, 4, 5),
  },
];

const MyBookingCalendar = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const handleChange = (e) => {
    setSelectedDates(e);
  };

  return (
    <Calendar
      selected={selectedDates}
      onChange={handleChange}
      onOverbook={(e, err) => alert(err)}
      components={{
        DayCellFooter: ({ date, innerProps }) => (
          <div
            style={{
              backgroundColor: isToday(date, new Date()) ? "blue" : "",
              opacity: 0.1,
            }}
            className="absolute h-full w-full rounded"
          ></div>
        ),
      }}
      disabled={(date, state) => !state.isSameMonth}
      reserved={reserved}
      variant="events"
      dateFnsOptions={{ weekStartsOn: 1 }}
      range={true}
    />
  );
};

export default MyBookingCalendar;
