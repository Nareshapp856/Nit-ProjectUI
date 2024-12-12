import { useEffect, useState } from "react";
import axios from "axios";
import SelectMenu from "../../../ui/EnrollStudent/Select";
import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchTechnologyList } from "../../../store/root.actions";
import { setTechnology } from "../../../store/slice/enrollStudent.slice";

function TechnologyDropDown({ isNotSelected }) {
  const dispatch = useDispatch();
  const [technologyId, setTechnologyId] = useState(0);
  const [options, setOptions] = useState([]);
  const { data: technologyList } = useSelector(
    (store) => store.technologiesListReducer
  );
  const { technology } = useSelector((store) => store.enrollStudentReducer);

  useEffect(() => {
    setTechnologyId(technology || 0);
  }, [technology]);

  useEffect(() => {
    if (technologyList) {
      setOptions(
        technologyList.map((tech) => ({
          id: tech.TechnologyID,
          value: tech.TechnologyID,
          option: tech.TechnologyName,
        }))
      );
      if (technology) setTechnologyId(technology);
      else setTechnologyId(0);
    } else {
      setOptions([]);
    }
  }, [technologyList]);

  const handleTechnologyChange = (selectedTechnologyId) => {
    dispatch(setTechnology(selectedTechnologyId));
    setTechnologyId(selectedTechnologyId);
  };

  useEffect(() => {
    dispatch(fetchTechnologyList());
  }, []);

  return (
    <div className="w-1/3 flex justify-start">
      <FormControl sx={{ minWidth: 300 }} error={isNotSelected.technology}>
        <InputLabel id="technology-dropdown-label">Technology</InputLabel>
        <SelectMenu
          defaultValue={technologyId}
          setter={setTechnologyId}
          label="Technology"
          options={options}
          changeHandler={handleTechnologyChange}
        />
        {isNotSelected.technology && (
          <FormHelperText>Must Select a Technology</FormHelperText>
        )}
      </FormControl>
    </div>
  );
}

export default TechnologyDropDown;
