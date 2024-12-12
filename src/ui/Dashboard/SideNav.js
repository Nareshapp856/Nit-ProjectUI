import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import { Collapse } from "@mui/material";
import { useState } from "react";

function SideNavMenu({ flag }) {
  return (
    <div className="absolute top-[4rem] z-50 left-0 border-t border-b block sm:hidden border-[#9ba4a91c]">
      <Collapse in={flag}>
        <div className="w-screen bg-[#082F45] text-white text-center p-2">
          Home
        </div>
      </Collapse>
    </div>
  );
}

function SideNav() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="sm:min-h-screen fixed top-0 left-0 w-full h-[4rem] sm:w-[5rem] flex flex-row sm:flex-col sm:justify-center justify-between z-50 bg-[#082F45]">
      <img
        src={require("../../assets/Naresh_IT_Logo.png")}
        width="190"
        className="max-h-[60px] my-auto block sm:hidden"
      />
      <div className="h-full flex items-center">
        <div
          className="block sm:hidden me-4 cursor-pointer"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <MenuIcon sx={{ color: "#9ba4a9", fontSize: "2rem" }} />
        </div>

        <div className="">
          <SideNavMenu flag={showMenu} />
        </div>

        <div className="hidden sm:block mx-auto">
          <HomeIcon sx={{ color: "#fff", fontSize: "2rem" }} />
        </div>
      </div>
    </div>
  );
}

export default SideNav;
