import QuestionViewFixedModal from "../QuestionViewFixedModal";

function QuestionViewModalView({ data, handler, setter, currentCombination }) {
  return (
    <div className="">
      <QuestionViewFixedModal
        data={data}
        handler={handler}
        setter={setter}
        currentCombination={currentCombination}
      />
    </div>
  );
}

export default QuestionViewModalView;
