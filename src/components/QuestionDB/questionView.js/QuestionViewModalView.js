function QuestionViewModalView({ modalData }) {
  return (
    <div className="questionviewmodal hide-scroll">
      <section className="font-medium text-xl mb-8">
        <div className="flex justify-between border-b-2 border-gray-300 mb-4 relative">
          <h1 className="text-2xl inline-block">
            Question {modalData?.question?.QuestionID}
          </h1>

          <p className="absolute bottom-0 right-0 font-normal text-sm inline-block">
            Difficulty: {1}
          </p>
        </div>
        <article>
          <h2 className=" text-lg font-semibold mb-2 ">Question:</h2>
          <p className="mb-4 pl-3">{modalData?.question?.Question}</p>
        </article>

        <article className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Options:</h2>
          <ul className="pl-3 text-lg">
            <li className="">{modalData?.question?.OptionA}</li>
            <li className="">{modalData?.question?.OptionB}</li>
            <li className="">{modalData?.question?.OptionC}</li>
            <li className="">{modalData?.question?.OptionD}</li>
            <li className="">{modalData?.question?.OptionE}</li>
          </ul>
        </article>

        <article className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Answer:</h2>
          <p className="pl-3 text-lg">{modalData?.question?.CorrectAnswer}</p>
        </article>
      </section>
    </div>
  );
}

export default QuestionViewModalView;
