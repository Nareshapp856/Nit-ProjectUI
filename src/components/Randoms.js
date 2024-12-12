import React from "react";
import BuilderService from "../services/builder";

function Randoms({ random, setRandom, fixedDisabled }) {
  return (
    <fieldset className="mx-4">
      <legend>Random:</legend>
      <div className="mt-2">
        <label className="p-5">
          <input
            type="radio"
            name="random"
            value="completeTest"
            checked={random === "completeTest"}
            onChange={(e) => setRandom(e.target.value)}
          />
          <span className="ps-2">Complete Test</span>
        </label>
        <label className="p-5">
          <input
            type="radio"
            name="random"
            value="moduleWiseRandom"
            checked={random === "moduleWiseRandom"}
            onChange={(e) => setRandom(e.target.value)}
          />
          <span className="ps-2">Module Wise Random</span>
        </label>

        <label className="p-5">
          <input
            type="radio"
            name="random"
            value="noRandom"
            checked={random === "noRandom"}
            onChange={(e) => setRandom(e.target.value)}
          />
          <span className="ps-2">No Random</span>
        </label>
      </div>
    </fieldset>
  );
}
export default Randoms;
