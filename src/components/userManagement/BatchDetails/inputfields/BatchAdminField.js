import { useDispatch, useSelector } from "react-redux";
import { setBatchAdmin } from "../../../../store/slice/userManagement.slice";
import { TextField } from "@mui/material";

function BatchAdminField() {
  const dispatch = useDispatch();
  const { batchAdmin, showWarn } = useSelector(
    (store) => store.userManagementPageReducer
  );

  return (
    <>
      <TextField
        fullWidth
        id="outlined-basic"
        label="Batch Admin"
        variant="outlined"
        // error={showWarn && !batchAdmin}
        value={batchAdmin}
        onChange={(e) => dispatch(setBatchAdmin(e.target.value))}
      />
    </>
  );
}

export default BatchAdminField;
