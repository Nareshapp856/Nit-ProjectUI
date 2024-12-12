import React from "react";
import { Questions } from "../pages/QuestionView";

function QuestionsViewFixedHard({ questions }) {
  if (questions.length === 0) return <h1>Loading...</h1>;

  return (
    <main>
      <Questions questions={questions} />
    </main>
  );
}

export default QuestionsViewFixedHard;
