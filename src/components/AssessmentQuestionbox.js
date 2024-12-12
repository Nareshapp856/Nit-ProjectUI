import { useEffect, useState } from "react";
import AssessmentService, { MCQService } from "../services/assessmentsService";
import BuilderService from "../services/builder";

function AssessmentQuestionBox({
  title,
  easy: _e,
  medium: _m,
  hard: _h,
  setStale,
  children,
  selectTechnology,
}) {
  const [easy, setEasy] = useState(_e);
  const [medium, setMedium] = useState(_m);
  const [hard, setHard] = useState(_h);

  useEffect(() => {
    const difficulty = MCQService.getDifficulty();
    BuilderService.assessmentService = AssessmentService.insertOptions(title, {
      key: "difficulty",
      value: MCQService.updateDifficulty({
        ...difficulty,
        easy,
      }).getDifficulty(),
    });
    setStale((prev) => !prev);
  }, [setStale, title, easy]);

  useEffect(() => {
    const difficulty = MCQService.getDifficulty();
    AssessmentService.insertOptions(title, {
      key: "difficulty",
      value: MCQService.updateDifficulty({
        ...difficulty,
        medium,
      }).getDifficulty(),
    });
    setStale((prev) => !prev);
  }, [setStale, title, medium]);

  useEffect(() => {
    const difficulty = MCQService.getDifficulty();
    AssessmentService.insertOptions(title, {
      key: "difficulty",
      value: MCQService.updateDifficulty({
        ...difficulty,
        hard,
      }).getDifficulty(),
    });
    setStale((prev) => !prev);
  }, [setStale, title, hard]);

  return (
    <>
      {/* <article className="text-center m-5 border-[1.5px] rounded ">
        <div className="grid grid-flow-col grid-cols-2 ">
          <aside className="flex items-center">
            <h3 className="ps-3 font-medium text-md">Selected Technology:</h3>
            <p className="font-medium text-md ms-2">{selectTechnology}</p>
          </aside>

          <div className="inline-flex justify-end">
            <div className=" p-3 mx-[24px]">
              <h3>Total Easy</h3>
              <input
                type="number"
                className=" w-10 rounded"
                defaultValue={easy}
                onChange={(e) => setEasy(Number(e.target.value))}
              />
            </div>
            <div className=" p-3 mx-[24px]">
              <h3>Total Medium</h3>
              <input
                type="number"
                className=" w-10 rounded"
                defaultValue={medium}
                onChange={(e) => setMedium(Number(e.target.value))}
              />
            </div>
            <div className=" p-3 mx-[24px]">
              <h3>Total Hard</h3>
              <input
                type="number"
                className=" w-10 rounded"
                defaultValue={hard}
                onChange={(e) => setHard(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      </article> */}
      {children}
      {/* <article className="text-center m-5 border-[1.5px] rounded ">
        <div className="flex justify-end">
          <div className=" p-3">
            <h3>Remaining Easy</h3>
            <input
              type="number"
              className=" w-10 rounded"
              defaultValue={easy}
              onChange={(e) => setEasy(Number(e.target.value))}
            />
          </div>
          <div className=" p-3">
            <h3>Remaining Medium</h3>
            <input
              type="number"
              className=" w-10 rounded"
              defaultValue={medium}
              onChange={(e) => setMedium(Number(e.target.value))}
            />
          </div>
          <div className=" p-3">
            <h3>Remaining Hard</h3>
            <input
              type="number"
              className=" w-10 rounded"
              defaultValue={hard}
              onChange={(e) => setHard(Number(e.target.value))}
            />
          </div>
        </div>
      </article> */}
    </>
  );
}

export default AssessmentQuestionBox;

/**
 * import { useEffect, useState } from "react";
import AssessmentService, { MCQService } from "../services/assessmentsService";
import BuilderService from "../services/builder";

function AssessmentQuestionBox({
  title,
  easy: _e,
  medium: _m,
  hard: _h,
  setStale,
}) {
  const [easy, setEasy] = useState(_e);
  const [medium, setMedium] = useState(_m);
  const [hard, setHard] = useState(_h);

  useEffect(() => {
    const difficulty = MCQService.getDifficulty();
    BuilderService.assessmentService = AssessmentService.insertOptions(title, {
      key: "difficulty",
      value: MCQService.updateDifficulty({
        ...difficulty,
        easy,
      }).getDifficulty(),
    });
    setStale((prev) => !prev);
  }, [setStale, title, easy]);

  useEffect(() => {
    const difficulty = MCQService.getDifficulty();
    AssessmentService.insertOptions(title, {
      key: "difficulty",
      value: MCQService.updateDifficulty({
        ...difficulty,
        medium,
      }).getDifficulty(),
    });
    setStale((prev) => !prev);
  }, [setStale, title, medium]);

  useEffect(() => {
    const difficulty = MCQService.getDifficulty();
    AssessmentService.insertOptions(title, {
      key: "difficulty",
      value: MCQService.updateDifficulty({
        ...difficulty,
        hard,
      }).getDifficulty(),
    });
    setStale((prev) => !prev);
  }, [setStale, title, hard]);

  return (
    <article className="text-center max-w-[300px] m-5 border-[1.5px] rounded border-black">
      <h2>
        {title}
        <span>{easy + medium + hard}</span>
      </h2>
      <div className="flex">
        <div className=" p-3">
          <h3>Easy</h3>
          <input
            type="number"
            className=" w-6"
            defaultValue={easy}
            onChange={(e) => setEasy(Number(e.target.value))}
          />
        </div>
        <div className=" p-3">
          <h3>Medium</h3>
          <input
            type="number"
            className=" w-6 "
            defaultValue={medium}
            onChange={(e) => setMedium(Number(e.target.value))}
          />
        </div>
        <div className=" p-3">
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

export default AssessmentQuestionBox;

 */
