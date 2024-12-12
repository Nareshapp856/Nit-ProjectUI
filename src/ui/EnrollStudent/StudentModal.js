import { Checkbox, FormControlLabel, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const onUserCheck = (e, studentId, excludedArr, setExcludedArr) => {
  if (e.target.checked) {
    if (excludedArr.includes(studentId)) {
      const index = excludedArr.indexOf(studentId);
      if (index !== -1) {
        const updatedExcludedArr = [...excludedArr];
        updatedExcludedArr.splice(index, 1);
        setExcludedArr(updatedExcludedArr);
      }
    }
  } else {
    if (!e.target.checked) {
      setExcludedArr((prev) => {
        const updatedExcludedArr = [...prev];
        updatedExcludedArr.push(studentId);
        return updatedExcludedArr;
      });
    }
  }
};

function StudentModal({ data, setter, handler }) {
  const [excludedArr, setExceludedArr] = useState([]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Student List</h1>
        <CloseIcon className="cursor-pointer" onClick={() => setter(false)} />
      </div>
      <table className="pl-6 max-h-80 overflow-y-auto border rounded-lg p-2">
        <thead className="bg-gray-100">
          <tr className="border-b border-gray-300">
            <th className="px-1 py-2 whitespace-nowrap">First Name</th>
            <th className="px-1 py-2 whitespace-nowrap">Last Name</th>
            <th className="px-1 py-2 whitespace-nowrap">Email Name</th>
            <th className="px-1 py-2 whitespace-nowrap">Phone number</th>
            <th className="px-1 py-2 whitespace-nowrap">Admission Date</th>
          </tr>
        </thead>
        <tbody>
          {data.modalData.map((student) => (
            <tr key={student.StudentID} className="border-b border-gray-300">
              <td className="px-1">
                <FormControlLabel
                  control={
                    <Checkbox
                      size="default"
                      color="default"
                      defaultChecked
                      onClick={(e) =>
                        onUserCheck(
                          e,
                          student.StudentID,
                          excludedArr,
                          setExceludedArr
                        )
                      }
                    />
                  }
                  className="mr-2"
                  label={student.FirstName}
                />
              </td>
              <td className="px-1">{student.LastName}</td>
              <td className="px-1">{student.Email}</td>
              <td className="px-1">{student.PhoneNumber}</td>
              <td className="px-1">
                {student.CreatedAt
                  ? new Date(student.CreatedAt).toLocaleDateString()
                  : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <ol className="list-disc pl-6 max-h-80 overflow-y-auto border rounded-lg p-2">
        {data.modalData.map((student) => (
          <li key={student.Email} className="flex items-center mb-2">
            <FormControlLabel
              control={<Checkbox size="default" color="default" defaultChecked onClick={(e) => onUserCheck(e, student.StudentID, excludedArr, setExceludedArr)} />}
              className="mr-2"
            />
            <p className="text-sm">{student.Email}</p>
          </li>
        ))}
      </ol> */}
      <div className="text-center mt-4">
        <Button
          variant="contained"
          sx={{ width: "8rem" }}
          color="primary"
          onClick={() => {
            handler(excludedArr);
            setter(false);
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default StudentModal;
