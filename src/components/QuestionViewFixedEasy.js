import React, { useContext, useEffect, useState } from "react";
import QuestionViewFixedCtx from "../context/questionViewFixed";
import { Questions } from "../pages/QuestionView";
import { NavLink } from "react-router-dom";
import Pagination from "./Pagination";
import { LocalStorage } from "../services/LocalStorage";

function QuestionViewFixedEasy({
  questions,
  setCurrentPage,
  onPaginationChange,
  state,
  dispatcher,
}) {
  const [currentPagination, setCurrentPagination] = useState(1);

  function currentQuestionViewHandler(flag) {
    if (flag) {
      if (state.currentQuestionView < LocalStorage.questionView.length - 1)
        dispatcher({ type: "questionViewInc" });
    } else {
      if (state.currentQuestionView > 0)
        dispatcher({ type: "questionViewDec" });
    }
  }

  function onPageChange(flag) {
    if (currentPagination < LocalStorage?.questionView?.length && flag) {
      setCurrentPagination((prev) => prev + 1);
    } else if (currentPagination > 1 && !flag) {
      setCurrentPagination((prev) => prev - 1);
    }
  }

  useEffect(() => {
    onPaginationChange("easy", currentPagination);
  }, [currentPagination]);

  if (questions.length === 0) return <h1>Loading...</h1>;

  return (
    <main>
      <section>
        <div>
          <div className="border-b-4 border-gray-200">
            <Questions questions={questions} />
          </div>
          <Pagination
            currentPage={currentPagination}
            totalPages={LocalStorage?.questionView?.length}
            onPageChange={onPageChange}
          />
        </div>
      </section>
      <section className="flex justify-center mt-4">
        <button
          onClick={() => currentQuestionViewHandler(false)}
          className="w-40 h-10 mx-2 bg-gray-300"
        >
          previous
        </button>
        <button
          onClick={() => currentQuestionViewHandler(true)}
          className="w-40 h-10 mx-2 bg-gray-300"
        >
          next
        </button>
      </section>
      <div className=" grid p-5 place-content-center">
        <button
          onClick={() => setCurrentPage("medium")}
          className="bg-green-300 px-5 py-2"
        >
          Continue
        </button>
      </div>
    </main>
  );
}

export default QuestionViewFixedEasy;
