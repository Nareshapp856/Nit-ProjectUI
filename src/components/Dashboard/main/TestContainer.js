import { useState } from "react";
import { connect } from "react-redux";

import TestRendererComponent from "./test/TestRenderer";
import NextTestRenderer from "./test/NextTestRenderer";
import Calender from "./test/Calender";

function TestContainerComponent({}) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <div className="h-[816px] bg-white shadow-[#082F4550] shadow-xl rounded-md">
        <div className="w-full xl:w-full flex flex-col my-auto">
          <Calender />

          {/* Display event information */}
          <div className="w-full p-4 pt-2 flex-1">
            <TestRendererComponent selectedDate={selectedDate} />
          </div>
        </div>

        {/* <div className="w-full xl:w-full h-[320px] mx-auto grid mt-4">
          <NextTestRenderer />
        </div> */}
      </div>
    </>
  );
}

const TestContainer = connect(null, null)(TestContainerComponent);

export default TestContainer;
