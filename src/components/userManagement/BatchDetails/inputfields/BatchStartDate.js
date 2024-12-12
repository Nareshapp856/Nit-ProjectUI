import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setStartDate } from "../../../../store/slice/userManagement.slice";

function BatchEndDate() {
  const dispatch = useDispatch();
  const { startDate, endDate, showWarn } = useSelector(
    (store) => store.userManagementPageReducer
  );

  const today = new Date().toISOString().split("T")[0];

  const validate = (e) => {
    dispatch(setStartDate(e.target.value));
  };

  return (
    <TextField
      id="start-date"
      label={
        <span>
          Start Date <span>*</span>
        </span>
      }
      type="date"
      value={startDate}
      onChange={validate}
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
      inputProps={{
        min: today,
      }}
      error={showWarn && endDate ? startDate > endDate : !startDate}
    />
  );
}

export default BatchEndDate;
