import { useEffect, useState } from "react";
import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import SelectMenu from "../../../ui/EnrollStudent/Select";
import { useDispatch, useSelector } from "react-redux";
import { setModule } from "../../../store/slice/enrollStudent.slice";
import { fetchModuleList } from "../../../store/root.actions";

function ModuleDropDown({ isNotSelected }) {
  const dispatch = useDispatch();
  const [moduleId, setModuleId] = useState(0);
  const [options, setOptions] = useState([]);
  const { technology: technologyId, module } = useSelector(
    (store) => store.enrollStudentReducer
  );
  const { data: moduleList } = useSelector((store) => store.modulesListReducer);

  useEffect(() => {
    if (technologyId) dispatch(fetchModuleList(technologyId));
  }, [technologyId, dispatch]);

  useEffect(() => {
    if (moduleList) {
      setOptions(
        moduleList.map((module) => ({
          id: module.ModuleID,
          value: module.ModuleID,
          option: module.ModuleName,
        }))
      );

      if (module) setModuleId(module);
      else setModuleId(0);
    } else {
      setOptions([]);
    }
  }, [moduleList, module]);

  const handleModuleChange = (selectedModule) => {
    dispatch(setModule(selectedModule));
    setModuleId(selectedModule);
  };

  return (
    <div className="w-1/3">
      <FormControl sx={{ minWidth: 300 }} error={isNotSelected.module}>
        <InputLabel id="demo-simple-select-label">Module</InputLabel>
        <SelectMenu
          defaultValue={moduleId}
          setter={setModuleId}
          options={options}
          label={"Module"}
          changeHandler={handleModuleChange}
        />
        {isNotSelected.module && (
          <FormHelperText>Must Select A Module</FormHelperText>
        )}
      </FormControl>
    </div>
  );
}

export default ModuleDropDown;
