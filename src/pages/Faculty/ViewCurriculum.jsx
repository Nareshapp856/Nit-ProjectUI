import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import ViewCurriculum from "../../components/Faculty/ViewCurriculum";
import { useState } from "react";

function ViewCourseCurriculum() {
  const [filter, setFilter] = useState("all");

  const onFilter = (_, newValue) => {
    setFilter(newValue);
  };

  return (
    <div style={{ padding: "10px" }}>
      <div className="flex justify-between items-end mb-4">
        <h1 className="text-3xl font-semibold">View Course Curriculum</h1>
      </div>
      <hr className="mb-6" />

      <div className="w-full space-y-4 flex flex-col items-end">
        <div className="mb-2">
          <ToggleButtonGroup
            color="primary"
            value={filter}
            onChange={onFilter}
            exclusive
          >
            <ToggleButton
              value="all"
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#2196f3", // Blue for 'All'
                  color: "#fff",
                },
              }}
            >
              All
            </ToggleButton>
            <ToggleButton
              value="pending"
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "rgba(250,204,21,.8)", // Green for 'pending'
                  color: "#fff",
                },
              }}
            >
              Pending
            </ToggleButton>
            <ToggleButton
              value="approved"
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#4caf50", // Green for 'Approved'
                  color: "#fff",
                },
              }}
            >
              Approved
            </ToggleButton>
            <ToggleButton
              value="rejected"
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#f44336", // Red for 'Rejected'
                  color: "#fff",
                },
              }}
            >
              Rejected
            </ToggleButton>
            <ToggleButton
              value="draft"
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#ff9800", // Orange for 'Draft'
                  color: "#fff",
                },
              }}
            >
              Draft
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
          <ViewCurriculum filter={filter} />
        </div>
      </div>
    </div>
  );
}

export default ViewCourseCurriculum;
