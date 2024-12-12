import WeekView from "../../main/test/userProfile/WeekView";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import Hero from "./userProfile/Hero";
import { useEffect, useState } from "react";

const RewardBox = () => {
  const [isBigScreen, setIsBigScreen] = useState(false);

  const handleScreenResize = () => {
    setIsBigScreen(window.innerWidth >= 1400);
  };

  useEffect(() => {
    window.addEventListener("resize", handleScreenResize);
    handleScreenResize();
    return () => window.removeEventListener("resize", handleScreenResize);
  }, []);

  return (
    <div className="flex relative flex-col justify-between h-[220px]">
      <div>
        <Typography variant="h6" className="text-white font-bold mb-2">
          This Week's Reward
        </Typography>
        <Typography variant="body1" className="text-white mb-4">
          A Reward for Free
        </Typography>
        <Typography
          variant="body2"
          className="text-white line-clamp-4"
          height="large"
        >
          This is a placeholder reward for testing purposes. This is a
          placeholder reward for testing purposes. This is a placeholder reward
          for testing purposes.This is a placeholder reward for testing
          purposes.
        </Typography>
      </div>
      <div className="relative flex justify-center items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <Confetti
              height="100rem"
              width="140rem"
              recycle={true}
              className="-ml-20"
              numberOfPieces={18}
            />
          </div>
          <EmojiEventsIcon
            sx={{ fontSize: isBigScreen ? "5rem" : "4rem", height: "5rem" }}
            className="text-yellow-500 relative z-10"
          />
        </motion.div>
      </div>
    </div>
  );
};

const ProgressBar = ({ valuePercentage: value }) => {
  return (
    <div
      className="flex items-center justify-between px-2 py-1 rounded-md"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
    >
      <p className="text-sm text-gray-600">{`${value}` / 100}</p>
      <div className="flex items-center w-full h-3 ml-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-orange-500"
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="text-sm text-gray-600 ml-2">{`${value}%`}</p>
    </div>
  );
};

const UserProfile = () => {
  return (
    <>
      <div className="w-full shadow-xl shadow-[#082F4550] flex flex-col align-middle lg:mt-4 xl:mt-0">
        {/* User Profile */}
        <div className="bg-white hidden xl:block">
          <Hero />
        </div>
        {/* Reward Box */}
        <div className="bg-gradient-to-r from-[#FF4F4F] to-[#FF9999] p-4">
          <RewardBox />
        </div>
        {/* Week View */}
        <div className="bg-white p-4 pb-0">
          <WeekView />
        </div>
        {/* Articles */}
        <div className="bg-white overflow-hidden shadow-[#082F4550] shadow-lg rounded-md">
          <div className="h-[294px] grid place-content-center p-4 overflow-y-auto">
            <article>
              <h2 className="p-2">This is a test</h2>
              <small className="px-4">
                text is on <b>02-02-2000</b>
              </small>
              <div className="w-full p-2 px-4 pb-0">
                <p>This is a test</p>
                <ProgressBar valuePercentage={33} />
              </div>
              <p className="px-4 line-clamp-4">
                This is test description this is a placeholder descriptionThis
                is test description this is a placeholder descriptionThis
              </p>
            </article>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
