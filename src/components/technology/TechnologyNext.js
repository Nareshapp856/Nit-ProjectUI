import React, { useState } from "react";

function TechnologyNext({ isFormValid, errMsg }) {
  const [displayErr, setDisplayErr] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clickHandler = (e) => {
    if (isSubmitting) return;
    if (!isFormValid) {
      setDisplayErr(errMsg || "Must Select A Valid Technology");
      e.preventDefault();
    } else {
      setDisplayErr("");
    }
    if (isFormValid) {
      setIsSubmitting(true);
    }
  };

  return (
    <div className="h-20 relative">
      {displayErr && (
        <p className="text-red-900 font-bold text-center -top-8 px-14  absolute w-full">
          {displayErr}
        </p>
      )}
      <div className="w-full flex mt-14" onClick={clickHandler}>
        <button
          onClick={clickHandler}
          className={`inline-block px-14 py-2 mx-auto mt-3 bg-green-300 hover:bg-green-400`}
        >
          {isSubmitting ? "Loading..." : "Next"}
        </button>
      </div>
    </div>
  );
}

export default TechnologyNext;
