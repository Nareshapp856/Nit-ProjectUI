import { useReducer } from "react";
import ModuleDropDown from "./ModuleDropDown";
import TechnologyDropDown from "./TechnologyDropDown";
import { Button } from "@mui/material";

// Helper function to update state based on action type and payload
const reducerHelper = (state, type, data) => {
  return { ...state, [type]: data };
};

// Reducer function to manage technology data state
const technologyDataReducer = (state, action) => {
  switch (action.type) {
    case "technologyId":
      return reducerHelper(state, "technologyId", action.payload);
    case "moduleId":
      return reducerHelper(state, "moduleId", action.payload);
    default:
      throw new Error("Invalid action.type for technologyDataReducer");
  }
};

const initialTechnologyData = {
  technologyId: 0,
  moduleId: 0,
};

function TechnologySelector({ fetchHandler, isNotSelected }) {
  // Initialize state using useReducer
  const [technologyData, dispatcher] = useReducer(
    technologyDataReducer,
    initialTechnologyData
  );

  return (
    <div className="w-4/6 text-center mb-6 mt-4 container flex justify-between mx-auto">
      {/* Technology dropdown component */}
      <TechnologyDropDown isNotSelected={isNotSelected} />

      {/* Module dropdown component */}
      <ModuleDropDown
        technologyData={technologyData}
        dispatcher={dispatcher}
        isNotSelected={isNotSelected}
      />

      {/* Button to trigger fetching tests */}
      <Button
        variant="contained"
        sx={{ width: "8rem", height: "3rem" }}
        onClick={fetchHandler}
      >
        Show Tests
      </Button>
    </div>
  );
}

export default TechnologySelector;
