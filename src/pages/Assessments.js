import React, { useEffect, useRef, useState } from "react";
import { Form, redirect, useLoaderData, useLocation } from "react-router-dom";
import { LocalStorage } from "../services/LocalStorage";
import QuestionTypesV2 from "../components/assessments/QuestionTypes";
import AssessmentsNext from "../components/assessments/AssessmentsNext";
import { AnimatePresence, motion } from "framer-motion";
import api from "../services/api";

export function AssessmentsV2() {
  /**
   *
   * Default Data
   */
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const TestID = queryParams.get("TestID") || 0;
  const TechnologyName = queryParams.get("TechnologyName");
  const TechnologyID = queryParams.get("TechnologyID") || "0";
  const NumOfEasy =
    queryParams.get("NumOfEasy") === "undefined"
      ? 0
      : queryParams.get("NumOfEasy");
  const NumOfMedium =
    queryParams.get("NumOfMedium") === "undefined"
      ? 0
      : queryParams.get("NumOfMedium");
  const NumOfHard =
    queryParams.get("NumOfHard") === "undefined"
      ? 0
      : queryParams.get("NumOfHard");
  const _QuestionTypeID =
    queryParams.get("QuestionTypeID") === "undefined"
      ? "1"
      : queryParams.get("QuestionTypeID");
  const q_testcases = queryParams.get("TestCaseID") === "1" ? 1 : 0;
  const NatureID = queryParams.get("NatureID");
  const [queryTotal, setQueryTotal] = useState(
    Number(NumOfEasy) + Number(NumOfMedium) + Number(NumOfHard)
  );

  // LoaderData
  const { easyCount, mediumCount, hardCount } = useLoaderData();
  const [maxEasyCount, setMaxEasyCount] = useState(easyCount);
  const [maxMediumCount, setMaxMediumCount] = useState(mediumCount);
  const [maxHardCount, setMaxHardCount] = useState(hardCount);
  const [TestCaseID, setTestCaseID] = useState(q_testcases);

  const shouldChangeStorage = useRef({ current: true });

  const [warn, setWarn] = useState(false);
  const [QuestionTypeID, setQuestionTypeID] = useState(_QuestionTypeID);

  const fetchMaxValues = async () => {
    try {
      const res = await api.post("FetchAvailableQuestionsByCount", {
        TechnologyId: TechnologyID,
        TestId: TestID,
        type: QuestionTypeID === "1" ? "MCQ" : "code",
      });

      setMaxEasyCount(res?.data?.dbresult?.[0]?.EasyCount || 0);
      setMaxMediumCount(res?.data?.dbresult?.[0]?.MediumCount || 0);
      setMaxHardCount(res?.data?.dbresult?.[0]?.HardCount || 0);
    } catch (error) {}
  };

  useEffect(() => {
    fetchMaxValues();
  }, [QuestionTypeID]);

  const [assessment, setAssessment] = useState();
  const [difficultyLevel, setDifficlutyLevel] = useState();
  const [currentTotal, setCurrentTotal] = useState(
    Number(NumOfEasy) + Number(NumOfMedium) + Number(NumOfHard)
  );
  console.log(QuestionTypeID);
  useEffect(() => {
    const fetchCounts = async () => {
      const res = await api.post("/getBasicTestDetailsInfo", {
        data: { TestID: TestID, type: QuestionTypeID === "1" ? "MCQ" : "code" },
      });
      console.log(res.data?.data[0]?.QuestionTypeID);
      if (res.data?.data[0]?.QuestionTypeID)
        setQuestionTypeID(String(res.data?.data[0]?.QuestionTypeID));
      let NumOfEasy = res.data.data[0]?.NumOfEasy || 0;
      let NumOfMedium = res.data.data[0]?.NumOfMedium || 0;
      let NumOfHard = res.data.data[0]?.NumOfHard || 0;
      setTestCaseID(res.data.data[0]?.TestCaseID || q_testcases);

      setQueryTotal(
        Number(NumOfEasy) + Number(NumOfMedium) + Number(NumOfHard)
      );

      setDifficlutyLevel({
        MCQ: {
          Easy: NumOfEasy,
          Medium: NumOfMedium,
          Hard: NumOfHard,
        },
      });

      setCurrentTotal(
        Number(NumOfEasy) + Number(NumOfMedium) + Number(NumOfHard)
      );
    };

    fetchCounts();
  }, [TestID]);

  useEffect(() => {
    if (shouldChangeStorage?.current?.value || !LocalStorage?.assessmentPage) {
      if (difficultyLevel) {
        LocalStorage.assessmentPage = {
          ...difficultyLevel,
        };

        shouldChangeStorage.current.value = false;
      }
    }
  }, [difficultyLevel]);

  useEffect(() => {
    if (difficultyLevel) {
      LocalStorage.assessmentPage = {
        ...difficultyLevel,
      };
    }
  }, [difficultyLevel]);

  useEffect(() => {
    const res = {
      MCQ: {
        Easy: NumOfEasy || 0,
        Medium: NumOfMedium || 0,
        Hard: NumOfHard || 0,
      },
    };

    const keys = Object.keys(res);
    const difficultyLevels = res;

    setAssessment(keys);
    setDifficlutyLevel(difficultyLevels);
  }, [NumOfEasy, NumOfMedium, NumOfHard]);

  const handler = (questionType, level, handler) => {
    setDifficlutyLevel((prev) => {
      const newObj = { ...prev };
      newObj[questionType][level] = handler;

      return newObj;
    });
  };

  return (
    <AnimatePresence>
      <motion.main
        initial={{ x: "100%" }}
        animate={{ x: 0, transition: { duration: 0.3 } }}
        exit={{ x: "-100%", transition: { duration: 0.3 } }}
      >
        <div className="bg-gray-50 min-h-[70vh] p-2">
          <Form method="POST" className="ps-3">
            <p className="p-5">Selected Technology: {TechnologyName}</p>
            {/**  Question type */}
            <QuestionTypesV2
              NatureID={NatureID}
              QuestionTypeID={QuestionTypeID}
              TestCaseID={TestCaseID}
              setQuestionTypeID={setQuestionTypeID}
              handler={handler}
              assessment={assessment}
              easyCount={maxEasyCount}
              mediumCount={maxMediumCount}
              hardCount={maxHardCount}
              queryTotal={queryTotal}
              currentTotal={currentTotal}
              setCurrentTotal={setCurrentTotal}
              difficultyLevels={difficultyLevel}
              warn={warn}
              setWarn={setWarn}
            />

            <AssessmentsNext
              maxEasyCount={maxEasyCount}
              maxMediumCount={maxMediumCount}
              maxHardCount={maxHardCount}
              assessment={assessment}
              warn={warn}
              setWarn={setWarn}
              difficultyLevel={difficultyLevel}
            />
          </Form>
        </div>
      </motion.main>
    </AnimatePresence>
  );
}

