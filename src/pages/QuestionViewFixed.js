import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Outlet } from "react-router";
import { useLocation } from "react-router-dom";
import { LocalStorage } from "../services/LocalStorage";
import QuestionViewFixedCtx, {
  QuestionViewFixedProvider,
} from "../context/questionViewFixed";
import QuestionViewFixedEasy from "../components/QuestionViewFixedEasy";
import QuestionViewFixedMedium from "../components/QuestionViewFixedMedium";
import QuestionsViewFixedHard from "../components/QuestionsViewFixedHard";
import QuestionViewCtx, { QuestionViewProvider } from "../context/questionView";
import AsssessmentQuestionBoxHandler from "../components/questionView/AsssessmentQuestionBoxHandler";
import TechnologyService from "../services/technologyService";
import QuestionViewFixedShowAll from "../components/QuestionsViewFixedShowAll";
import api from "../services/api";

function reducer(state, action) {
  switch (action.type) {
    case "easy":
      return { ...state, easy: action.payload };
    case "medium":
      return { ...state, medium: state.medium + 1 };
    case "hard":
      return { ...state, hard: state.hard + 1 };
    case "questionViewInc":
      return {
        ...state,
        currentQuestionView: state.currentQuestionView + 1,
      };
    case "questionViewDec":
      return {
        ...state,
        currentQuestionView: state.currentQuestionView - 1,
      };
    default:
      return state;
  }
}

// subTopicID for Questions 173
function QuestionViewFixed() {
  const [state, dispatcher] = useReducer(reducer, {
    easy: 0,
    medium: 0,
    hard: 0,
    currentQuestionView: 0,
  });

  //
  const { data, setData } = useContext(QuestionViewCtx);

  // Get Query Params.
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const totalEasy = queryParams.get("easy");
  const totalMedium = queryParams.get("medium");
  const totalHard = queryParams.get("hard");
  const subTopicId = queryParams.get("subTopicID");

  // Questions Related Variables.
  const [questions, setQuestions] = useState([]);
  const [easyQuestions, setEasyQuestions] = useState([]);
  const [mediumQuestions, setMediumQuestions] = useState([]);
  const [hardQuestions, setHardQuestions] = useState([]);

  // Stores String EASY | MEDIUM | HARD.
  const [currentPage, setCurrentPage] = useState("showAll");

  useEffect(() => {
    async function fetch() {
      // subtopicid is stored in localstorage

      const res = await api.get(
        `/fetchDynamicQuestions?Hardcount=${totalHard}&MediumCount=${totalMedium}&EasyCount=${totalEasy}&SubTopicID=${173}`
      );
      setQuestions(res.data);
    }
    fetch();
  }, []);

  // Assign required values into variables responnsibe for rendering that page
  useEffect(() => {
    // questions variable stores all the questions fetched by the loader.
    let easy = questions.filter((ele) => ele.DifficultyLevelID === 1);
    let medium = questions.filter((ele) => ele.DifficultyLevelID === 2);
    let hard = questions.filter((ele) => ele.DifficultyLevelID === 3);

    setEasyQuestions(easy);
    setMediumQuestions(medium);
    setHardQuestions(hard);
  }, [questions]);

  // when pagination changes on any page
  function onPaginationChange(difficultyLevel, currentPagination) {
    dispatcher({ type: difficultyLevel, payload: currentPagination });
  }

  // responsible for storing the component return question data jsx
  let content = (
    <QuestionViewFixedShowAll
      state={state}
      dispatcher={dispatcher}
      questions={questions}
      setCurrentPage={setCurrentPage}
      onPaginationChange={onPaginationChange}
    />
  );
  if (currentPage === "easy") {
    content = (
      <QuestionViewFixedEasy
        state={state}
        dispatcher={dispatcher}
        questions={easyQuestions}
        setCurrentPage={setCurrentPage}
        onPaginationChange={onPaginationChange}
      />
    );
  }
  if (currentPage === "medium")
    content = (
      <QuestionViewFixedMedium
        state={state}
        dispatcher={dispatcher}
        questions={mediumQuestions}
        setCurrentPage={setCurrentPage}
        onPaginationChange={onPaginationChange}
      />
    );
  if (currentPage === "hard")
    content = (
      <QuestionsViewFixedHard
        state={state}
        dispatcher={dispatcher}
        questions={hardQuestions}
        setCurrentPage={setCurrentPage}
        onPaginationChange={onPaginationChange}
      />
    );

  // technology selected in Technology page.
  const selectTechnology = TechnologyService.technology?.programmingLanguage;

  const [stale, setStale] = useState(false);

  const [questionView, setQuestionView] = useState([]);

  const [currentQuestionView, setCurrentQuestionView] = useState(
    LocalStorage.questionView[state.currentQuestionView]
  );

  useEffect(() => {
    setCurrentQuestionView(
      LocalStorage.questionView[state.currentQuestionView]
    );
  }, [state.currentQuestionView]);

  return (
    <main>
      <section className="flex justify-center my-10">
        <section className="flex justify-between w-full px-5">
          <aside className="flex">
            <button onClick={() => setCurrentPage("easy")}>Easy</button>
            <button onClick={() => setCurrentPage("medium")}>Medium</button>
            <button onClick={() => setCurrentPage("hard")}>Hard</button>
            <button onClick={() => setCurrentPage("showAll")}>ShowAll</button>
          </aside>
          <article className="">
            <h2>Selected Module:</h2>
            <p>
              {currentQuestionView.selectedModule.moduleName || "None Selected"}
            </p>
          </article>
          <article>
            <h2>Selected Topic:</h2>
            <p>
              {currentQuestionView.selectedTopic.topicName || "None Selected"}
            </p>
          </article>
          <article>
            <h2>Selected SubTopic:</h2>
            <p>
              {currentQuestionView.selectedSubTopic.subTopicName ||
                "None Selected"}
            </p>
          </article>
        </section>
      </section>
      <section className="border-t-4 border-gray-200">{content}</section>
    </main>
  );
}

export default QuestionViewFixed;
