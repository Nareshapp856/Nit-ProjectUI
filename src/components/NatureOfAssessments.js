import React from "react";
import BuilderService from "../services/builder";

function NatureOfAssessments({
  nature,
  setNature,
  editNatureId,
  setFixedDisabled,
}) {
  return (
    <fieldset className="mx-4">
      <legend>Nature of Assessment:</legend>
      <div className="mt-2 mb-5">
        <label className="p-5">
          <input
            type="radio"
            name="assessmentNature"
            value="dynamic"
            checked={nature === "dynamic"}
            onChange={(e) => {
              setFixedDisabled(false);
              setNature(e.target.value);
            }}
          />
          <span className="p-2">Dynamic</span>
        </label>
        <label className="p-5">
          <input
            type="radio"
            name="assessmentNature"
            checked={nature === "fixed" || editNatureId === "fixed"}
            value="fixed"
            onChange={(e) => {
              setFixedDisabled(true);
              setNature(e.target.value);
            }}
          />
          <span className="p-2">Fixed</span>
        </label>
        <label className="p-5">
          <input
            type="radio"
            name="assessmentNature"
            checked={nature === "fastTrack" || editNatureId === "fastTrack"}
            value="fastTrack"
            onChange={(e) => {
              setFixedDisabled(false);
              setNature(e.target.value);
            }}
          />
          <span className="p-2">Fast Track</span>
        </label>
      </div>
    </fieldset>
  );
}

export default NatureOfAssessments;
