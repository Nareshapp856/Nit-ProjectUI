import React, { useEffect, useRef } from "react";
import AssessmentService from "../services/assessmentsService";
import { LocalStorage } from "../services/LocalStorage";
import BuilderService from "../services/builder";

function QuestionTypes({
  questionType,
  data,
  setData,
  dataQuestions,
  setDataQuestions,
  dataDifficulty,
  setDataDifficulty,
  queryEasy,
  queryMedium,
  queryHard,
  queryTotal,
}) {
  return (
    <>
      <label htmlFor="data">
        <input
          className="bg-white ms-4 w-6 scrollHide border-[1px] border-gray-400 rounded"
          id="data"
          name="data"
          type="checkbox"
          value={data}
          checked
          disabled
          onChange={() => {
            setData((prev) => !prev);
          }}
        />
        {questionType}
      </label>

      {data && (
        <section className="p-5">
          <NumberOfQuestions
            dataQuestions={dataQuestions}
            setDataQuestions={setDataQuestions}
            queryTotal={queryTotal}
          />
          <fieldset>
            <legend>Difficulty Levels:</legend>
            <div className="ms-6 mt-4">
              <DifficultyLevel
                difficultyLevel="easy"
                dataDifficulty={dataDifficulty}
                dataQuestions={dataQuestions}
                setDataDifficulty={setDataDifficulty}
                queryData={queryEasy}
              />
              <DifficultyLevel
                difficultyLevel="medium"
                dataDifficulty={dataDifficulty}
                dataQuestions={dataQuestions}
                setDataDifficulty={setDataDifficulty}
                queryData={queryMedium}
              />
              <DifficultyLevel
                difficultyLevel="hard"
                dataDifficulty={dataDifficulty}
                dataQuestions={dataQuestions}
                setDataDifficulty={setDataDifficulty}
                queryData={queryHard}
              />
            </div>
          </fieldset>
        </section>
      )}
    </>
  );
}

export default QuestionTypes;

function DifficultyLevel({
  difficultyLevel,
  dataDifficulty,
  setDataDifficulty,
  dataQuestions,
  queryData,
}) {
  return (
    <label htmlFor="dataEasy">
      {difficultyLevel}:
      <input
        className="bg-white ms-2 me-4 w-16 scrollHide border-[1px] border-gray-400 rounded"
        type="number"
        id="dataEasy"
        name="dataEasy"
        defaultValue={
          queryData ||
          LocalStorage.data?.assessmentData?.MCQ?.difficulty[difficultyLevel] ||
          0
        }
        onChange={(e) =>
          setDataDifficulty((prev) => {
            const obj = { ...prev };

            BuilderService.assessmentService =
              AssessmentService.updateDifficulty({
                ...AssessmentService.getDifficulty(),
                [difficultyLevel]: Number(e.target.value),
              });

            LocalStorage.data.assessmentData.MCQ.difficulty[difficultyLevel] =
              Number(e.target.value);
            obj[difficultyLevel] = Number(e.target.value);
            return obj;
          })
        }
      />
    </label>
  );
}

export function NumberOfQuestions({ dataQuestions, setDataQuestions }) {
  return (
    <label htmlFor="dataNo.Q">
      Number of Questions:
      <input
        className="bg-white mb-4 ms-2 w-16 scrollHide border-[1px] border-gray-400 rounded"
        type="number"
        name="No.Q-secondary"
        defaultValue={
          LocalStorage.data?.assessmentData?.MCQ?.totalQuestions || 0
        }
        onChange={(e) => setDataQuestions(Number(e.target.value))}
      />
    </label>
  );
}
