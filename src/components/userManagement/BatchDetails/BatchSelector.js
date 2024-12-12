import ModuleDropDown from "./inputfields/ModuleDropDown";
import TechnologyDropDown from "./inputfields/TechnologyDropDown";
import FacultyDropDown from "./inputfields/FacultyDropDown";
import MentoreDropDown from "./inputfields/MentoreDropDown";
import BatchNameField from "./inputfields/BatchNameField";
import BatchAdminField from "./inputfields/BatchAdminField";
import BatchDatePicker from "./inputfields/BatchDatePicker";
import BatchStartDate from "./inputfields/BatchStartDate";
import BatchEndDate from "./inputfields/BatchEndData";
import { useSelector } from "react-redux";

function BatchSelector() {
  return (
    <div className="flex justify-between w-full mx-auto flex-wrap">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full grid-rows-3 gap-4 gap-y-10 mt-[70px]">
        <div>
          <TechnologyDropDown />
        </div>

        {/* <div>
          <ModuleDropDown />
        </div> */}
        {/* 
        <div>
          <FacultyDropDown />
        </div>

        <div>
          <MentoreDropDown />
        </div> */}

        <div className="flex items-center">
          <BatchNameField />
        </div>

        <div className="flex items-center">
          <BatchAdminField />
        </div>
        <div>
          <BatchStartDate />
        </div>
        <div>
          <BatchEndDate />
        </div>
      </div>
    </div>
  );
}

export default BatchSelector;
