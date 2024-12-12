import React, { useState } from "react";

function QuestionViewTopic({
  title,
  easy: _e,
  medium: _m,
  hard: _h,
  selectedModule,
  selectedSubTopic,
  selectedTopic,
  selectTechnology,
}) {
  const [easy, setEasy] = useState(_e);
  const [medium, setMedium] = useState(_m);
  const [hard, setHard] = useState(_h);

  return (
    <article className="text-center max-w-full m-5 border-[1.5px] rounded border-black">
      <div className="flex justify-around p-5">
        <div>
          <h3>Module Name</h3>
          <p>{selectedModule.moduleName}</p>
        </div>
        <div>
          <h3>Topic Name</h3>
          <p>{selectedTopic.topicName}</p>
        </div>
        <div>
          <h3>Sub Topic Name</h3>
          <p>{selectedSubTopic.subTopicName}</p>
        </div>
        <div>
          <h3>Easy</h3>
          <input
            type="number"
            className=" w-6"
            defaultValue={easy}
            onChange={(e) => setEasy(Number(e.target.value))}
          />
        </div>
        <div>
          <h3>Medium</h3>
          <input
            type="number"
            className=" w-6 "
            defaultValue={medium}
            onChange={(e) => setMedium(Number(e.target.value))}
          />
        </div>
        <div>
          <h3>Hard</h3>
          <input
            type="number"
            className=" w-6"
            defaultValue={hard}
            onChange={(e) => setHard(Number(e.target.value))}
          />
        </div>
      </div>
    </article>
  );
}

export default QuestionViewTopic;
