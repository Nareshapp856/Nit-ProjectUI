import React from "react";
import CloseIcon from "@mui/icons-material/Close";

function ProgramViewModal({ data: questionData, setter: setQuestionData }) {
  const {
    ProgramId,
    ProgramName,
    ProgramDescription,
    Constraints,
    SampleInput,
    SampleOutput,
    Explanation,
  } = questionData;

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
          <h1 className="text-2xl inline-block">ProgramId: {ProgramId}</h1>
        </div>
        <article>
          <h2 className=" text-lg font-semibold mb-2 ">Program:</h2>
          <pre className="mb-4 pl-3">{ProgramName}</pre>
        </article>

        <article className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Description:</h2>
          <pre className="mb-4 pl-3">{ProgramDescription}</pre>
        </article>

        <article className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Constraints:</h2>
          <pre className="mb-4 pl-3">{Constraints}</pre>
        </article>

        <article className="mt-8">
          <h2 className="text-lg font-semibold mb-2">SampleInput:</h2>
          <pre className="mb-4 pl-3">{SampleInput}</pre>
        </article>

        <article className="mt-8">
          <h2 className="text-lg font-semibold mb-2">SampleOutput:</h2>
          <pre className="mb-4 pl-3">{SampleOutput}</pre>
        </article>

        <article className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Explanation:</h2>
          <p className="mb-4 pl-3">{Explanation}</p>
        </article>
      </section>
    </div>
  );
}

export default ProgramViewModal;
