import React from "react";
import { Questions } from "../pages/QuestionView";

function QuestionViewFixedMedium({ questions, setCurrentPage }) {
  if (questions.length === 0) return <h1>Loading...</h1>;

  return (
    <main>
      <Questions questions={questions} />
      <div className=" grid p-5 place-content-center">
        <button
          onClick={() => setCurrentPage("hard")}
          className="bg-green-300 px-5 py-2"
        >
          Continue
        </button>
      </div>
    </main>
  );
}

export default QuestionViewFixedMedium;
