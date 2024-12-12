import { Form } from "react-router-dom";
import { useEffect, useState } from "react";
import { redirect, useLocation } from "react-router";

import SelectedTechnologyV2 from "../components/technology/SelectedTechnology";
import NatureOfAssessmentV2 from "../components/technology/NatureOfAssessment";

import api from "../services/api";
import RandomV2 from "../components/technology/Random";
import { AnimatePresence, motion } from "framer-motion";
import AssessmentV2 from "../components/technology/Assessment";
import TechnologyNext from "../components/technology/TechnologyNext";

export function TechnologyV2() {
  /**
   *
   * Default Data
   */
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const randomId = queryParams.get("randomId");
  const natureId = queryParams.get("natureId");
  const technologyId = queryParams.get("technologyId");

  const [isFormValid, setIsFormValid] = useState();

  const [technologyID, setTechnologyID] = useState(
    technologyId === "null" ? -1 : technologyId || -1
  );
  const [assessmentID, setAssessmentID] = useState(1);
  const [natureID, setNatureID] = useState(
    natureId === "null" ? 1 : natureId || 1
  );
  const [randomID, setRandomID] = useState(
    randomId === "null" ? 1 : randomId || 1
  );

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    // set Error message to be desplayed
    if (!technologyID) {
      setErrMsg(errMsg);
    } else {
      setErrMsg("");
    }

    // must be true to enable next button
    setIsFormValid(
      technologyID &&
        assessmentID &&
        natureID &&
        randomID &&
        technologyID !== -1 &&
        technologyID !== "-1"
    );
  }, [technologyID, natureID, randomID, assessmentID, errMsg, setIsFormValid]);

  return (
    <AnimatePresence>
      <motion.main
        initial={{ x: "100%" }}
        animate={{ x: 0, transition: { duration: 0.3 } }}
        exit={{ x: "-100%", transition: { duration: 0.3 } }}
      >
        <Form method="POST" className="m-5">
          {/**  Technology */}
          <SelectedTechnologyV2
            technologyID={technologyID}
            setTechnologyID={setTechnologyID}
          />

          {/* Assessment radio */}
          <AssessmentV2
            assessmentID={assessmentID}
            setAssessmentID={setAssessmentID}
          />

          {/** Nature of Assessment   */}
          <NatureOfAssessmentV2 natureID={natureID} setNatureID={setNatureID} />

          {/**  Random */}
          <RandomV2 randomID={randomID} setRandomID={setRandomID} />

          {/**  Submit */}
          <TechnologyNext isFormValid={isFormValid} errMsg={errMsg} />
        </Form>
      </motion.main>
    </AnimatePresence>
  );
}

export async function TechnologyActionV2({ request, params }) {
  const url = new URL(request.url);

  const queryTestID =
    url.searchParams.get("TestID") === undefined ||
    url.searchParams.get("TestID") === "undefined"
      ? 0
      : url.searchParams.get("TestID");

  const formData = await request.formData();

  let TestID = queryTestID || params.TestID || 0;

  let AssessmentID = formData.get("AssessmentID") || "1";
  let TechnologyName = formData.get("TechnologyName") || "0";
  let TechnologyID = formData.get("TechnologyID") || "1";
  let NatureID = formData.get("NatureID") || "1";
  let RandomID = formData.get("RandomID") || "1";
  let QuestionTypeID = formData.get("QuestionTypeID") || "1";

  let res = await api.post("/createEditTest", {
    data: {
      TestID,
      AssessmentID,
      TechnologyID,
      NatureID,
      RandomID,
      CreatedBy: "Admin",
      ModifiedBy: "Admin",
    },
  });

  TestID = res.data.data[0]?.TestID;

  // Get Data to make add Default values
  res = await api.post("/getBasicTestDetailsInfo", {
    data: { TestID: TestID },
  });

  let TestDetailsID = res.data.data[0]?.TestDetailsID || 0;
  let NumOfEasy = res.data.data[0]?.NumOfEasy;
  let NumOfMedium = res.data.data[0]?.NumOfMedium;
  let NumOfHard = res.data.data[0]?.NumOfHard;
  let TestCaseID = res.data.data[0]?.TestCaseID;
  QuestionTypeID = res.data.data[0]?.QuestionTypeID || "1";

  let redirectVar = "/categories/assessments";

  redirectVar = `/categories/assessments?edit=true&TestID=${TestID}&TestDetailsID=${TestDetailsID}&TechnologyName=${TechnologyName}&TechnologyID=${TechnologyID}&NatureID=${NatureID}&NumOfEasy=${NumOfEasy}&NumOfMedium=${NumOfMedium}&NumOfHard=${NumOfHard}&QuestionTypeID=${QuestionTypeID}&TestCaseID=${TestCaseID}`;

  return redirect(redirectVar);
}
