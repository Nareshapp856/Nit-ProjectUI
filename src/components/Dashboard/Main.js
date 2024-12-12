import TaskContainer from "./main/TaskContainer";
import TestContainerComponent from "./main/TestContainer";
import UserProfile from "./main/test/UserProfile";
import Hero from "./main/test/userProfile/Hero";

function Main() {
  return (
    <div className="w-full h-full mx-auto flex flex-wrap">
      <div className="w-full block mx-auto lg:w-[80%] xl:hidden">
        <Hero />
      </div>

      <div className="w-full mt-4 lg:w-[80%] xl:w-[50%] lg:mx-auto xl:mt-0 mx-auto">
        <TaskContainer />
      </div>

      <div className="w-full mx-auto lg:w-[80%] xl:w-[24%] mt-4 xl:mt-0">
        <TestContainerComponent />
      </div>

      <div className="w-full mx-auto lg:w-[80%] xl:w-[24%] mt-4 xl:mt-0">
        <UserProfile />
      </div>
    </div>
  );
}

export default Main;
