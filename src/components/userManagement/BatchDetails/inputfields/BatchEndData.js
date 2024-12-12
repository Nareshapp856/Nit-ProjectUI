import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setEndDate } from "../../../../store/slice/userManagement.slice";

function BatchEndDate() {
  const dispatch = useDispatch();
  const { startDate, endDate, showWarn } = useSelector(
    (store) => store.userManagementPageReducer
  );

  const today = new Date().toISOString().split("T")[0];

  const validate = (e) => {
    dispatch(setEndDate(e.target.value));
  };

  return (
    <TextField
      id="end-date"
      label="End Date"
      type="date"
      value={endDate}
      onChange={validate}
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
      inputProps={{
        min: today,
      }}
      error={showWarn && endDate ? startDate > endDate : false}
    />
  );
}

export default BatchEndDate;
