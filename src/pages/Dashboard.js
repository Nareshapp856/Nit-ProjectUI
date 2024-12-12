import React from "react";
import SideNav from "../ui/Dashboard/SideNav";
import Main from "../components/Dashboard/Main";

function Dashboard() {
  return (
    <div className="h-screen min-w-full bg-gradient-to-r overflow-auto hide-scroll from-[#082F4560] via-white to-white">
      <main className="relative w-full sm:flex">
        <SideNav />

        <div class="flex-1 mx-2 sm:ml-24 me-4 mt-[5rem] sm:mt-4 lg:me-0">
          <Main />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
