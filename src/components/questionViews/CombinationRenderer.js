import React, { useState } from "react";
import {
  TableBodyRenderer,
  TableHead,
} from "../questionView/AsssessmentQuestionBoxHandler";
import { useLocation } from "react-router";
import Modal from "../../ui/Modal";
import ShowIncludeModal from "../../ui/questionViews/ShowIncludeModal";

function getTableAttributeTitles(
  combination,
  queryEasy,
  queryMedium,
  queryHard
) {
  const combinationValues = Object.values(combination);

  let currentEasy = combinationValues.reduce(
    (acc, ele) => Number(ele.easy) + acc,
    0
  );
  let currentMedium = combinationValues.reduce(
    (acc, ele) => Number(ele.medium) + acc,
    0
  );
  let currentHard = combinationValues.reduce(
    (acc, ele) => Number(ele.hard) + acc,
    0
  );

  const TableAttributeTitles = [
    { title: "Module Name", id: "sds" },
    { title: "Topic Name", id: "wer" },
    { title: "Sub Topic Name", id: "wes" },
    { title: `Easy: ${currentEasy}/${queryEasy}`, id: "fgh" },
    { title: `Medium: ${currentMedium}/${queryMedium}`, id: "ntr" },
    { title: `Hard:  ${currentHard}/${queryHard}`, id: "zcd" },
  ];

  return TableAttributeTitles;
}

function CombinationRenderer({
  combination,
  setCombination,
  setViewModal,
  setEditModal,
  natureID,
}) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryEasy = queryParams.get("easy") || 0;
  const queryMedium = queryParams.get("medium") || 0;
  const queryHard = queryParams.get("hard") || 0;
  const QuestionTypeID = queryParams.get("QuestionTypeID");

  const [showIncludedModal, setShowIncludedModal] = useState(false);

  const showIncludedFn = () => {
    setShowIncludedModal((prev) => !prev);
  };

  return (
    <>
      {showIncludedModal && (
        <ShowIncludedModalHelper
          data={{}}
          showIncludedFn={showIncludedFn}
          handler={showIncludedModal}
        />
      )}
      <div className="p-5">
        <div className="flex justify-between">
          <div className="text-lg font-semibold mb-4">
            {natureID == 2 && (
              <p>
                Please select an{" "}
                <span className="bg-red-100">underlined value</span> to fetch
                questions:
              </p>
            )}
          </div>
          {(natureID === "2" || natureID === 2) && (
            <div>
              <button
                className="mr-[20px] mb-3 w-[15rem] px-6 max-h-8 min-h-8 bg-[gray] text-white font-semibold rounded-md shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:bg-gray-500 focus:ring-opacity-50"
                onClick={showIncludedFn}
              >
                Show Included Questions
              </button>
            </div>
          )}
        </div>
        <div className="">
          <table className="w-full overflow-clip">
            <thead>
              <TableHead
                titles={getTableAttributeTitles(
                  combination,
                  queryEasy,
                  queryMedium,
                  queryHard
                )}
              />
            </thead>
            <tbody>
              {combination &&
                Object.values(combination).map((element) => (
                  <TableBodyRenderer
                    natureID={natureID}
                    combination={combination}
                    setCombination={setCombination}
                    setViewModal={setViewModal}
                    setEditModal={setEditModal}
                    key={element.id}
                    element={element}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CombinationRenderer;

function ShowIncludedModalHelper({ data, showIncludedFn, handler }) {
  return (
    <Modal
      data={data}
      setter={showIncludedFn}
      ModalParam={ShowIncludeModal}
      handler={handler}
    />
  );
}
