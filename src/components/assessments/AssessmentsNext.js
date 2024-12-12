import React, { useState, useEffect } from "react";

export function AssessmentsNext({
  maxEasyCount,
  maxMediumCount,
  maxHardCount,
  assessment,
  difficultyLevel,
  warn,
  setWarn,
}) {
  let easy = Number(difficultyLevel?.[assessment]?.Easy) === 0;
  let medium = Number(difficultyLevel?.[assessment]?.Medium) === 0;
  let hard = Number(difficultyLevel?.[assessment]?.Hard) === 0;

  if (easy === undefined || easy === "undefined") easy = true;
  if (medium === undefined || medium === "undefined") medium = true;
  if (hard === undefined || hard === "undefined") hard = true;

  let disabled = easy && medium && hard;

  // Validation for count Start

  const [capBranker, setCapBraker] = useState(false);

  useEffect(() => {
    if (typeof difficultyLevel === "object") {
      let easyCount = 0;
      let mediumCount = 0;
      let hardCount = 0;

      const stuff = Object.values(difficultyLevel)[0];

      Object.entries(stuff).forEach(([key, value], index) => {
        switch (key) {
          case "Easy":
            easyCount = value;
          case "Medium":
            mediumCount = value;
          case "Hard":
            hardCount = value;

            if (
              easyCount > maxEasyCount ||
              mediumCount > maxMediumCount ||
              hardCount > maxHardCount
            ) {
              setCapBraker(true);
            } else {
              // in future use index to validate for array of items
              setCapBraker(false);
            }
        }
      });
    }
  }, [difficultyLevel, maxEasyCount, maxMediumCount, maxHardCount]);

  useEffect(() => {
    if (capBranker)
      setWarn(
        "Must choose question less then or equal to that are in the database"
      );
    {
      if (!capBranker) {
        if (
          warn ===
          "Must choose question less then or equal to that are in the database"
        ) {
          setWarn(false);
        }
      }
    }
  }, [capBranker]);

  // Validation fro count End

  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextHandler = (e) => {
    if (isSubmitting) {
      e.preventDefault();
      return;
    }
    if (disabled || warn) {
      setWarn(true);
      e.preventDefault();
    } else {
      setIsSubmitting(true);
      setWarn(false);
    }
  };

  return (
    <>
      <div className="relative">
        <div className="flex flex-col align-center">
          {warn && (
            <p className="width-full text-center text-red-600 font-semibold mb-3">
              {typeof warn == "string"
                ? warn
                : disabled
                ? "Number of Questions must be greater then 0"
                : "Total Questions must match easy + medium + hard"}
            </p>
          )}
          <p className="text-center w-full">
            <span className="text-yellow-600 font-semibold">Yellow </span> Color
            indicates total available questions in database
          </p>
        </div>
        <p className="text-red-900 font-bold text-center -top-8 px-14  absolute w-full"></p>

        <div className="w-full flex">
          <button
            type="submit"
            onClick={nextHandler}
            className={`inline-block px-14 py-2 mx-auto mt-3 bg-green-300 hover:bg-green-400`}
          >
            {isSubmitting ? "Loading..." : "Next"}
          </button>
        </div>
      </div>
    </>
  );
}

export default AssessmentsNext;
