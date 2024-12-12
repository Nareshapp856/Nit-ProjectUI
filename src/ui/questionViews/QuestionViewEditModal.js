import axios from "axios";
import { useEffect, useId, useRef, useState } from "react";
import { useLocation } from "react-router";
import api from "../../services/api";

// Returns Result Object
function getResult(data, id) {
  const timestamp = new Date().getTime().toString(); // Get current timestamp
  const randomString = Math.random().toString(36).substring(2, 10); // Generate a random string
  const combinedString = timestamp + randomString; // Combine timestamp and random string
  const encoded = btoa(combinedString); // Base64 encode the combined string
  const smallerId = encoded.substring(0, 8) + id; // Take the first 8 characters

  let result = {
    id: data.flag ? data.id || "" : data?.element?.id || smallerId,
    selectedModule: data?.element?.selectedModule,
    ModuleID: data?.element?.ModuleID,
    selectedTopic: data?.element?.selectedTopic,
    TopicID: data?.element?.TopicID,
    selectedSubTopic: data?.element?.selectedTopic,
    SubTopicID: data?.element?.SubTopicID,
    easy: data?.element?.easy || "",
    medium: data?.element?.medium || "",
    hard: data?.element?.hard || "",
  };

  // when creating new Combination data object is different
  if (data.DataObj) {
    result = {
      id: data.flag ? data.id || 0 : data?.DataObj?.id || smallerId,
      selectedModule: data?.DataObj?.Module?.ModuleName,
      ModuleID: data?.ModuleID,
      selectedTopic: data?.DataObj?.Topic?.TopicName,
      TopicID: data?.TopicID,
      selectedSubTopic: data?.DataObj?.SubTopic?.SubTopicName,
      SubTopicID: data?.SubTopicID,
      easy: data?.easy || "",
      medium: data?.medium || "",
      hard: data?.hard || "",
    };
  }

  return result;
}

// Returns Total from reducing all combonations.
function getTotal(data) {
  const combinationArr = Object.values(data.combination);

  let easyTotal = combinationArr.reduce((acc, ele) => {
    let value = Number(ele.easy) + acc;
    if (data.id) {
      value -= Number(data.easy);
    }
    return value;
  }, 0);
  let mediumTotal = combinationArr.reduce((acc, ele) => {
    let value = Number(ele.medium) + acc;
    if (data.id) {
      value -= Number(data.medium);
    }
    return value;
  }, 0);
  let hardTotal = combinationArr.reduce((acc, ele) => {
    let value = Number(ele.hard) + acc;
    if (data.id) {
      value -= Number(data.hard);
    }
    return value;
  }, 0);

  // total - current element
  if (
    data.element &&
    (data.element.easy || data.element.medium || data.element.hard)
  ) {
    easyTotal -= Number(data.element.easy);
    mediumTotal -= Number(data.element.medium);
    hardTotal -= Number(data.element.hard);
  }

  if (
    data.DataObj &&
    (data.DataObj.easy || data.DataObj.medium || data.DataObj.hard)
  ) {
    easyTotal -= Number(data?.DataObj?.easy);
    mediumTotal -= Number(data?.DataObj?.medium);
    hardTotal -= Number(data?.DataObj?.hard);
  }

  return { easyTotal, mediumTotal, hardTotal };
}

