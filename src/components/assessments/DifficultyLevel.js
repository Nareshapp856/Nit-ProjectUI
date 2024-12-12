import React from "react";

function DifficultyLevel({
  handler,
  questionType,
  difficultyLevel,
  difficultyLevels,
  maxCount,
  valueChangeHandler,
  id,
}) {
  const changeHandler = (e) => {
    handler(questionType, difficultyLevel, e.target.value);
    valueChangeHandler(
      Number(difficultyLevels[questionType][difficultyLevel]),
      Number(e.target.value)
    );
  };

  let styles =
    "bg-white ms-2 me-4 w-16 scrollHide border-[1px] border-gray-400 rounded text-center";
  if (Number(maxCount) === 0) {
    styles =
      "bg-gray-300 text-gray-800 ms-2 me-4 w-16 scrollHide border-[1px] border-gray-400 rounded text-center";
  }

  return (
    <div className="p-5 flex">
      <div className="flex">
        <label htmlFor={id}>{difficultyLevel}:</label>
        <input
          className={styles}
          type="number"
          id={id}
          name={id}
          disabled={Number(maxCount) === 0}
          value={difficultyLevels?.[questionType]?.[difficultyLevel]}
          onChange={changeHandler}
        />
      </div>
      <div>
        <span className="font-bold">&#x2f;</span>{" "}
        <span className=" text-yellow-600 font-bold">{maxCount}</span>
      </div>
    </div>
  );
}

export default DifficultyLevel;
