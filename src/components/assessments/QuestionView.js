import React, { useState } from "react";
import DifficultyLevel from "./DifficultyLevel";

function QuestionType({
  handler: parentHandler,
  questionType,
  NatureID,
  TestCaseID,
  difficultyLevels,
  easyCount,
  mediumCount,
  hardCount,
  setWarn,
  queryTotal,
  setCurrentTotal,
  currentTotal,
  QuestionTypeID,
  setQuestionTypeID,
}) {
  const totalChangeHandler = (e) => {
    const newValue = Number(e.target.value);

    if (newValue < queryTotal) {
      setWarn(true);
    }

    setCurrentTotal(e.target.value);
    if (e.target.value < queryTotal) {
      if (Number(queryTotal) !== 0)
        setWarn(
          `You Have Selected ${queryTotal} Questions. Should not decrease Existing Value`
        );
    } else {
      setWarn(false);
    }
  };

  const handleRadioChange = (e) => {
    setQuestionTypeID(e.target.value);
  };

  const handler = (questionType, level, newValue) => {
    if (
      !(
        Number(difficultyLevels[questionType]["Easy"]) +
          Number(difficultyLevels[questionType]["Medium"]) +
          Number(difficultyLevels[questionType]["Hard"]) -
          Number(difficultyLevels[questionType][level]) +
          Number(newValue) >
        currentTotal
      )
    ) {
      parentHandler(questionType, level, newValue);
    }
  };

  const valueChangeHandler = (prevValue, newValue) => {
    if (
      Number(difficultyLevels[questionType]["Easy"]) +
        Number(difficultyLevels[questionType]["Medium"]) +
        Number(difficultyLevels[questionType]["Hard"]) -
        Number(prevValue) +
        Number(newValue) !==
      Number(currentTotal)
    ) {
      setWarn(Number(currentTotal) !== 0 && true);
    }
    if (
      Number(difficultyLevels[questionType]["Easy"]) +
        Number(difficultyLevels[questionType]["Medium"]) +
        Number(difficultyLevels[questionType]["Hard"]) -
        Number(prevValue) +
        Number(newValue) !==
      Number(currentTotal)
    ) {
      setWarn(true);
    } else {
      setWarn(false);
    }
  };

  return (
    <>
      {/**  Question Type */}
      <div>
        <label htmlFor="mcq">
          <input
            className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
            id="mcq"
            name="QuestionTypeID"
            type="radio"
            value="1"
            checked={QuestionTypeID === "1"}
            onChange={handleRadioChange}
          />
          MCQ
        </label>

        <label htmlFor="programCode">
          <input
            className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
            id="programCode"
            name="QuestionTypeID"
            type="radio"
            value="2"
            checked={QuestionTypeID === "2"}
            onChange={handleRadioChange}
          />
          Program Code
        </label>
      </div>

      {QuestionTypeID === "2" && (
        <div className="mt-5 flex">
          <label htmlFor="withoutTestcases">
            <input
              className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
              id="withoutTestcases"
              name="TestCaseID"
              type="radio"
              defaultChecked={TestCaseID === 1}
              disabled={QuestionTypeID !== "2"}
              value={1}
            />
            With TestCases
          </label>
          <label htmlFor="withTestcases">
            <input
              className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
              id="withTestcases"
              name="TestCaseID"
              type="radio"
              defaultChecked={TestCaseID === 0}
              style={{
                opacity: QuestionType !== "2" ? 0.6 : 1,
              }}
              disabled={QuestionTypeID !== "2"}
              value={0}
            />
            Without TestCases
          </label>
        </div>
      )}

      <div className="ms-5 mt-5 flex">
        <div>
          <label>Number of Questions:</label>
          <input
            type="number"
            value={String(currentTotal)}
            onChange={totalChangeHandler}
            className="bg-white ms-2 me-4 w-16 scrollHide border-[1px] border-gray-400 rounded text-center"
          />
        </div>
        {false && (
          <p className="width-full text-red-600 font-semibold mb-3"></p>
        )}
      </div>

      {/**  Difficulty Levels */}
      <div className="p-5">
        <p>DifficultyLevel</p>

        <div className="flex">
          {/* easy */}
          <DifficultyLevel
            id={"NumOfEasy"}
            handler={handler}
            difficultyLevel={"Easy"}
            questionType={questionType}
            valueChangeHandler={valueChangeHandler}
            difficultyLevels={difficultyLevels}
            maxCount={easyCount}
          />

          {/* medium */}
          <DifficultyLevel
            id={"NumOfMedium"}
            handler={handler}
            difficultyLevel={"Medium"}
            questionType={questionType}
            valueChangeHandler={valueChangeHandler}
            difficultyLevels={difficultyLevels}
            maxCount={mediumCount}
          />

          {/* hard */}
          <DifficultyLevel
            id={"NumOfHard"}
            handler={handler}
            difficultyLevel={"Hard"}
            questionType={questionType}
            valueChangeHandler={valueChangeHandler}
            difficultyLevels={difficultyLevels}
            maxCount={hardCount}
          />
        </div>
      </div>
    </>
  );
}

export default QuestionType;
