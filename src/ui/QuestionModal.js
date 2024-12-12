import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function QuestionModal({ data: questionData, setter: setQuestionData }) {
  const {
    QuestionID,
    Question,
    DifficultyLevelID,
    OptionA,
    OptionB,
    OptionC,
    OptionD,
    CorrectAnswer,
  } = questionData;

  const difficulty =
    DifficultyLevelID === 1
      ? "Easy"
      : DifficultyLevelID === 2
      ? "Medium"
      : "Hard";

  return (
    <div
      className="absolute w-[60%] overflow-x-hidden h-[80vh] scroll scroll-sharp overflow-scroll bg-white rounded-lg shadow-lg p-8 top-[20%] left-[20%]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-end">
        <CloseIcon
          fontSize="large"
          onClick={() => setQuestionData(false)}
          className="cursor-pointer"
        />
      </div>
      <section className="font-medium text-xl mb-8">
        <div className="flex justify-between border-b-2 border-gray-300 mb-4 relative">
          <h1 className="text-2xl inline-block">Question {QuestionID}</h1>

          <p className="absolute bottom-0 right-0 font-normal text-sm inline-block">
            Difficulty: {difficulty}
          </p>
        </div>
        <article>
          <h2 className=" text-lg font-semibold mb-2 ">Question:</h2>
          <p className="mb-4 pl-3">{Question}</p>
        </article>

        <article className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Options:</h2>
          <ul className="pl-3 text-lg">
            <li className="">{OptionA}</li>
            <li className="">{OptionB}</li>
            <li className="">{OptionC}</li>
            <li className="">{OptionD}</li>
          </ul>
        </article>

        <article className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Answer:</h2>
          <p className="pl-3 text-lg">{CorrectAnswer}</p>
        </article>
      </section>
    </div>
  );
}

export default QuestionModal;
