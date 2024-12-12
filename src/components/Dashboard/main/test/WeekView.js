import { addDays } from "date-fns";
import { motion } from "framer-motion";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { useEffect, useState } from "react";

const getDates = ({ minDate }) => {
  const updatedDates = [];
  for (let i = 0; i < 5; i++) {
    updatedDates.push(addDays(minDate, i));
  }
  return updatedDates;
};

const getFormattedDate = (_date) => {
  const day = _date.toLocaleString("en-us", { weekday: "short" });
  const date = _date.getDate();
  const month = _date.toLocaleString("en-us", { month: "short" });

  return (
    <div className="flex flex-col items-center max-h-full overflow-hidden">
      <p className="text-xs font-light">{day}</p>
      <p className="text-lg font-bold">{date}</p>
      <p className="text-xs font-medium">{month}</p>
    </div>
  );
};

const WeekView = () => {
  const [minDate, setMinDate] = useState(new Date());
  const [dates, setDates] = useState([]);

  useEffect(() => {
    setDates(getDates({ minDate }));
  }, [minDate]);
  return (
    <div className="">
      <div className="flex w-full relative">
        {/** Arrow Start */}
        <div className="flex justify-center absolute left-0 z-10 w-14 rounded-xl h-[76px] top-0">
          <button onClick={() => setMinDate(addDays(minDate, -1))}>
            <ArrowBackIosIcon
              style={{
                backgroundColor: "transparent",
                color: "#000000",
              }}
            />
          </button>
        </div>

        <div className="flex justify-between w-full mx-auto">
          {dates.map((date, index) => (
            <motion.div
              key={index}
              className="bg-[#FFFFFF] rounded-md p-2 w-[4rem] h-[76px] text-center shadow-xl cursor-pointer shadow-[#082F4550] hover:shadow-lg hover:shadow-[#EB242480] transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {getFormattedDate(date)}
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center absolute right-0 top-0 w-14 rounded-xl h-[76px] z-10">
          <button onClick={() => setMinDate(addDays(minDate, 1))}>
            <ArrowForwardIosIcon
              color="info"
              style={{
                backgroundColor: "transparent",
                color: "#000000",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeekView;