function QuestionViewEditModal({ data, handler, setter }) {
  // max total values
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const TestID = queryParams.get("TestID") || 0;
  const TestDetailsID = queryParams.get("TestDetailsID") || 0;
  const technologyId = queryParams.get("TechnologyID") || 0;
  const technologyName = queryParams.get("TechnologyName") || 0;
  const queryEasy = queryParams.get("easy") || "";
  const queryMedium = queryParams.get("medium") || "";
  const queryHard = queryParams.get("hard") || "";
  const QuestionTypeID = queryParams.get("QuestionTypeID");

  const easyRef = useRef();
  const mediumRef = useRef();
  const hardRef = useRef();
  const _id = useId();
  const [isValid, setIsValid] = useState(true);
  const [warn, setWarn] = useState(false);

  const getDisabledInputStyles = (n) => {
    if (Number(n) === 0) {
      return "bg-gray-200 text-gray-700 border rounded-md w-14 px-2 py-1 ml-2 text-center";
    }
    return "border rounded-md w-14 px-2 py-1 ml-2 text-center";
  };

  let { easyTotal, mediumTotal, hardTotal } = getTotal(data);

  const [maxCount, setMaxCount] = useState({
    easyCount: "",
    mediumCount: "",
    hardCount: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // from table
  let availableEasyTotal = queryEasy - easyTotal;
  if (data.id) availableEasyTotal += Number(data.easy);
  let availableMediumTotal = queryMedium - mediumTotal;
  if (data.id) availableMediumTotal += Number(data.medium);
  let availableHardTotal = queryHard - hardTotal;
  if (data.id) availableHardTotal += Number(data.hard);

  let result = getResult(data, _id, data.id);

  // Easy Cal
  const [correctEasy, setCorrectEasy] = useState(0);
  useEffect(() => {
    let maxEasyCount = maxCount?.easyCount || 0;
    const availableEasyTotal =
      Number(easyTotal) === 0 ? 0 : queryEasy - easyTotal;
    if (Number(maxEasyCount) === 0) setCorrectEasy(0);
    else {
      setCorrectEasy(
        maxEasyCount >= availableEasyTotal
          ? queryEasy - easyTotal >= maxEasyCount
            ? maxEasyCount
            : queryEasy - easyTotal
          : maxEasyCount
      );
    }
  }, [maxCount, easyTotal, queryEasy]);

  // Medium Cal
  const [correctMedium, setCorrectMedium] = useState(0);
  useEffect(() => {
    const maxMediumCount = maxCount?.mediumCount || 0;
    const availableMediumTotal =
      Number(mediumTotal) === 0 ? 0 : queryMedium - mediumTotal;
    if (Number(maxMediumCount) === 0) {
      setCorrectMedium(0);
    } else {
      setCorrectMedium(
        maxMediumCount >= availableMediumTotal
          ? queryMedium - mediumTotal >= maxMediumCount
            ? maxMediumCount
            : queryMedium - mediumTotal
          : maxMediumCount
      );
    }
  }, [maxCount, mediumTotal, queryMedium]);

  // Hard Cal
  const [correctHard, setCurrentHard] = useState(0);
  useEffect(() => {
    const maxHardCount = maxCount?.hardCount || 0;
    const availableHardTotal =
      Number(hardTotal) === 0 ? 0 : queryHard - hardTotal;
    if (Number(maxHardCount) === 0) {
      setCurrentHard(0);
    } else {
      setCurrentHard(
        maxHardCount >= availableHardTotal
          ? queryHard - hardTotal >= maxHardCount
            ? maxHardCount
            : queryHard - hardTotal
          : maxHardCount
      );
    }
  }, [maxCount, hardTotal, queryHard]);

  useEffect(() => {
    const fetchMaxCount = async () => {
      let ModuleId = data?.ModuleID;
      ModuleId =
        Number(ModuleId) === 0 || Number(ModuleId) === -1 ? null : ModuleId;

      let TopicId = data?.TopicID;
      TopicId =
        Number(TopicId) === 0 || Number(TopicId) === -1 ? null : TopicId;

      let SubTopicId = data?.SubTopicID;
      SubTopicId =
        Number(SubTopicId) === 0 || Number(SubTopicId) === -1
          ? null
          : SubTopicId;

      const reqData = {
        TechnologyId: technologyId,
        ModuleId,
        TopicId,
        SubTopicId,
        type: QuestionTypeID === "1" ? "MCQ" : "code",
      };
      try {
        const res = await api.post("/FetchAvailableQuestionsByCount", reqData);

        setMaxCount({
          easyCount: res?.data?.dbresult[0]?.EasyCount || "",
          mediumCount: res?.data?.dbresult[0]?.MediumCount || "",
          hardCount: res?.data?.dbresult[0]?.HardCount || "",
        });
      } catch (error) {}
    };

    fetchMaxCount();
  }, [data?.ModuleID, data?.SubTopicID, data?.TopicID, technologyId]);

  async function submiteHandler() {
    let go = 0;
    // if we are creating new Combination
    if (isSubmitting) return;
    if (
      Number(easyRef.current.value) > 0 ||
      Number(mediumRef.current.value) > 0 ||
      Number(hardRef.current.value) > 0
    ) {
      if (
        Number(easyRef.current.value) <= correctEasy &&
        Number(mediumRef.current.value) <= correctMedium &&
        Number(hardRef.current.value) <= correctHard
      ) {
        if (easyTotal + Number(easyRef.current.value) <= queryEasy)
          // if every thing is okey.
          go++;
        if (mediumTotal + Number(mediumRef.current.value) <= queryMedium) go++;
        if (hardTotal + Number(hardRef.current.value) <= queryHard) go++;
        if (go > 2) {
          result.easy = Number(easyRef.current.value);
          result.medium = Number(mediumRef.current.value);
          result.hard = Number(hardRef.current.value);
          setIsSubmitting(true);

          const res = await api.post("/InsertionQuestionView", {
            TechnologyId: technologyId || 0,
            TechnologyName: technologyName || 0,
            ModuleName: data?.DataObj?.Module?.ModuleName || 0,
            ModuleId: data?.ModuleID || null,
            TopicName: data?.DataObj?.Topic?.TopicName || null,
            TopicId: data?.TopicID || null,
            SubtopicName: data?.DataObj?.SubTopic?.SubTopicName || null,
            SubtopicId: data?.SubTopicID || null,
            MediumCount: mediumRef?.current?.value || null,
            HardCount: hardRef?.current?.value || null,
            EasyCount: easyRef?.current?.value || null,
            TestId: TestID || 0,
            TestDetailsId: TestDetailsID || 0,
            type: QuestionTypeID === "1" ? "MCQ" : "code",
          });

          // Post Combinations to Custome table

          let updatedCombination = (prev) => {
            const obj = { ...prev };
            if (data.id) {
              const id = data.id;

              if (obj[id]) {
                obj[id].easy =
                  Number(result.easy) === NaN ? 0 : Number(result.easy);
                obj[id].medium =
                  Number(result.medium) === NaN ? 0 : Number(result.medium);
                obj[id].hard =
                  Number(result.hard) === NaN ? 0 : Number(result.hard);
              }
            } else {
              obj[result.id] = result;
            }
            return obj;
          };

          const postCombinations = async () => {
            const res = await api.post("/Insert_Update_QuestionCombination", {
              TestId: TestID,
              TestDetailsId: TestDetailsID,
              Combinations: JSON.stringify(
                updatedCombination(data.combination)
              ),
              type: QuestionTypeID === "1" ? "MCQ" : "code",
            });
            return res;
          };

          let insertRes;

          insertRes = postCombinations();

          handler(result, "edit", data.id, data.flag);
          setter(false);
          setIsValid(true);
        }
      }
    }
    /* if (
      easyTotal < Number(easyRef?.current?.value) ||
      mediumTotal < Number(mediumRef?.current?.value) ||
      hardTotal < Number(hardRef?.current?.value)
    ) {
      setWarn(true);
    } */

    if (!(go > 2)) {
      setIsValid(false);
      setWarn(
        ((hardRef.current?.value === "" || hardRef.current?.value === "0") &&
          (mediumRef.current?.value === "" ||
            mediumRef.current?.value === "0") &&
          easyRef.current?.value === "") ||
          easyRef.current?.value === "0"
          ? "Must Add Atleast One Question"
          : "Try Entering Smaller Values!"
      );
    } else {
      setIsValid(true);
    }
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="z-20"
    >
      <section className="bg-white p-10 rounded-md shadow-md">
        <div className="flex justify-between">
          <span className="text-2xl font-bold mb-4">Qusetion View</span>
          <span
            className="cursor-pointer text-[1.8rem] -mt-[4px] font-bold text-pretty"
            onClick={() => setter(false)}
          >
            &times;
          </span>
        </div>

        <div className="grid grid-cols-2">
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Module Name</h2>
              <p className="text-gray-600">
                {result.selectedModule || "None Selected"}
              </p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Topic Name</h2>
              <p className="text-gray-600">
                {result.selectedTopic || "None Selected"}
              </p>
            </div>
            <div className="mb-4 overflow-hidden">
              <h2 className="text-lg font-semibold">SubTopic Name</h2>
              <p className="text-gray-600">
                {result.selectedSubTopic || "None Selected"}
              </p>
            </div>
          </div>

          <div>
            <div className="mt-3">
              <table>
                <thead>
                  <tr className="border-b-[2px] border-dashed border-[#00000070]">
                    <th className="border-e-[2px] border-[#00000070]"></th>
                    <th className="px-1  border-e-[.1rem] border-dashed border-[#00000020]">
                      Requested
                    </th>
                    <th className="px-1">Available Count</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b-[.1rem] border-dashed  border-[#00000020]">
                    <th className="text-start border-e-[2px] border-[#00000070]">
                      easy
                    </th>
                    <td className="text-end pe-3 border-e-[.1rem] border-dashed border-[#00000020]">
                      {availableEasyTotal || 0}
                    </td>
                    <td className="text-end pe-3">{maxCount.easyCount || 0}</td>
                  </tr>
                  <tr className="border-b-[.1rem] border-dashed  border-[#00000020]">
                    <th className="text-start border-e-[2px] border-[#00000070]">
                      medium
                    </th>
                    <td className="text-end pe-3 border-e-[.1rem] border-dashed border-[#00000020]">
                      {availableMediumTotal || 0}
                    </td>
                    <td className="text-end pe-3">
                      {maxCount.mediumCount || 0}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-start border-e-[2px] border-[#00000070]">
                      hard
                    </th>
                    <td className="text-end pe-3 border-e-[.1rem] border-dashed border-[#00000020]">
                      {availableHardTotal || 0}
                    </td>
                    <td className="text-end pe-3">{maxCount.hardCount || 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex content-center">
            <label className="flex items-center" htmlFor="topiceasy">
              Easy:
              <input
                ref={easyRef}
                id="topiceasy"
                type="number"
                disabled={(Number(correctEasy) || 0) === 0}
                className={getDisabledInputStyles(correctEasy)}
                defaultValue={result.easy}
              />
            </label>
            <p className="grid grid-flow-col place-content-center">
              <span className="font-bold mx-2">/</span>
              <span className="text-base text-yellow-600 content-ceter">
                {correctEasy}
              </span>
            </p>
          </div>
          <div className="flex content-center">
            <label className="flex items-center" htmlFor="topicmedium">
              Medium:
              <input
                ref={mediumRef}
                id="topicmedium"
                type="number"
                disabled={(Number(correctMedium) || 0) === 0}
                className={getDisabledInputStyles(correctMedium || 0)}
                defaultValue={result.medium}
              />
            </label>
            <p className="grid grid-flow-col place-content-center">
              <span className="font-bold mx-2">/</span>
              <span className="text-base text-yellow-600 content-ceter">
                {correctMedium}
              </span>
            </p>
          </div>
          <div className="flex content-center">
            <label className="flex items-center" htmlFor="topichard">
              Hard:
              <input
                ref={hardRef}
                id="topichard"
                type="number"
                disabled={(Number(correctHard) || 0) === 0}
                className={getDisabledInputStyles(correctHard || 0)}
                defaultValue={result.hard}
              />
            </label>
            <p className="grid grid-flow-col place-content-center">
              <span className="font-bold mx-2">/</span>
              <span className="text-base text-yellow-600 content-ceter">
                {correctHard}
              </span>
            </p>
          </div>
        </div>
        <div className="grid place-content-center mt-2">
          {!isValid && (
            <p className="text-red-800 font-semibold absloute">{warn}</p>
          )}

          <button
            onClick={submiteHandler}
            className={`text-white font-semibold inline-block px-14 py-2 mx-auto mt-3 bg-green-300 hover:bg-green-400`}
          >
            {isSubmitting ? "Loading..." : "Submit"}
          </button>
        </div>
      </section>
    </div>
  );
}

export default QuestionViewEditModal;

/**
 * hardRef.current?.value !== "" ||
            hardRef.current?.value !== "0" ||
            mediumRef.current?.value !== "" ||
            mediumRef.current?.value !== "0" ||
            easyRef.current?.value !== "" ||
            easyRef.current?.value !== "0"
 */
