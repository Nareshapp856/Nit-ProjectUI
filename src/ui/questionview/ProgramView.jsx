import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useLocation } from "react-router";
import api, { baseURL } from "../../services/api";
import { useEffect } from "react";
import { Questions } from "../../pages/QuestionView";
import axios from "axios";

function getURL(type, currentCombination) {
  let DifficultyLevelID = 1;

  if (type === "easy") {
    DifficultyLevelID = 1;
  } else if (type === "medium") {
    DifficultyLevelID = 2;
  } else if (type === "hard") {
    DifficultyLevelID = 3;
  }

  return `${baseURL}fetchFixedProgrammQuestions?DifficultyLevelID=${DifficultyLevelID}&ModuleID=${
    currentCombination.ModuleID
  }&TopicID=${
    Number(currentCombination.TopicID) === 0 ? null : currentCombination.TopicID
  }&SubTopicID=${
    Number(currentCombination.SubTopicID) === 0
      ? null
      : currentCombination.SubTopicID
  }`;
}

function ProgramView({ data, handler, setter }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryEasy = queryParams.get("easy") || 0;
  const queryMedium = queryParams.get("medium") || 0;
  const queryHard = queryParams.get("hard") || 0;

  let currentCombination;

  if (data?.combination && data?.element?.id) {
    currentCombination = data?.combination[data?.element?.id];
  }
  const currentEasy = currentCombination?.easy;
  const currentMedium = currentCombination?.medium;
  const currentHard = currentCombination?.hard;

  const [currentTotal, setCurrentTotal] = useState(null);
  const [filter, setFilter] = useState("all");

  // used to update current include value in modal
  const [currentValue, setCurrentValue] = useState();

  useEffect(() => {
    if (data.type === "easy") {
      setCurrentTotal(queryEasy);
      setCurrentValue(currentEasy);
    }

    if (data.type === "medium") {
      setCurrentTotal(queryMedium);
      setCurrentValue(currentMedium);
    }

    if (data.type === "hard") {
      setCurrentTotal(queryHard);
      setCurrentValue(currentHard);
    }
  }, [
    data.type,
    currentEasy,
    currentHard,
    currentMedium,
    queryEasy,
    queryMedium,
    queryHard,
  ]);

  // ...
  const key = currentCombination.id;
  const [includes, setIncludes] = useState({
    [key]: {
      easy: currentCombination?.includes?.easy?.includes || [],
      medium: currentCombination?.includes?.medium?.includes || [],
      hard: currentCombination?.includes?.hard?.includes || [],
    },
  });

  const postIncludes = async (obj) => {
    let includesArr = [];
    Object.values(obj[data.modalData?.id]).forEach((ele) => {
      if (ele) {
        ele.forEach((item) => includesArr.push(item));
      }
    });
  };

  function modalHandler(flag, question) {
    /* if (flag) {
        if (includes[key][data.type]?.length === 5)
          if (includes[key][data.type]?.length + 1 > currentValue) {
            window.alert("Must remove one question before inserting new");
          }
      } */
    if (
      flag &&
      Object.values(includes)[0][data.type].length <=
        currentCombination[data.type]
    ) {
      setIncludes((prev) => {
        const obj = { ...prev };
        if (!obj[data.modalData?.id]) {
          obj[data.modalData?.id] = {
            easy: [],
            medium: [],
            hard: [],
          };
        }
        if (
          obj[data.modalData?.id] &&
          !obj[data.modalData?.id][data?.type].includes(question.ProgramId)
        ) {
          obj[data.modalData?.id][data?.type].push(question.ProgramId);
        }
        // to post the new included object
        postIncludes(obj);

        return obj;
      });
    } else {
      setIncludes((prev) => {
        const obj = { ...prev };
        if (!obj[data.modalData?.id]) {
          obj[data.modalData?.id] = {
            easy: [],
            medium: [],
            hard: [],
          };
        }

        if (
          obj[data.modalData?.id] &&
          obj[data.modalData?.id][data?.type].includes(question.ProgramId)
        ) {
          const index = obj[data.modalData?.id][data?.type].indexOf(
            question.ProgramId
          );
          obj[data.modalData?.id][data?.type].splice(index, 1); // Remove the element at the found index
        }

        // to post the new included object
        postIncludes(obj);

        return obj;
      });
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="p-4"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>
          <ProgramViewFixedModalHeader data={data} setter={setter} />

          <ProgramViewFixedModalBody
            modalHandler={modalHandler}
            currentCombination={currentCombination}
            type={data?.type}
            filter={filter}
            currentValue={currentValue}
            currentIncludes={includes[key][data.type]?.length}
            setCurrentValue={setCurrentValue}
          />

          <ProgramViewFixedModalFooter
            data={data}
            includes={includes}
            handler={handler}
            setter={setter}
            currentTotal={currentTotal}
            currentIncludes={includes[key][data.type]?.length}
            currentValue={currentValue}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function ProgramViewFixedModalBody({
  modalHandler,
  currentValue,
  type,
  filter,
  setCurrentValue,
  currentCombination,
  currentIncludes,
}) {
  const [questions, setQuestions] = useState([]);

  const included = currentCombination.includes?.[type]?.includes || [];

  const includedQuestions = [];

  included.forEach((include) => {
    const includedQuestion = questions.find((ele) => ele.ProgramId === include);
    if (includedQuestion) {
      includedQuestions.push(includedQuestion);
    }
  });

  useEffect(() => {
    axios.get(getURL(type, currentCombination)).then((res) => {
      setQuestions(res.data);
    });
  }, [currentCombination, type]);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      end={{ opacity: 0, height: 0 }}
      className="max-h-[24rem] w-[50vw] border-2 border-gray-300 overflow-y-scroll overflow-x-hidden"
    >
      {questions.length > 0 ? (
        <Questions
          modalHandler={modalHandler}
          questions={filter === "all" ? questions : includedQuestions}
          type={type}
          currentCombination={currentCombination}
          currentValue={currentValue}
          setCurrentValue={setCurrentValue}
          currentIncludes={currentIncludes}
        />
      ) : (
        <div className="h-20 grid place-content-center">
          <p className="font-bold text-gray-400">No Question To Show!</p>
        </div>
      )}
    </motion.div>
  );
}

function ProgramViewFixedModalHeader({ data, setter }) {
  return (
    <div
      className="flex justify-between text-nowrap w-[50vw]"
      onClick={(e) => e.preventDefault()}
    >
      <h2 className="text-blue-700 flex flex-wrap">
        <span className="px-4 pt-4">
          {data?.element?.selectedModule || "None Selected"}
        </span>
        <span className="px-4 pt-4">
          {data?.element?.selectedTopic || "None Selected"}
        </span>
        <span className="px-4  pt-4">
          {data?.element?.selectedSubTopic || "None Selected"}
        </span>
      </h2>
      <button
        className="cursor-pointer font-bold text-pretty me-4 text-[2rem]"
        onClick={() => setter(false)}
      >
        &times;
      </button>
    </div>
  );
}
function ProgramViewFixedModalFooter({
  data,
  includes,
  handler,
  setter,
  currentIncludes,
  currentValue,
}) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const TestID = queryParams.get("TestID") || 0;
  const TestDetailsID = queryParams.get("TestDetailsID");
  const technologyId = queryParams.get("TechnologyID");
  const technologyName = queryParams.get("TechnologyName");

  const QuestionTypeID = queryParams.get("QuestionTypeID");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitHandler = async () => {
    if (isSubmitting) return;
    let includesArr = [];
    Object.values(includes[data.modalData?.id]).forEach((ele) => {
      if (ele) {
        ele.forEach((item) => includesArr.push(item));
      }
    });

    setIsSubmitting(true);

    const res = await api.post("/InsertionQuestionView", {
      TechnologyId: technologyId,
      TechnologyName: technologyName,
      ModuleName: data?.modalData?.selectedModule,
      ModuleId: data?.modalData?.ModuleID,
      TopicName: data?.modalData?.selectedSubTopic,
      TopicId: data?.modalData?.TopicID,
      SubtopicName: data?.modalData?.selectedTopic,
      SubtopicId: data?.modalData?.SubTopicID,
      EasyCount: data?.element?.easy,
      MediumCount: data?.element?.medium,
      HardCount: data?.element?.hard,
      TestId: TestID,
      TestDetailsId: TestDetailsID,
      SelectedQuestions: [...new Set(includesArr)].join(","),
      type: QuestionTypeID === "1" ? "MCQ" : "code",
    });

    handler(includes, data.type);
    setter(false);
  };

  return (
    <div className="mt-4 text-center flex w-[50vw]">
      <p className="py-2 ms-10">
        current count: {currentIncludes || 0}/{currentValue || 0}
      </p>
      <button
        onClick={submitHandler}
        className="inline-block max-h-10 px-14 py-2 mx-auto bg-green-300 hover:bg-green-400"
      >
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
    </div>
  );
}
export default ProgramView;
