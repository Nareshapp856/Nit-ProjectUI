import { useState, useEffect } from "react";
import QuestionModelHandler from "../QuestionModelHandler";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useLocation } from "react-router";
import api from "../../services/api";

function ShowIncludeModal({ data, setter, handler }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const TestID = queryParams.get("TestID");
  const QuestionTypeID = queryParams.get("QuestionTypeID");

  const [showModal, setShowModal] = useState(false);
  const [questions, setQuestions] = useState([]);

  const modalHandler = (data) => {
    setShowModal(false);
  };

  const fetchHandler = async () => {
    const res = await api.post("/SelectAllFixedQuestions", {
      TestId: TestID,
      type: QuestionTypeID === "1" ? "MCQ" : "code",
    });
    if (res?.data?.dbresult) {
      setQuestions(res.data.dbresult);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  return (
    <>
      {showModal && (
        <QuestionModelHandler
          question={showModal}
          setModalData={modalHandler}
        />
      )}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-lg p-6 w-[50rem] max-h-[30rem] overflow-y-auto">
          <div className="flex justify-end max-h-[30rem]">
            <CloseIcon
              fontSize="large"
              sx={{ rotate: "180deg" }}
              onClick={() => setter(false)}
              className="cursor-pointer"
            />
          </div>
          {questions.length > 0 ? (
            <ol className="">
              {questions.map((ele, index) => (
                <li
                  key={ele.QuestionID}
                  onClick={(e) => {
                    setShowModal(ele);
                    e.stopPropagation();
                  }}
                  className="text-lg py-2 border-b-2 border-gray-200 cursor-pointer"
                >
                  <span className="me-4">{index + 1 + "."}</span>
                  <span>{ele.Question || ele.ProgramName}</span>
                </li>
              ))}
            </ol>
          ) : (
            <div>
              <p>No Questions to show!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ShowIncludeModal;
