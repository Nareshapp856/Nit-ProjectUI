import React, { useEffect } from "react";
import EnrollStudentNavigation from "../../ui/EnrollStudent/EnrollStudentNavigation";
import { Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import EnrollListRenderer from "../../components/enrollStudent/EnrollStudent/EnrollListRenderer";
import { useDispatch } from "react-redux";
import { resetEnrollStudentDetailsSlice } from "../../store/slice/enrollStudent.slice";

function EnrollStudent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onCreate = () => {
    navigate("/enroll-student/tests?edit=false&enrollId=0");
  };

  useEffect(() => {
    dispatch(resetEnrollStudentDetailsSlice());
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* <header className="bg-gray-100">
          <EnrollStudentNavigation />
        </header> */}

        <main className="flex-grow mt-8 mb-8">
          <section className="w-4/6 mx-auto mt-5">
            <Button variant="contained" onClick={onCreate}>
              Create New
            </Button>
          </section>
          <section className="mt-8">
            <EnrollListRenderer />
          </section>
        </main>

        {/* <footer className="bg-gray-100 p-6">
          <div className="max-w-full grid place-content-center overflow-hidden">
            <span className="">
              © 2023 Naresh i Technologies | Software Training - Online | All
              Rights Reserved.
            </span>
          </div>
        </footer> */}
      </div>
    </>
  );
}

export default EnrollStudent;
