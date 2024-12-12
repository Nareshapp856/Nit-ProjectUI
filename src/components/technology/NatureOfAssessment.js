import React from "react";

function NatureOfAssessment({ natureID, setNatureID }) {
  const changeHandler = (e) => setNatureID(e.target.value);

  return (
    <div className="mx-4">
      <legend>Nature of Assessment:</legend>
      <div className="mt-2 mb-5">
        <label className="p-5">
          <input
            type="radio"
            name="NatureID"
            value="1"
            defaultChecked={Number(natureID) === 1 || natureID === 1}
            onChange={changeHandler}
          />
          <span className="p-2">Dynamic</span>
        </label>
        <label className="p-5">
          <input
            type="radio"
            name="NatureID"
            value="2"
            defaultChecked={Number(natureID) === 2 || natureID === 2}
            onChange={changeHandler}
          />
          <span className="p-2">Fixed</span>
        </label>
      </div>
    </div>
  );
}

export default NatureOfAssessment;
