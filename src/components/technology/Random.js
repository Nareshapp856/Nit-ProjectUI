import React from "react";

function RandomV2({ randomID, setRandomID }) {
  const changeHandler = (e) => setRandomID(e.target.value);

  return (
    <div className="mx-4">
      <legend>Random:</legend>
      <div className="mt-2">
        <label className="p-5">
          <input
            type="radio"
            name="RandomID"
            value="1"
            onChange={changeHandler}
            defaultChecked={Number(randomID) === 1 || randomID === 1}
          />
          <span className="ps-2">Complete Test</span>
        </label>
      </div>
    </div>
  );
}

export default RandomV2;
