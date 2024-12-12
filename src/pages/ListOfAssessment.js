import DataHandler from "../util/fetchHandler";
import { NavLink, useLoaderData, useNavigate } from "react-router-dom";
import { getAllAssessments } from "../util/http";
import AssessmentTable from "../components/AssessmentTable";

import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { LocalStorage } from "../services/LocalStorage";
import AuthCtx from "../context/auth.context";
import { Button } from "@mui/material";
import { connect, useSelector } from "react-redux";
import { types } from "../store/root.actions";
import { BarLoader } from "react-spinners";
import LoadingScreen from "../ui/LoadingScreen";
import ErrorScreen from "../ui/ErrorScreen";
import api from "../services/api";

/**
 * Component for displaying a list of assessments created by other users.
 * @returns {JSX.Element} The ListOfAssessment component.
 */
function ListOfAssessmentComponent({
  assessmentList,
  isLoading,
  isError,
  getListOfAssessments,
}) {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthCtx);
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    getListOfAssessments();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) navigate("/login?page=categories/assessmentlist");
  }, [isLoggedIn, navigate]);

  const [titleData, setTitleData] = useState([]);
  const { data } = useQuery({
    queryKey: ["listofAssessment"],
    queryFn: getAllAssessments,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  useEffect(() => {
    setTitleData(data);
  }, [data]);

  // Get table titles from DataHandler
  const titles = DataHandler.getTitles();

  useEffect(() => {
    setAssessments(assessmentList || []);
  }, [assessmentList]);

  function createNewHandler(e) {
    LocalStorage.clear();

    navigate("/categories/technology");
  }

  async function handler(data) {
    try {
      const res = await api.post("/getBasicTestInfo", {
        data: { TestID: data.TestID },
      });

      navigate(
        `/categories/technology?edit=true&TestID=${res.data.data[0]?.TestID}&randomId=${res.data.data[0]?.RandomID}&natureId=${res.data.data[0]?.NatureID}&technologyId=${res.data.data[0]?.TechnologyID}`
      );

      if (res) setTitleData({ assessments: res.data });
    } catch (err) {}
  }

  useEffect(() => {
    setTitleData(assessments);
  }, [titleData, assessments]);

  return (
    <div style={{ padding: "10px" }}>
      {isLoading && <LoadingScreen />}
      {isError && <ErrorScreen />}
      {assessmentList && (
        <AnimatePresence>
          <motion.main
            initial={{ x: "100%" }}
            animate={{ x: 0, transition: { duration: 0.3 } }}
            exit={{ x: "-100%", transition: { duration: 0.3 } }}
            className="container min-h-[70vh] min-w-[80vw] py-[20px] mx-auto my-[20px]"
          >
            <section className="flex align-middle">
              {/* Hidden heading for accessibility and SEO */}
              <h1 className="absolute left-[-9999px]">Assessments</h1>

              {/* NavLink for creating a new assessment */}
              <div className="flex flex-col mx-auto">
                <NavLink
                  className="w-[8rem]"
                  to="/categories/technology"
                  onClick={createNewHandler}
                >
                  <Button variant="contained">Create New</Button>
                </NavLink>
                {/* Render the AssessmentTable component */}

                <div className="max-h-[600px] overflow-y-auto w-auto border-collapse border border-gray-300 mt-8">
                  <AssessmentTable
                    titles={titles}
                    assessments={assessments}
                    handler={handler}
                  />
                </div>
              </div>
            </section>
          </motion.main>
        </AnimatePresence>
      )}
    </div>
  );
}

const mapStateToComponent = (state) => ({
  assessmentList: state.assessmentListReducer.data,
  isLoading: state.assessmentListReducer.isLoading,
  isError: state.assessmentListReducer.isError,
});

const mapDispatchToComponent = {
  getListOfAssessments: () => ({ type: types.ASSESSMENT_LIST }),
};

const ListOfAssessment = connect(
  mapStateToComponent,
  mapDispatchToComponent
)(ListOfAssessmentComponent);

export default ListOfAssessment;

/**
 * Loader function to fetch all assessments.
 * @returns {Promise} A promise that resolves to the fetched assessment data.
 */
export async function loader() {
  // Fetch assessments with specific stale time and garbage collection time
  const result = await getAllAssessments();

  return result;
}
