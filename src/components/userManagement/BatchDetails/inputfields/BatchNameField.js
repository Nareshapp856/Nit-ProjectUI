import { useDispatch, useSelector } from "react-redux";
import { setBatchName } from "../../../../store/slice/userManagement.slice";
import { TextField } from "@mui/material";

function BatchNameField() {
  const dispatch = useDispatch();
  const { batchName, showWarn } = useSelector(
    (store) => store.userManagementPageReducer
  );

  return (
    <>
      <TextField
        fullWidth
        id="outlined-basic"
        label={
          <span>
            Batch Name <span>*</span>
          </span>
        }
        variant="outlined"
        value={batchName}
        onChange={(e) => dispatch(setBatchName(e.target.value))}
        error={showWarn && !batchName}
      />
    </>
  );
}

export default BatchNameField;
