import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import userplaceholder from "../../../../../assets/userplaceholder.png";

const Hero = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4">
      <img
        src={userplaceholder}
        className="rounded-full w-20 h-20"
        alt="user"
      />
      <div>
        <p className="text-xl font-semibold">Ganga the Great</p>
        <div className="flex items-center space-x-2">
          <EmojiEventsIcon className="text-yellow-500" />
          <p className="text-sm">An aspiring student</p>
        </div>
        <p className="text-xs">February 20 - February 20</p>
      </div>
    </div>
  );
};

export default Hero;
