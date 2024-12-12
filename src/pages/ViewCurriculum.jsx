import React from "react";
import CurriculumTable from "../components/CourseCurriculumTable";

function ViewCurriculum() {
  return (
    <div className="" style={{ padding: "10px" }}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold text-gray-700">
          Course Curriculum
        </h1>
      </div>
      <hr className="mb-6 border-gray-300" />

      <div>
        <CurriculumTable />
      </div>
    </div>
  );
}

export default ViewCurriculum;
