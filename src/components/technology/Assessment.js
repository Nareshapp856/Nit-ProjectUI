import React from "react";

function Assessment() {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor="catogaryType" className="mt-4 ml-4">
        <input
          id="catogaryType"
          type="radio"
          checked
          disabled
          name="AssessmentID"
          value="1"
        />
        <span className="p-2">Assessment</span>
      </label>
    </div>
  );
}

export default Assessment;
