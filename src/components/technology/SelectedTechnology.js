import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { types } from "../../store/root.actions";
import LoadingScreen from "../../ui/LoadingScreen";
import ErrorScreen from "../../ui/ErrorScreen";

function getCurrentValue(id, arr) {
  if (!(id || arr)) {
    throw new Error("must pass valid data to getCurrentValue");
  }

  if (typeof arr !== "object") {
    throw new Error("must pass array as second paraem");
  }

  const currentArr = arr.find(
    (ele) =>
      Number(ele?.TechnologyID) === Number(id) ||
      ele?.TechnologyID === Number(id)
  );

  return currentArr?.TechnologyID;
}

function SelectedTechnologyComponent({
  setTechnologyID,
  technologyList,
  isLoading,
  isError,
  getTechnologies,
}) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const technologyId = queryParams.get("technologyId");
  const [programmingLanguages, setProgrammingLanguages] = useState();

  // store current value to display
  const [selectedValue, setSelectedValue] = useState(String(technologyId));

  // fetch data
  useEffect(() => {
    getTechnologies();
  }, []);

  useEffect(() => {
    setProgrammingLanguages(technologyList || []);
  }, [technologyList]);

  // on selected value change
  const changeHandler = (e) => {
    setTechnologyID(e.target.value);

    if (typeof programmingLanguages === "object") {
      setSelectedValue(getCurrentValue(e.target.value, programmingLanguages));
    }
  };

  return (
    <div>
      {isLoading && <LoadingScreen />}
      {isError && <ErrorScreen />}
      <div className="flex flex-col mx-4">
        {/** Technology Name from ID */}
        <input
          className="hidden"
          value={String(
            programmingLanguages?.find(
              (ele) =>
                ele.TechnologyID === selectedValue ||
                Number(ele.TechnologyID) === Number(selectedValue)
            )?.TechnologyName
          )}
          onChange={() => {}}
          name="TechnologyName"
        />

        <label>Select Technology</label>
        <select
          id="proglang"
          name="TechnologyID"
          className="mx-6 w-[350px] my-4"
          value={selectedValue}
          onChange={changeHandler}
        >
          {/** default */}
          <option value="-1">Select A Technology</option>

          {Array.isArray(programmingLanguages) &&
            programmingLanguages.map(({ TechnologyID, TechnologyName }) => (
              <option key={TechnologyID} value={TechnologyID}>
                {TechnologyName}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}

const mapStateToComponent = (state) => ({
  technologyList: state.technologiesListReducer.data,
  isLoading: state.technologiesListReducer.isLoading,
  isError: state.technologiesListReducer.isError,
});

const mapDispatchToComponent = {
  getTechnologies: () => ({ type: types.TECHNOLOGY_LIST }),
};

const SelectedTechnology = connect(
  mapStateToComponent,
  mapDispatchToComponent
)(SelectedTechnologyComponent);

export default SelectedTechnology;