export async function AssessmentActionV2({ request }) {
  const formData = await request.formData();

  const url = new URL(request.url);

  const TestID = url.searchParams.get("TestID") || 0;
  let TestDetailsID = url.searchParams.get("TestDetailsID") || 0;
  const TechnologyID = url.searchParams.get("TechnologyID") || 0;
  const TechnologyName = url.searchParams.get("TechnologyName") || 0;

  const QuestionTypeID = formData.get("QuestionTypeID") || 1;
  const TestCaseID =
    formData.get("TestCaseID") === "undefined" ? 0 : formData.get("TestCaseID");
  const NumOfEasy = formData.get("NumOfEasy") || 0;
  const NumOfMedium = formData.get("NumOfMedium") || 0;
  const NumOfHard = formData.get("NumOfHard") || 0;

  const CreatedBy = "Admin";
  const ModifiedBy = "Admin";

  let res;

  try {
    res = await api.post("/createTestAssessment", {
      data: {
        TestID,
        TestDetailsID,
        QuestionTypeID,
        TestCaseID,
        NumOfEasy,
        NumOfMedium,
        NumOfHard,
        CreatedBy,
        ModifiedBy,
        type: QuestionTypeID === "1" ? "MCQ" : "code",
      },
    });
  } catch (err) {}

  res = await api.post("/getBasicTestDetailsInfo", {
    data: { TestID },
  });

  TestDetailsID = res.data?.data[0]?.TestDetailsID;
  const EasyCount = res.data?.data[0]?.NumOfEasy || 0;
  const MediumCount = res.data?.data[0]?.NumOfMedium || 0;
  const HardCount = res.data?.data[0]?.NumOfHard || 0;

  const redirectVar = `/categories/questionview?edit=true&TestID=${TestID}&TechnologyName=${TechnologyName}&TestDetailsID=${TestDetailsID}&TechnologyID=${TechnologyID}&easy=${EasyCount}&medium=${MediumCount}&hard=${HardCount}&QuestionTypeID=${QuestionTypeID}`;

  return redirect(redirectVar);
}

export async function AssessmentLoaderV2({ request }) {
  const url = new URL(request.url);

  const TestID = url.searchParams.get("TestID") || 0;
  const TechnologyID = url.searchParams.get("TechnologyID") || 0;
  const QuestionTypeID = url.searchParams.get("QuestionTypeID");

  const res = await api.post("/FetchAvailableQuestionsByCount", {
    TestId: TestID,
    TechnologyId: TechnologyID,
    type: QuestionTypeID === "1" ? "MCQ" : "code",
  });

  return {
    easyCount: res?.data?.dbresult?.[0]?.EasyCount || 0,
    mediumCount: res?.data?.dbresult?.[0]?.MediumCount || 0,
    hardCount: res?.data?.dbresult?.[0]?.HardCount || 0,
  };
}
